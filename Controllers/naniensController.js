import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Naniens from "../models/Naniens.js";
import ConfirmationEmail from "../models/ConfirmationEmail.js";
import { welcomeEmail, codeEmail } from "../services/emailService.js";
import { generateRandomCode } from "../utils/generateRandomCode.js";
import theDate from "../utils/generateDate.js";

const code = generateRandomCode();

//FONCTION POUR S'INSCRIRE
export const signupNanien = (req, res) => {
  bcrypt
    .hash(req.body.passwordNanien, 10)
    .then((hash) => {
      const nanien = new Naniens({
        nomNanien: req.body.nomNanien,
        prenomNanien: req.body.prenomNanien,
        nanienUsername: req.body.nanienUsername,
        emailNanien: req.body.emailNanien,
        passwordNanien: hash,
        dateNaissNanien: req.body.dateNaissNanien,
        promotionNanien: req.body.promotionNanien,
        matricule: req.body.matricule,
        adresseNanien: req.body.adresseNanien,
        telNanien: req.body.telNanien,
        createdAtNanien: theDate(),
      });

      nanien
        .save()
        .then(() => {
          res.status(200).json({
            message: `Bravo, vous avez été bien enregistré`,
          });

          const confirmationEmail = new ConfirmationEmail({
            email: req.body.emailNanien,
            code: code,
          });

          confirmationEmail
            .save()
            .then(() => {
              console.log(`Email et code:  ${code} enregistrés`);
            })
            .catch((error) => {
              console.error(error);
            });

          codeEmail(req.body.emailNanien, code)
            .then((info) => {
              console.log("Email envoyé : " + info.response);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//FONCTION POUR SE CONNECTER
export const loginNanien = (req, res) => {
  Naniens.findOne({ emailNanien: req.body.emailNanien })
    .then((nanien) => {
      if (!nanien) {
        return res
          .status(401)
          .json({ error: "Email ou Mot de passe incorrect !" });
      }
      bcrypt
        .compare(req.body.passwordNanien, nanien.passwordNanien)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Email ou Mot de passe incorrect !" });
          }
          res.status(200).json({
            nanienId: nanien._id,
            token: jwt.sign({ nanienId: nanien._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            message: "Connexion reussie",
          });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//FONCTION POUR RECUPÉRER TOUS LES UTILISATEURS
export const getAllNaniens = (req, res) => {
  Naniens.find()
    .then((naniens) => res.status(200).json(naniens))
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR RECUPÉRER LES INFOS DE L'UTILISTEUR CONNECTÉ
export const getNanienConnected = (req, res) => {
  Naniens.findOne({ _id: req.auth.nanienId }).then((nanien) => {
    if (!nanien) {
      return res.status(401).json({ message: "Utilisateur non-connecté" });
    }
    const { nomNanien, prenomNanien, emailNanien, nanienUsername } = nanien;
    res
      .status(200)
      .json({ nomNanien, prenomNanien, emailNanien, nanienUsername });
  });
};
