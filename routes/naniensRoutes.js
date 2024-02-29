import express from "express";
import multer from "multer";
import {
  signupNanien,
  loginNanien,
  getNanienConnected,
  getAllNaniens,
} from "../Controllers/naniensController.js";
import upload from "../middleware/multer-config.js";
import authNaniens from "../middleware/authNaniens.js";
import checkEmail from "../middleware/checkEmail.js";

const router = express.Router();

/**
 * @swagger
 * /api/naniens/signupnaniens:
 *   description: Inscription d'un utilisateur.
 *   post:
 *     summary: Inscription d'un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nomNanien:
 *                 type: string
 *               prenomNanien:
 *                 type: string
 *               nanienUsername:
 *                 type: string
 *               emailNanien:
 *                 type: string
 *                 format: email
 *               passwordNanien:
 *                 type: string
 *               dateNaissNanien:
 *                 type: string
 *               promotionNanien:
 *                 type: string
 *               matricule:
 *                 type: string
 *               adresseNanien:
 *                 type: string
 *               telNanien:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inscription reussie.
 *       400:
 *         description: Erreur lors de l'inscription.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/signupnaniens", upload, signupNanien);

/**
 * @swagger
 * /api/naniens/loginnaniens:
 *   description: Connexion d'un utilisateur.
 *   post:
 *     summary: Connexion d'un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               emailNanien:
 *                 type: string
 *                 format: email
 *               passwordNanien:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion reussie.
 *       400:
 *         description: Erreur lors de la connexion.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/loginnaniens", upload, loginNanien);

/**
 * @swagger
 * /api/naniens/allnaniens:
 *   description: Récupération de tous les utilisateurs.
 *   get:
 *     summary: Récupération de tous les utilisateurs.
 *     responses:
 *       200:
 *         description: Requête réussie.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/allnaniens", authNaniens, getAllNaniens);

/**
 * @swagger
 * /api/naniens/nanienconnected:
 *   description: Récupération des informations de l'utilisateur connecté.
 *   get:
 *     summary: Récupération des informations de l'utilisateur connecté.
 *     responses:
 *       200:
 *         description: Requête réussie.
 *       500:
 *         description: Erreur interne du serveur.
 *       401:
 *         description: Utilisateur non-connecté.
 */
router.get("/nanienconnected", authNaniens, getNanienConnected);

export default router;
