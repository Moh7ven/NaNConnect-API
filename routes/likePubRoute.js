import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import { addLike, getLikes } from "../Controllers/likePubController.js";

const router = express.Router();

router.post("/add-like-pub/:idPub", authNaniens, addLike);

router.get("/get-all-likes-pub/:idPub", authNaniens, getLikes);

export default router;
