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

router.get('/', getFilteredData);
router.post('/', addData);
router.delete('/:id', deleteData);
router.put('/:id', updateData);

router.post('/reset',resetpassword);

// router.post('/login', login);
// router.post('/register', register);
// router.get('/users', getUsers);

// router.get('/', getFilteredData);
// router.post('/', addData);
// router.delete('/:id', deleteData);
// router.put('/:id', updateData);

export default router;