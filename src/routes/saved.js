/* Handles all saving operations for both Project and Student */

import { Router } from 'express';
import { Pool } from 'mysql2/promise'
import SaveService from '../services/save';
import { User } from '../types';


const getSavedEntityIds = (srv) => async (req, res) => {
    const { username } = req.user;
    try {
        const saved = await srv.getSavedEntityIds(username);
        res.json(saved);
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const saveProject = (srv) => async (req, res) => {
    const { projectId } = req.params;
    const { username } = req.user;
    try {
        await srv.saveProject(username, projectId);
        res.json({ success: `Project: ${projectId} is marked as saved.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const unsaveProject = (srv) => async (req, res) => {
    const { projectId } = req.params;
    const { username } = req.user;
    try {
        await srv.unsaveProject(username, projectId);
        res.json({ success: `Project: ${projectId} no longer saved.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const saveStudent = (srv) => async (req, res) => {
    const { targetUsername } = req.params;
    const { username } = req.user;
    try {
        await srv.saveStudent(username, targetUsername);
        res.json({ success: `Student: ${targetUsername} is marked as saved.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const unsaveStudent = (srv) => async (req, res) => {
    const { targetUsername } = req.params;
    const { username } = req.user;
    try {
        await srv.unsaveStudent(username, targetUsername);
        res.json({ success: `Student: ${targetUsername} no longer saved.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
export default (db) => {
    const router = Router();
    const saveService = new SaveService(db);
    /**
     * @api {get} /saved Get saved Projects and Students
     * @apiGroup SaveGroup
     * @apiName GetSavedEntities
     *
     * @apiUse JwtHeader
     *
     * @apiSuccess {String[]} projects   ID's of saved Projects
     * @apiSuccess {String[]} student    Usernames of saved Students
     */
    router.get('/', getSavedEntityIds(saveService));
    /**
     * @api {post} /saved/projects/:projectId Save a Project
     * @apiGroup SaveGroup
     * @apiName SaveProject
     *
     * @apiUse JwtHeader
     *
     * @apiParam {String} projectId Project ID
     */
    router.post('/projects/:projectId', saveProject(saveService));
    /**
     * @api {delete} /saved/projects/:projectId Unsave a Project
     * @apiGroup SaveGroup
     * @apiName UnsaveProject
     *
     * @apiUse JwtHeader
     *
     * @apiParam {String} projectId Project ID
     */
    router.delete('/projects/:projectId', unsaveProject(saveService));
    /**
     * @api {post} /saved/students/:targetUsername Save a Student profile
     * @apiGroup SaveGroup
     * @apiName SaveProject
     *
     * @apiUse JwtHeader
     *
     * @apiParam {String} username Student username
     */
    router.post('/students/:targetUsername', saveStudent(saveService));
    /**
     * @api {delete} /saved/students/:targetUsername Unsave a Student profile
     * @apiGroup SaveGroup
     * @apiName UnsaveProject
     *
     * @apiUse JwtHeader
     *
     * @apiParam {String} username Student username
     */
    router.delete('/students/:targetUsername', unsaveStudent(saveService));
    return router;
};