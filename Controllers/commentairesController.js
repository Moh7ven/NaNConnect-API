import Commentaires from "../models/Commentaires.js";
import theDate from "../utils/generateDate.js";

export const addCommentaires = (req, res) => {
  const commentaires = new Commentaires({
    idNanien: req.auth.nanienId,
    idPud: req.param.idPub,
    contenuComment: req.body.contenuComment,
    createdAtCom: theDate(),
  });

  commentaires
    .save()
    .then(() => {
      res.status(200).json({ message: "Commentaire ajouter !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
