import express from "express";
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

/**
 * @swagger
 * /api/publications/get-one-publication/{id}:
 *   description: Affichage d'une publication.
 *   get:
 *     summary: Affichage d'une publication.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Publication affichée avec success !
 *       400:
 *         description: Erreur lors de l'affichage de la publication.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.get("/get-one-publication/:id", authNaniens, getOnePublication);

/**
 * @swagger
 * /api/publications/user-connected-publications:
 *   description: Affichage des publications d'un utilisateur connecté.
 *   get:
 *     summary: Affichage des publications d'un utilisateur connecté.
 *     responses:
 *       200:
 *         description: Publications affichées avec success !
 *       400:
 *         description: Erreur lors de l'affichage des publications.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/user-connected-publications",
  authNaniens,
  getAllNaniensPublications
);

/**
 * @swagger
 * /api/publications/all-publications:
 *   description: Affichage de toutes les publications.
 *   get:
 *     summary: Affichage de toutes les publications.
 *     parameters:
 *       - in: query
 *         name: idNaniens
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du naniens.
 *
 *     responses:
 *       200:
 *         description: Publications affichées avec success !
 *       400:
 *         description: Erreur lors de l'affichage des publications.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.get("/all-publications", getAllPublications);

/**
 * @swagger
 * /api/publications/delete-publication/{id}:
 *   description: Suppression d'une publication.
 *   delete:
 *     summary: Suppression d'une publication.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Publication supprimée avec success !
 *       400:
 *         description: Erreur lors de la suppression de la publication.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.get("/publication-with-comments/:idPub", getPublicationWithComments);

/**
 * @swagger
 * /api/publications/delete-publication/{id}:
 *   description: Suppression d'une publication.
 *   delete:
 *     summary: Suppression d'une publication.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Publication supprimée avec success !
 *       400:
 *         description: Erreur lors de la suppression de la publication.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.delete("/delete-publication/:id", authNaniens, deletePublication);

export default router;
