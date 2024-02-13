import mongoose from "mongoose";

const commentaireSchema = mongoose.Schema({
    idNanien: { type: String, required: true },
    idPub: { type: String, required: true },
    contenu: { type: String, required: true },
});