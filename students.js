import { Router } from 'express';
import StudentService from '../services/student';

const createStudent = (srv) => async (req, res) => {
    const profile = req.body;
    const { username } = req.user;
    try {
        const studentId = await srv.createStudent(username, profile);
        res.json({ studentId });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const getStudent = (srv) => async (req, res) => {
    const { username } = req.params;
    try {
        const student = await srv.getStudent(username);
        res.json(student);
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const updateStudent = (srv) => async (req, res) => {
    const student = req.body;
    const { username } = req.user;
    try {
        await srv.updateStudent(username, student);
        res.json({ success: `Student: ${username} updated.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
const deleteStudent = (srv) => async (req, res) => {
    const { username } = req.user;
    try {
        await srv.deleteStudent(username);
        res.json({ success: `Student: ${username} deleted from database.` });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
};
export default (db) => {
    const router = Router();
    const studentService = new StudentService(db);
    
    router.get('/:username', getStudent(studentService));
    
    router.post('/', createStudent(studentService));
    
    router.patch('/', updateStudent(studentService));
    
    router.delete('/', deleteStudent(studentService));
    return router;
};
