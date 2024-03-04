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

/**
 * @swagger
 * /api/naniens/add-commentaire/{idPub}:
 *   description: Ajout d'un commentaire.
 *   post:
 *     summary: Ajout d'un commentaire.
 *     parameters:
 *       - in: path
 *         name: idPub
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               contenuComment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentaire ajoute avec success !
 *       400:
 *         description: Erreur lors de l'ajout du commentaire.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.post(
  "/add-commentaire/:idPub",
  authNaniens,
  upload.any(),
  addCommentaires
);

/**
 * @swagger
 * /api/naniens/get-comments-from-pub/{idPub}:
 *   description: Affichage des commentaires d'une publication.
 *   get:
 *     summary: Affichage des commentaires d'une publication.
 *     parameters:
 *       - in: path
 *         name: idPub
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Commentaires affichés avec success !
 *       400:
 *         description: Erreur lors de l'affichage des commentaires.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/get-comments-from-pub/:idPub",
  authNaniens,
  getCommentairesFromPublication
);

/**
 * @swagger
 * /api/naniens/all-comments:
 *   description: Affichage de tous les commentaires.
 *   get:
 *     summary: Affichage de tous les commentaires.
 *     responses:
 *       200:
 *         description: Commentaires affichés avec success !
 *       400:
 *         description: Erreur lors de l'affichage des commentaires.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.get("/all-comments", authNaniens, getAllCommentaires);

/**
 * @swagger
 * /api/naniens/get-one-comment/{id}:
 *   description: Affichage d'un commentaire.
 *   get:
 *     summary: Affichage d'un commentaire.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du commentaire.
 *     responses:
 *       200:
 *         description: Commentaire affiché avec success !
 *       400:
 *         description: Erreur lors de l'affichage du commentaire.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.get("/get-one-comment/:id", authNaniens, getOneCommentaires);

/**
 * @swagger
 * /api/naniens/delete-comment/{id}:
 *   description: Suppression d'un commentaire.
 *   delete:
 *     summary: Suppression d'un commentaire.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du commentaire.
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec success !
 *       400:
 *         description: Erreur lors de la suppression du commentaire.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.delete("/delete-comment/:id", authNaniens, deleteCommentaires);

export default router;
