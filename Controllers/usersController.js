import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

//Fonction to signup
export const signup = (req, res) => {
  bcrypt
    .hash(req.body.passwordUser, 10)
    .then((hash) => {
      const user = new Users({
        nomUser: req.body.nomUser,
        prenomUser: req.body.prenomUser,
        username: req.body.username,
        emailUser: req.body.emailUser,
        passwordUser: hash,
        dateNaissUser: req.body.dateNaissUser,
        promotionUser: req.body.promotionUser,
        matricule: req.body.matricule,
        adresseUser: req.body.adresseUser,
        telUser: req.body.telUser,
      });

      user
        .save()
        .then(() => {
          res.status(200).json({
            message: `Bravo, vous avez été bien enregistré`,
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

export const login = (req, res) => {
  Users.findOne({ emailUser: req.body.emailUser })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Email ou Mot de passe incorrect !" });
      }
      bcrypt
        .compare(req.body.passwordUser, user.passwordUser)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Email ou Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
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
