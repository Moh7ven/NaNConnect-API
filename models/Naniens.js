import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

let nanienSchema = mongoose.Schema({
  nomNanien: {
    type: String,
    required: [true, "Veuillez entrer votre nom !"],
  },
  prenomNanien: {
    type: String,
    required: [true, "Veuillez entrer votre prenom !"],
  },
  nanienUsername: {
    type: String,
    required: [true, "Veuillez enter un nom d'utilisateur"],
  },
  emailNanien: {
    type: String,
    required: [true, "Veuillez entrer votre email !"],
  },
  passwordNanien: {
    type: String,
    required: [true, "Veuillez entrer votre mot de passe"],
  },
  dateNaissNanien: { type: String, required: true },
  promotionNanien: { type: String, required: true },
  matricule: { type: String, required: true },
  adresseNanien: { type: String, required: true },
  telNanien: { type: Number, required: true },
});

nanienSchema.plugin(uniqueValidator);

export default nanienSchema = mongoose.model("Naniens", nanienSchema);
