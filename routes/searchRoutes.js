import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import {
  getAllSearchHistory,
  getByUserConnetectedSearchHistory,
  makeSearch,
} from "../Controllers/searchController.js";
import upload from "../middleware/multer-config.js";

const router = express.Router();

router.post("/make-search", authNaniens, upload, makeSearch);

router.get("/get-all-search-history", authNaniens, upload, getAllSearchHistory);

router.get(
  "/get-user-connected-search-history",
  authNaniens,
  upload,
  getByUserConnetectedSearchHistory
);

export default router;
