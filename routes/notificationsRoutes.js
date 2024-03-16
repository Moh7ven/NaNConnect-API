import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import {
  getNotifications,
  getAllNotifications,
} from "../Controllers/notificationsController.js";

const router = express.Router();

router.get("/get-notifications", authNaniens, getNotifications);

router.get("/get-all-notifications", authNaniens, getAllNotifications);

export default router;
