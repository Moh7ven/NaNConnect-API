import mongoose from "mongoose";

const commentaireSchema = mongoose.Schema({
  idNanien: { type: String, required: true },
  idPub: { type: String, required: true },
  contenuComment: { type: String, required: true },
  modifCom: { type: Boolean, default: false },
  authorName: { type: String, required: true },
  authorUsername: { type: String, required: true },
  createdAtCom: { type: String, required: true },
});

const Commentaires = mongoose.model("Commentaires", commentaireSchema);

export default Commentaires;
