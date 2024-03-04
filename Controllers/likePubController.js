import LikePub from "../models/LikePub.js";
import theDate from "../utils/generateDate.js";

//FONCTION POUR RECUPERER LES LIKES DE LA PUB
export const getLikes = (req, res) => {
  LikePub.find({ idPub: req.params.idPub })
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR AJOUTER UN LIKE
export const addLike = (req, res) => {
  const like = new LikePub({
    idPub: req.params.idPub,
    idNanien: req.auth.nanienId,
    createdAt: theDate(),
  });
  like
    .save()
    .then(() => {
      res.status(200).json({ message: "Like ajouter !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR SUPPRIMER UN LIKE
export const disLike = (req, res) => {
  LikePub.findOne({ idPub: req.params.idPub, idNanien: req.auth.nanienId })
    .then((like) => {
      if (!like) {
        return res.status(401).json({ message: "Like inexistant !" });
      }
      LikePub.deleteOne({ _id: like._id })
        .then(() => {
          res.status(200).json({ message: "Like supprimer !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
