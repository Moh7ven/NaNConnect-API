import express from "express";
import multer from "multer";
import {
  signup,
  login,
  getAllUsers,
  getUserConnected,
} from "../Controllers/usersController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();
const upload = multer();

//Route for signup
router.post("/signup", upload.any(), signup);

//Route for login
router.post("/login", upload.any(), login);

//Router allusers
router.get("/allusers", authUser, getAllUsers);

//Route for get connected user
router.get("/userconnected", authUser, getUserConnected);

export default router;
