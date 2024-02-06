import express from "express";
import multer from "multer";
import { verifyCode } from "../controllers/confirmationEmailController.js";

const router = express.Router();
const upload = multer();

router.post("/verifycode", upload.any(), verifyCode);

export default router;
