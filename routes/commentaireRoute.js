import {
  addCommentaires,
  deleteCommentaires,
  getAllCommentaires,
  getCommentairesFromPublication,
  getOneCommentaires,
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
  "/get-comments-from-pub/:idPub",
  authNaniens,
  getCommentairesFromPublication
);

router.get("/all-comments", authNaniens, getAllCommentaires);

router.get("/get-one-comment/:id", authNaniens, getOneCommentaires);

router.delete("/delete-comment/:id", authNaniens, deleteCommentaires);

export default router;
