import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateProfile", updateProfile);

export default router; // ส่งออก router เป็น default
