import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import {
  deleteSearchHistory,
  getAllSearchHistory,
  getByUserConnetectedSearchHistory,
  makeSearch,
} from "../Controllers/searchController.js";
import upload from "../middleware/multer-config.js";

const router = express.Router();

/**
 * @swagger
 * /api/search/make-search:
 *   description: Recherche d'un utilisateur.
 *   post:
 *     summary: Recherche d'un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *     responses:
 *       200:
 *         description: Requête réussie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/make-search", authNaniens, upload, makeSearch);

/**
 * @swagger
 * /api/search/get-all-search-history:
 *   description: Recupérer toutes les recherches effectuées.
 *   get:
 *     summary: Recupérer toutes les recherches effectuées.
 *     responses:
 *       200:
 *         description: Requête réussie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/get-all-search-history", authNaniens, upload, getAllSearchHistory);

/**
 * @swagger
 * /api/search/get-user-connected-search-history:
 *   description: Recupérer toutes les recherches effectuées par l'utilisateur connecté.
 *   get:
 *     summary: Recupérer toutes les recherches effectuées par l'utilisateur connecté.
 *     responses:
 *       200:
 *         description: Requête réussie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get(
  "/get-user-connected-search-history",
  authNaniens,
  upload,
  getByUserConnetectedSearchHistory
);

/**
 * @swagger
 * /api/search/delete-search-history/{id}:
 *   description: Supprimer une recherche.
 *   delete:
 *     summary: Supprimer une recherche.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de la recherche.
 *     responses:
 *       200:
 *         description: Requête réussie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete(
  "/delete-search-history/:id",
  authNaniens,
  upload,
  deleteSearchHistory
);

export default router;
