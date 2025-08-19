import JWT from "jsonwebtoken";
import Token from "../Models/tokenModel.js";

// genarate token function for reg and login users

const generateToken = async (res, userID) => {
  const token = JWT.sign({ userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  // Save token in MongoDB
  await Token.create({
    userId: userID,
    token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  // Set token as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  return token;
};

export default generateToken;
