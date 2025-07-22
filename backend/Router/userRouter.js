import express from 'express';
import {registerUser,getAllUsers, getUser} from '../Controllers/userControl.js';


const router = express.Router();


 router.route('/').post(registerUser).get(getAllUsers);
 router.route('/login').post(getUser);

export default router;
