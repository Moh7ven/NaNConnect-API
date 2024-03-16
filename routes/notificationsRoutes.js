import express from "express";
import authNaniens from "../middleware/authNaniens.js";
import {
  getNotifications,
  getAllNotifications,
} from "../Controllers/notificationsController.js";

const router = express.Router();

/**
 * @swagger
 * /api/notifications/get-notifications:
 *   description: Affichage des notifications d'un utilisateur connecté.
 *   get:
 *     summary: Affichage des notifications d'un utilisateur connecté.
 *     responses:
 *       200:
 *         description: Notifications affichées avec success !
 *       404:
 *         description: Erreur lors de l'affichage des notifications.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/get-notifications", authNaniens, getNotifications);

/**
 * @swagger
 * /api/notifications/get-all-notifications:
 *   description: Affichage de toutes les notifications.
 *   get:
 *     summary: Affichage de toutes les notifications.
 *     responses:
 *       200:
 *         description: Notifications affichées avec success !
 *       404:
 *         description: Erreur lors de l'affichage des notifications.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/get-all-notifications", authNaniens, getAllNotifications);

export default router;
