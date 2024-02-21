import express from "express";
import multer from "multer";
import authNaniens from "../middleware/authNaniens.js";

import { addPublication } from "../Controllers/publicationsController.js";

const router = express.Router();
const upload = multer();

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

router.post("/add-publication", authNaniens, upload.any(), addPublication);

export default router;
