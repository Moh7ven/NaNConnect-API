import express from "express";
import multer from "multer";
import authNaniens from "../middleware/authNaniens.js";
import upload from "../middleware/multer-config.js";

import {
  addPublication,
  deletePublication,
  getAllNaniensPublications,
  getAllPublications,
  getOnePublication,
  getPublicationWithComments,
} from "../Controllers/publicationsController.js";
import { getAllNaniens } from "../Controllers/naniensController.js";

const router = express.Router();

/**
 * @swagger
 * /api/publications/add-publication:
 *   description: Ajout d'une publication.
 *   post:
 *     summary: Ajout d'une publication.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libPub:
 *                 type: string
 *               createdAtPub:
 *                 type: string
 *               imagePub:
 *                 type: string
 *               videoPub:
 *                 type: string
 *               modifPub:
 *                 type: string
 *               authorName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publication ajoute avec success.
 *       400:
 *         description: Erreur lors de l'ajout de la publication.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.post("/add-publication", authNaniens, upload, addPublication);

router.get("/get-one-publication/:id", authNaniens, getOnePublication);

router.get(
  "/user-connected-publications",
  authNaniens,
  getAllNaniensPublications
);

router.get("/all-publications", getAllPublications);

router.get("/publication-with-comments/:idPub", getPublicationWithComments);

router.delete("/delete-publication/:id", authNaniens, deletePublication);

export default router;
