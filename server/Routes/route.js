import express from 'express';
import { 
    sign_up,
    sign_in, 
    getall_User, 
    getuserby_Id, 
    deleteUserById, 
    updateUserById 
} from '../Controllers/User.js';
import {
    create_task,
    getall_Task,
    gettask_byId,
    deleteTaskById,
    updateTaskById
} from '../Controllers/Task.js';
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addTeamMember_Project,
    removeTeamMember_Project
} from '../Controllers/Project.js';
import {
    getAllTeams,
    getTeamById,
    createTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember
  } from '../Controllers/Team.js';

const router = express.Router();
 
router.post('/sign_in', sign_in);
router.post('/sign_up', sign_up);

router.get('/getalluser', getall_User);
router.get('/getuserbyid/:id', getuserby_Id);
router.post('/updateuserbyid/:id', updateUserById);
router.delete('/deleteuserbyid/:id', deleteUserById);

router.get('/getproject', getProjects);
router.post('/:id/team', addTeamMember_Project);
router.delete('/:id/team', removeTeamMember_Project);
router.post('/createproject', createProject);
router.get('/getprojectbyid/:id', getProjectById);
router.patch('/updateprojectbyid/:id', updateProject);
router.delete('/deleteprojectbyid/:id', deleteProject);

router.get('/getalltask', getall_Task);
router.post('/createtask', create_task);
router.get('/gettaskbyid/:id', gettask_byId);
router.post('/updatetaskbyid/:id', updateTaskById);
router.delete('/deletetaskbyid/:id', deleteTaskById);

// Team routes
router.get('/getallteam', getAllTeams);
router.get('/:id', getTeamById);
router.post('/createteam', createTeam);
router.delete('/:id', deleteTeam);

// Team member routes
router.post('/addmember', addTeamMember);
router.post('/removemember', removeTeamMember);

export default router;

