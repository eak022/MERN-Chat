import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token Provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find the user in the database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while checking token",
      error: error.message,
    });
  }
};
