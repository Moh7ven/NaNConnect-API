import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import { getNotifications } from "../Controllers/notificationsController.js";

const router = express.Router();

router.get("/get-notifications", authNaniens, getNotifications);

export default router;
