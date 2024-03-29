import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import {
  addLike,
  disLike,
  getLikes,
} from "../Controllers/likePubController.js";

const router = express.Router();

/**
 * @swagger
 * /api/publications/add-all-likes-pub/{idPub}:
 *   description: Ajout des likes d'une publication.
 *   get:
 *     summary: Ajout des likes d'une publication.
 *     parameters:
 *       - in: path
 *         name: idPub
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Likes affichés avec success !
 *       400:
 *         description: Erreur lors de l'affichage des likes.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.post("/add-like-pub/:idPub", authNaniens, addLike);

/**
 * @swagger
 * /api/publications/get-all-likes-pub/{idPub}:
 *   description: Affichage des likes d'une publication.
 *   get:
 *     summary: Affichage des likes d'une publication.
 *     parameters:
 *       - in: path
 *         name: idPub
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Likes affichés avec success !
 *       400:
 *         description: Erreur lors de l'affichage des likes.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.get("/get-all-likes-pub/:idPub", authNaniens, getLikes);

/**
 * @swagger
 * /api/publications/dislike-pub/{idPub}:
 *   description: Suppression d'un like d'une publication.
 *   delete:
 *     summary: Suppression d'un like d'une publication.
 *     parameters:
 *       - in: path
 *         name: idPub
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la publication.
 *     responses:
 *       200:
 *         description: Like supprimé avec success !
 *       400:
 *         description: Erreur lors de la suppression du like.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/dislike-pub/:idPub", authNaniens, disLike);

export default router;
