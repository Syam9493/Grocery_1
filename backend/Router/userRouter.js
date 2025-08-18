import express from 'express';
import { loginUser, registerUser } from '../Controllers/userControl.js'; 
//import protect from '../MiddleWare/protect.js';

const router = express.Router();


// Correct order & non-conflicting paths
router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/', getAllUsers);      // List all users
//router.get('/me', protect, getUser); // Current user

export default router;

