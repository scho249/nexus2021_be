import * from './sql' as SQL;
import {Contract} from '../../types';
import {Pool,RowDataPackert} from 'mysql12/promise';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY } from '../../config';

export default class ContractService {
    constructor(promisePool) {
        this.db = promisePool;
        const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
        this.projectIndex = searchClient.initIndex('projects');
        this.studentIndex = searchClient.initIndex('students');
    }
    async validateContract(actorUsername, projectId, studentUsername) {
        const [res] = await this.db.execute(SQL.getOwnerUsername, [projectId]);
        if (!res[0] || (actorUsername !== res[0].username && actorUsername !== studentUsername)) {
            throw new Error('Unauthorized operation on project.');
        }
    }
    async createStudentContract(actorUsername, projectId, studentUsername) {
        await this.validateContract(actorUsername, projectId, studentUsername);
        try {
            const [res] = await this.db.execute(SQL.insertStudentContract, [projectId, studentUsername]);
            return res['insertId'];
        }
        catch (err) {
            throw err;
        }
    }
    async getStudentContracts(studentUsername) {
        try {
            const [res] = await this.db.execute(SQL.getStudentContracts, [studentUsername]);
            const contracts = res.map(row => {
                const c = {
                    contractId: row.contractId,
                    project: {
                        projectId: row.projectId,
                        owner: {
                            user: { username: row.ownerUsername },
                            firstName: row.ownerFirstName,
                            lastName: row.ownerLastName,
                        },
                        title: row.projectTitle,
                        status: row.projectStatus,
                        duration: row.projectDuration,
                        size: row.projectSize,
                        postal: row.projectPostal,
                    },
                    status: row.contractStatus,
                };
                return c;
            });
            return contracts;
        }
        catch (err) {
            throw err;
        }
    }
    async updateContractStatus(contractId, status) {
        try {
            await this.db.execute(SQL.updateContractStatus, [status, contractId]);
        }
        catch (err) {
            throw err;
        }
    }
    async getStudentInvites(studentUsername) {
        try {
            const [res] = await this.db.execute(SQL.getStudentContracts, [studentUsername]);
            const contracts = res.map(row => {
                const c = {
                    contractId: row.contractId,
                    project: {
                        projectId: row.projectId,
                        owner: {
                            user: { username: row.ownerUsername },
                            firstName: row.ownerFirstName,
                            lastName: row.ownerLastName,
                        },
                        title: row.projectTitle,
                        status: row.projectStatus,
                        duration: row.projectDuration,
                        size: row.projectSize,
                        postal: row.projectPostal,
                    },
                    status: row.contractStatus,
                };
                return c;
            });
            return contracts;
        }
        catch (err) {
            throw err;
        }
    }
    async createInvite(sender, recipient) {
        try {
            const [res] = await this.db.execute(SQL.insertInvite, [sender, recipient]);
            return res['insertId'];
        }
        catch (err) {
            throw err;
        }
    }
    async updateInviteStatus(sender, recipient, status) {
        try {
            await this.db.execute(SQL.updateInviteStatus, [status, sender, recipient]);
        }
        catch (err) {
            throw err;
        }
    }
    async getStudentNotifications(username) {
        const res = {
            invites: [],
            requests: [],
        };
        try {
            const [invitesRes] = await this.db.execute(SQL.getInvites, [username]);
            const invites = invitesRes.map(row => ({
                username: row.senderUsername,
                firstName: row.senderFirstName,
                lastName: row.senderLastName,
                email: row.senderEmail,
                roles: [],
                projects: [],
            }));
            if (invites.length > 0) {
                const mappings = invites.reduce((curr, inv) => {
                    curr.set(inv.username, { roles: [], projects: [] });
                    return curr;
                }, new Map());
                const projectFilters = invites.map((inv) => `owner:"${inv.username}"`).join(' OR ');
                const projectsRes = await this.projectIndex.search('', { filters: projectFilters });
                projectsRes.hits.forEach(proj => {
                    const { owner, title, objectID } = proj;
                    mappings.get(owner).projects.push({
                        title,
                        projectId: objectID,
                    });
                });
                const rolesRes = await this.studentIndex.getObjects(invites.map((inv) => inv.username));
                rolesRes.results.forEach(user => {
                    const { objectID, roles } = user;
                    mappings.get(objectID).roles = roles;
                });
                invites.forEach(inv => {
                    inv.roles = mappings.get(inv.username).roles || [];
                    inv.projects = mappings.get(inv.username).projects || [];
                });
                res.invites = invites;
            }
            const [requestsRes] = await this.db.execute(SQL.getRequests, [username]);
            const requests = requestsRes.map(row => ({
                contractId: row.contractId,
                student: {
                    username: row.studentUsername,
                    firstName: row.studentFirstName,
                    lastName: row.studentLastName,
                    email: row.studentEmail,
                    roles: [],
                },
                project: row.projectTitle,
            }));
            if (requests.length > 0) {
                const roleMappings = new Map();
                const rolesRes = await this.studentIndex.getObjects(requests.map((req) => req.student.username));
                rolesRes.results.forEach(student => {
                    const { username, roles } = student;
                    roleMappings.set(username, roles);
                });
                requests.forEach(req => {
                    req.student.roles = roleMappings.get(req.student.username) || [];
                });
                res.requests = requests;
            }
            return res;
        }
        catch (err) {
            throw err;
        }
    }
}