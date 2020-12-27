const { Router, Request, Response } = require('express')
const Project = require('../models/project.js')
const getDb = require("./db/db.js").getDb

// const Pool = require('mysql2/promise')
// const ProjectService = require('../services/project/index.js')
// const conn = require('../db/index.js')


/**
 * @apiDefine Project API
 *
 * Handles all Project Profile operations.
 */


async function createProject(req, res) {
  const newProject = new Project({

  });
  const { username } = req.user as User;

  try {
    const projectId = await srv.createProject(username, project.details);
    srv.indexProject(projectId, project);
    await srv.updateProject(username, projectId, project);
    res.json({ projectId });
  } catch (error) {
    res.json({ error  });
  }
};

// const getProjectsOwned = (srv: ProjectService) => async (req: Request, res: Response): Promise<void> => {
//   const { username } = req.user as User;
//
//   try {
//     const projects = await srv.getProjectsOwned(username);
//     res.json(projects);
//   } catch (error) {
//     res.json({
//       error: (error as Error).message,
//     });
//   }
// };
//
// const getProjectById = (srv: ProjectService) => async (req: Request, res: Response): Promise<void> => {
//   const { projectId } = req.params;
//
//   try {
//     const project = await srv.getProject(projectId);
//     res.json(project);
//   } catch (error) {
//     res.json({
//       error: (error as Error).message,
//     });
//   }
// };
//
// const updateProject = (srv: ProjectService) => async (req: Request, res: Response): Promise<void> => {
//   const { projectId } = req.params;
//   const project = req.body as Project;
//   const { username } = req.user as User;
//
//   try {
//     await srv.updateProject(username, projectId, project);
//     await srv.updateProjectIndex(projectId, project);
//     res.json({ success: `Project id: ${projectId} updated.` });
//   } catch (error) {
//     res.json({
//       error: (error as Error).message,
//     });
//   }
// };
//
// const deleteProject = (srv: ProjectService) => async (req: Request, res: Response): Promise<void> => {
//   const { projectId } = req.params;
//   const { username } = req.user as User;
//
//   try {
//     await srv.deleteProject(username, projectId);
//     res.json({ success: `Project id: ${projectId} deleted from database.` });
//   } catch (error) {
//     res.json({
//       error: (error as Error).message,
//     });
//   }
// };
//
// const getProjectContracts = (srv: ProjectService) => async (req: Request, res: Response): Promise<void> => {
//   const { projectId } = req.params;
//   const { username } = req.user as User;
//
//   try {
//     const contracts = await srv.getProjectContracts(username, projectId);
//     res.json(contracts);
//   } catch (error) {
//     res.json({
//       error: (error as Error).message,
//     });
//   }
// };
//

const router = Router();

/**
 * @api {post} /projects Create a new Project
 * @apiGroup ProjectGroup
 * @apiName CreateProject
 *
 * @apiUse JwtHeader
 *
 * @apiParam {Object} details              Project details
 * @apiParam {String} details.title        Project title
 * @apiParam {String} details.description  Project description
 * @apiParam {String} details.duration     Project duration
 * @apiParam {String} details.size         Project team size
 * @apiParam {String} details.postal       Project postal code
 *
 * @apiSuccess {Number} projectId Project ID
 */
router.post('/', createProject(req, res));

// TODO: apidoc
router.get('/owned', getProjectsOwned(projectService));

/**
 * @api {get} /projects/:projectId Get Project
 * @apiGroup ProjectGroup
 * @apiName GetProject
 *
 * @apiUse JwtHeader
 *
 * @apiParam {String} projectId Project ID
 *
 * @apiSuccess {Object} details              Project details
 * @apiSuccess {String} details.title        Project title
 * @apiSuccess {String} details.description  Project description
 * @apiSuccess {String} details.status       Project status
 * @apiSuccess {String} details.duration     Project duration
 * @apiSuccess {String} details.size         Project team size
 * @apiSuccess {String} details.postal       Project postal code
 * @apiSuccess {Date} details.createdAt      Project created date
 * @apiSuccess {Date} details.updatedAt      Project updated date
 * @apiSuccess {String[]} skills             Project skills
 * @apiSuccess {String[]} roles              Project roles
 * @apiSuccess {String[]} interests          Project interests
 */
router.get('/:projectId', getProjectById(projectService));

/**
 * @api {patch} /projects/:projectId Update Project
 * @apiGroup ProjectGroup
 * @apiName UpdateProject
 *
 * @apiUse JwtHeader
 *
 * @apiParam {String} projectId Project ID
 *
 * @apiParam {Object} details                Project details
 * @apiParam {String} [details.title]        Project title
 * @apiParam {String} [details.description]  Project description
 * @apiParam {String} [details.status]       Project status
 * @apiParam {String} [details.duration]     Project duration
 * @apiParam {String} [details.size]         Project team size
 * @apiParam {String} [details.postal]       Project postal code
 * @apiParam {String[]} skills               Project skills
 * @apiParam {String[]} roles                Project roles
 * @apiParam {String[]} interests            Project interests
 */
router.patch('/:projectId', updateProject(projectService));

/**
 * @api {delete} /projects/:projectId Delete Project
 * @apiGroup ProjectGroup
 * @apiName DeleteProject
 *
 * @apiUse JwtHeader
 */
router.delete('/:projectId', deleteProject(projectService));

// TODO: apidoc
router.get('/:projectId/contracts', getProjectContracts(projectService));

module.exports = router;
