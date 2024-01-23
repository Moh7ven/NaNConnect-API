import express from "express";
import multer from "multer";
import { signup } from "../Controllers/usersController.js";

const router = express.Router();
const upload = multer();

//Route for signup
router.post("/signup", upload.any(), signup);

export default router;
