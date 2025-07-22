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

  const getAllUsers = async (req, res) => {
    const allUsers = await User.find()
   return  res.status(200).json(allUsers)
  }


  // Get user details from database


  const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

   if(user && (await user.matchPassword(password))){
     res.status(200).json({
      _id: user._id,
      name: user.FirstName +' '+ user.LastName,
      email: user.email,
      // optionally add a token here
    });
   }  else{
    res.status(400);
    throw new Error("Invalid email or password")
   }
  } catch (error) {
  console.error('Login Error:', error);
  res.status(500).json({ message: 'Email or password wrong' });
}
};


  export {registerUser,getAllUsers, getUser};