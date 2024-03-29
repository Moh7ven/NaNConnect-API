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
    unique: [true, "Ce nom d'utilisateur existe déja !"],
  },
  emailNanien: {
    type: String,
    required: [true, "Veuillez entrer votre email !"],
    unique: true,
  },
  passwordNanien: {
    type: String,
    required: [true, "Veuillez entrer votre mot de passe"],
  },
  dateNaissNanien: { type: String, required: true },
  promotionNanien: { type: String, required: true },
  matricule: { type: String, required: true },
  adresseNanien: { type: String, required: true },
  telNanien: {
    type: String,
    required: true,
    unique: [true, "Ce numéro existe déja !"],
  },
  status: { type: Boolean, default: false },
  createdAtNanien: { type: String, required: true },
  image: { type: String, required: false },
  socialNetworks: [
    {
      facebook: { type: String, required: false },
      twitter: { type: String, required: false },
      instagram: { type: String, required: false },
      linkedin: { type: String, required: false },
      github: { type: String, required: false },
      gitlab: { type: String, required: false },
      portefolio: { type: String, required: false },
      figma: { type: String, required: false },
    },
  ],
});

nanienSchema.plugin(uniqueValidator);

export default nanienSchema = mongoose.model("Naniens", nanienSchema);
