import express from 'express';
import {registerUser,getAllUsers, getUser} from '../Controllers/userControl.js';
import protect from '../MiddleWare/protect.js';


const router = express.Router();


router.get('/user', protect, getUser);
 router.route('/').post(registerUser).get(getAllUsers);
 router.route('/login').post(getUser);

export default router;
