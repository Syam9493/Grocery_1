//import express from 'express';
import User from '../Models/userModel.js';
import generateToken from '../utils/genarateToken.js';
import tokenModel from '../Models/tokenModel.js';
import bcrypt from 'bcryptjs';


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
        await generateToken(res, user._id);
        await res.status(201).json({
            _id: user._id,
            name: `${user.FirstName} ${user.LastName}`,
            email: user.email,
            isAdmin: user.isAdmin,
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


//   const getUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }




//    if(user && (await user.matchPassword(password)) ){
      
//       const userToken = tokenModel.findOne({userId: user._id})
//       // optionally add a token here
//       if(userToken){
//         await generateToken(res, user._id)
//         res.status(200).json({
//               _id: user._id,
//               name: `${user.FirstName} ${user.LastName}`,
//               email: user.email,
//               isAdmin: user.isAdmin
//           })
//       }
//    }  else{
//     res.status(400).json({message: "Invalid email or password"})
//    }
//   } catch (error) {
//   console.error('Login Error:', error);
//   res.status(500).json({ message: 'Email or password wrong' });
// }
// };

// authController.js
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Generate JWT token
    // const token = jwt.sign(
    //   { userId: user._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );

    // 5. Send response
    res.status(200).json({
      // token,
      user: {
        id: user._id,
        email: user.email,
        name: user.FirstName + ' ' + user.LastName
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



  export {registerUser,getAllUsers, loginUser};