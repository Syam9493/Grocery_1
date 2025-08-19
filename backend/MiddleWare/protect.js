import Token from "../Models/tokenModel.js";

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Token.findById(decoded.id);

      // ❗ Check if token matches what's in DB
      if (user && user.token === token) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Session expired. Please log in again.");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default protect;
