import {
  addCommentaires,
  getAllCommentaires,
  getCommentairesFromPublication,
} from "../controllers/commentairesController.js";
import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post(
  "/add-commentaire/:idPub",
  authNaniens,
  upload.any(),
  addCommentaires
);

router.get(
  "/get-comments-from/:idPub",
  authNaniens,
  getCommentairesFromPublication
);

router.get("/all-comments", authNaniens, getAllCommentaires);

export default router;
