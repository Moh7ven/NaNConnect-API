import { addCommentaires } from "../controllers/commentairesController.js";
import express from "express";

const router = express.Router();

router.post("/add-commentaire/:idPub", addCommentaires);

export default router;
