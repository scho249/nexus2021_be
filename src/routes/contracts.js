import { Router } from 'express';
import { Pool } from 'mysql2/promise';
import ContractService from '../services/contract';
import { User, Contract } from '../types';

const createStudentContract = (srv) => async (req, res) => {
    const { projectId, studentUsername } = req.body;
    const actor = req.user;
    try {
        const contractId = await srv.createStudentContract(actor.username, projectId, studentUsername);
        res.json({ contractId });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const getStudentContracts = (srv) => async (req, res) => {
    const { username } = req.user;
    try {
        const contracts = await srv.getStudentContracts(username);
        res.json(contracts);
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const updateContractStatus = (srv) => async (req, res) => {
    const { contractId } = req.params;
    const { status } = req.body;
    try {
        await srv.updateContractStatus(contractId, status);
        res.json({ success: `Contract id: ${contractId} updated.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const createInvite = (srv) => async (req, res) => {
    const { recipient } = req.body;
    const sender = req.user;
    try {
        const inviteId = await srv.createInvite(sender.username, recipient);
        res.json({ inviteId });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const updateInviteStatus = (srv) => async (req, res) => {
    const { sender } = req.params;
    const user = req.user;
    const { status } = req.body;
    try {
        await srv.updateInviteStatus(sender, user.username, status);
        res.json({ success: `Invite: ${sender} to ${user.username} updated.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const getStudentNotifications = (srv) => async (req, res) => {
    const { username } = req.user;
    try {
        const notifs = await srv.getStudentNotifications(username);
        res.json(notifs);
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
export default (db) => {
    const router = Router();
    const contractService = new ContractService(db);
    // TODO: apidoc for all
    router.get('/', getStudentContracts(contractService));
    router.post('/', createStudentContract(contractService));
    router.patch('/:contractId', updateContractStatus(contractService));
    router.get('/notifications', getStudentNotifications(contractService));
    router.post('/invites', createInvite(contractService));
    router.patch('/invites/:sender', updateInviteStatus(contractService));
    return router;
};