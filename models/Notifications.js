import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  idNanien: { type: String, required: true }, // Identifiant de l'utilisateur concerné
  idPub: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true }, // Contenu de la notification
  read: { type: Boolean, default: false }, // État de la notification (lu/non lu)
  createdAt: { type: Date, default: Date.now }, // Date de création de la notification
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
