import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// user detaisl schema

const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confPassword: {
      type: String,
      required: true,
    },
    cellNumber: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

// login user password compare
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password", "confPassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confPassword = await bcrypt.hash(this.confPassword, salt);
});

const users = mongoose.model("User", UserSchema);

export default users;
