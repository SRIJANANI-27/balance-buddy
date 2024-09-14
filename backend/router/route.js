import express from 'express';
import { addData, deleteData, getFilteredData, getuser, login, register, resetpassword, updateData } from '../controller/controller.js';
// import { authenticateUser } from '../controller/controller.js'; // Import authenticateUser middleware

const router = express.Router();

// // Public routes
router.post('/login', login);
router.post('/register', register);
router.get('/users', getuser);

// Protected routes
// router.use(authenticateUser);

router.get('/data', getFilteredData);
router.post('/data', addData);
router.delete('/data/:id', deleteData);
router.put('/data/:id', updateData);

router.post('/reset',resetpassword);



export default router;