import express from "express";
import multer from "multer";
import { verifyCode } from "../Controllers/confirmationEmailController.js";

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /api/naniens/confirmation-email/verifycode:
 *   description: Vérification du code de confirmation.
 *   post:
 *     summary: Vérification du code de confirmation.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code correct ! Email confirmer avec success !
 *       400:
 *         description: Erreur lors de la vérification du code de confirmation.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/verifycode", upload.any(), verifyCode);

export default router;
