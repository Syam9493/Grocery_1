// import express from 'express';
// import {registerUser,getAllUsers, getUser} from '../Controllers/userControl.js';
// import protect from '../MiddleWare/protect.js';


// const router = express.Router();


// // router.route('/').post(registerUser).get(getAllUsers);
// // router.route('/login').post(getUser);
// // router.get('/me', protect, getUser);

// // Register a new user
// router.post('/', registerUser);

// // Get all users (currently open to all — lock down later for admin)
// router.get('/', getAllUsers);

// // Get logged-in user's profile
// router.get('/me', protect, getUser);

// // Login user
// router.post('/login', getUser);

// export default router;


import express from 'express';
import { registerUser, getAllUsers } from '../Controllers/userControl.js';
import {loginUser} from '../Controllers/userControl.js'
import protect from '../MiddleWare/protect.js';

const router = express.Router();

const loginRoute = (req, res) => getUser(req, res);

// Correct order & non-conflicting paths
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);      // List all users
//router.get('/me', protect, getUser); // Current user

export default router;

export const rootLoginRouter = express.Router();
rootLoginRouter.post('/login', getUser);
