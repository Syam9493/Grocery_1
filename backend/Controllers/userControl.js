//import express from 'express';
import User from '../Models/userModel.js';

//const router = express.Router();

 // new user details are updated into mongodb
 // First getting the data from frontend using req.body
 // validating user is exist or not in mongodb
 // if exist send a error
 // Not exist create new user into data base
 // Finally insert data into database

  const registerUser = async(req,res) => {
      const {FirstName, LastName,email,password, confPassword, cellNumber } = req.body;
  
      const ExistUser = await User.findOne({email});
  
      if(ExistUser){
          res.status(400);
          throw new Error('User already Exist')
      }
  
      const user = await User.create({
          FirstName, LastName,email,password, confPassword, cellNumber
      });
  
      if(user) {
          res.status(200).json({
              _id: User._id,
              FirstName: User.FirstName,
              LastName: User.LastName,
              email: User.email,
              password: User.password,
              confPassword: User.confPassword,
              cellNumber: User.cellNumber,
              isAdmin: User.isAdmin
          })
      } else {
          res.status(400);
          throw new Error('Invalid user data');
      }
  }


  // Get user details from database


  const getUser = async (req, res) => {
        const users = await User.find({});
       const  AllUsers= res.status(200).json(users);
  }

  export {registerUser, getUser};