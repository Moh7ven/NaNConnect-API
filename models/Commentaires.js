import mongoose from "mongoose";

const commentaireSchema = mongoose.Schema({
  idNanien: { type: String, required: true },
  idPub: { type: String, required: true },
  contenuComment: { type: String, required: true },
  createdAtCom: { type: String, required: true },
});

export default commentaireSchema = mongoose.model(
  "Commentaires",
  commentaireSchema
);
