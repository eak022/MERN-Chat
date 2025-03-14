import express from "express";
const router = express.Router();
import {
  getUserForSidebar,
  sendMessage,
  getMessage,
} from "../controllers/Message.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

router.get("/message/users", protectedRoute, getUserForSidebar);
router.get("/message/send/:id", protectedRoute, sendMessage);
router.get("/message/:id", protectedRoute, getMessage);
export default router;
