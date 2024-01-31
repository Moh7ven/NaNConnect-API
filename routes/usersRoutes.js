import express from "express";
import multer from "multer";
import { signup, login } from "../Controllers/usersController.js";

const router = express.Router();
const upload = multer();

//Route for signup
router.post("/signup", upload.any(), signup);

//Route for login
router.post("/login", upload.any(), login);

export default router;
