import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import { addLike } from "../Controllers/likePubController.js";

const router = express.Router();

router.post("/add-like-pub/:idPub", authNaniens, addLike);

export default router;
