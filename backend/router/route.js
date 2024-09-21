import express from 'express';
import { register, login, resetPassword, getUsers, getFilteredData, getAllData, addData, deleteData, updateData } from '../controller/controller.js';
import { authenticate } from '../Middleware/Auth.js'; // Ensure you have authentication middleware

const router = express.Router();

// User routes
router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.get('/users', authenticate, getUsers); // Ensure the route is protected if needed

router.get('/', authenticate, getAllData);
router.get('/filtered', authenticate, getFilteredData);
router.post('/', authenticate, addData);
router.delete('/:id', authenticate, deleteData);
router.put('/:id', authenticate, updateData);
export default router;
