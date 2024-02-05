import express from "express";
import multer from "multer";
import {
  signupNanien,
  loginNanien,
  getNanienConnected,
  getAllNaniens,
} from "../controllers/naniensController.js";
import authUser from "../middleware/authNaniens.js";

const router = express.Router();
const upload = multer();

//Route for signup
router.post("/signupnaniens", upload.any(), signupNanien);

//Route for login
router.post("/loginnaniens", upload.any(), loginNanien);

//Router allusers
router.get("/allnaniens", authUser, getAllNaniens);

//Route for get connected user
router.get("/nanienconnected", authUser, getNanienConnected);

export default router;
