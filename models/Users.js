import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

let userSchema = mongoose.Schema({
  nomUser: {
    type: String,
    required: [true, "Veuillez entrer votre nom !"],
  },
  prenomUser: {
    type: String,
    required: [true, "Veuillez entrer votre prenom !"],
  },
  username: {
    type: String,
    required: [true, "Veuillez enter un nom d'utilisateur"],
  },
  emailUser: {
    type: String,
    required: [true, "Veuillez entrer votre email !"],
  },
  passwordUser: {
    type: String,
    required: [true, "Veuillez entrer votre mot de passe"],
  },
  dateNaissUser: { type: String, required: true },
  promotionUser: { type: String, required: true },
  matricule: { type: String, required: true },
  adresseUser: { type: String, required: true },
  telUser: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

export default userSchema = mongoose.model("Users", userSchema);
