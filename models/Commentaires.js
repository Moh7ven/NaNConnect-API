import mongoose from "mongoose";

const commentaireSchema = mongoose.Schema({
  idNanien: { type: String, required: true },
  idPub: { type: String, required: true },
  contenuCom: { type: String, required: true },
});

export default commentaireSchema = mongoose.model(
  "Commentaires",
  commentaireSchema
);
