import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Naniens from "../models/Naniens.js";
import { welcomeEmail } from "../services/emailService.js";

//Fonction to signup
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
      });

      nanien
        .save()
        .then(() => {
          res.status(200).json({
            message: `Bravo, vous avez été bien enregistré`,
          });
          /* transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error);
              } else {
                console.log("Email envoyé : " + info.response);
              }
            }); */
          welcomeEmail(req.body.emailNanien)
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
