import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/updateProfile", protectedRoute, updateProfile);
router.get("/checkAuth", protectedRoute, checkAuth);

export default router; // ส่งออก router เป็น default
