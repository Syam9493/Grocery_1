import express from 'express';
import {registerUser, getUser} from '../Controllers/userControl.js';
// import User from '../Models/userModel.js';

const router = express.Router();


// const registerUser = async(req,res) => {
//     const {FirstName, LastName,email,password, confPassword, cellNumber } = req.body;

//     const ExistUser = await User.findOne({email});

//     if(ExistUser){
//         res.status(400);
//         throw new Error('User already Exist')
//     }

//     const user = await User.create({
//         FirstName, LastName,email,password, confPassword, cellNumber 
//     });

//     if(user) {
//         res.status(200).json({
//             _id: User._id,
//             FirstName: User.FirstName,
//             LastName: User.LastName,
//             email: User.email,
//             password: User.password,
//             confPassword: User.confPassword,
//             cellNumber: User.cellNumber
//         })
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// }


 router.route('/').post(registerUser).get(getUser);

export default router;
