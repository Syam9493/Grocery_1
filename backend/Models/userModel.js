// import mongoose from "mongoose";
// //import {bcrypt} from 'bcryptjs';
// import  bcrypt from 'bcryptjs';

// const UserSchema = new  mongoose.Schema({
//     // user: {
//     //     type: String,
//     //     required: true,
//     //     ref: "User"
//     // },
//     FirstName: {
//         type: String,
//         required: true
//     },
//     LastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     confPassword: {
//         type: String,
//         required: true
//     },
//     cellNumber: {
//         type: Number,
//         required: true
//     },
//     isAdmin:{
//         type: Boolean,
//         required: true,
//         default: false
//     }
// },{timestamps: true});

// // UserSchema.pre('save', async function(next){
// //     if(!this.isModified('password')){
// //         next();
// //         const salt = await bcrypt.genSalt(10);
// //         this.password = await bcrypt.hash(this.password, salt);
// //     }

// // })

// UserSchema.pre('save', async function() {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
// });

// //const User = mongoose.model("User", UserSchema);

// export default mongoose.model("User", UserSchema);


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confPassword:{
   type: String,
   required: true
  },
  cellNumber: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

  const users =  mongoose.model("User", UserSchema);

  export default users;
