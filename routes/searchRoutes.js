import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import {
  getAllSearch,
  getByUserConnetectedSearch,
  makeSearch,
} from "../Controllers/searchController.js";
import upload from "../middleware/multer-config.js";

const router = express.Router();

router.post("/make-search/:userId", authNaniens, upload, makeSearch);

router.get("/get-all-search", authNaniens, upload, getAllSearch);

router.get(
  "/get-user-connected-search/:userId",
  authNaniens,
  upload,
  getByUserConnetectedSearch
);

export default router;
