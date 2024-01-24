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
