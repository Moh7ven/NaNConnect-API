import Commentaires from "../models/Commentaires.js";
import Naniens from "../models/Naniens.js";
import theDate from "../utils/generateDate.js";

export const addCommentaires = (req, res) => {
  Naniens.find({ _id: req.auth.nanienId }).then((nanien) => {
    if (!nanien) {
      return res.status(401).json({ message: "Utilisateur non-connecté" });
    }
    const commentaires = new Commentaires({
      idNanien: req.auth.nanienId,
      idPub: req.params.idPub,
      contenuComment: req.body.contenuComment,
      authorName: `${nanien[0].nomNanien} ${nanien[0].prenomNanien}`,
      authorUsername: nanien[0].nanienUsername,
      createdAtCom: theDate(),
    });

    commentaires
      .save()
      .then(() => {
        res.status(200).json({ message: "Commentaire ajouter !" });
      })
      .catch((error) => res.status(400).json({ error }));
  });
};

export const getCommentairesFromPublication = (req, res) => {
  Commentaires.find({ idPub: req.params.idPub })
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(400).json({ error }));
};

export const getAllCommentaires = (req, res) => {
  Commentaires.find()
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(400).json({ error }));
};
