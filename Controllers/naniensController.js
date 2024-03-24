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
        image: `${req.protocol}://${req.get("host")}/assets/${
          req.files.image[0].filename
        }`,
      });

      nanien
        .save()
        .then(() => {
          res.status(200).json({
            message: `Bravo, vous avez été bien enregistré, Vous recevrez un email à l'adresse ${req.body.emailNanien} pour confirmer votre compte.`,
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
  Naniens.findOne({ _id: req.auth.nanienId })
    .then((nanien) => {
      if (!nanien) {
        return res.status(401).json({ message: "Utilisateur non-connecté" });
      }
      const { nomNanien, prenomNanien, emailNanien, nanienUsername, image } =
        nanien;
      res
        .status(200)
        .json({ nomNanien, prenomNanien, emailNanien, nanienUsername, image });
    })
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR MODIFIER LES INFOS DE L'UTILISATEUR
export const updateProfile = (req, res) => {
  const nanienObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/assets/${
          req.files.image[0].filename
        }`,
      }
    : { ...req.body };

  Naniens.findOne({ _id: req.auth.nanienId })
    .then((nanien) => {
      if (nanien._id != req.auth.nanienId) {
        return res
          .status(401)
          .json({ message: "Vous n'est pas autorisé à modifier ce profil" });
      } else {
        Naniens.updateOne(
          { _id: req.auth.nanienId },
          { ...nanienObject, _id: req.auth.nanienId }
        )
          .then(() => res.status(200).json({ message: "Profil mis à jour" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
