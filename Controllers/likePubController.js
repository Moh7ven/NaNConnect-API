import Publication from "../models/Publications.js";
import Naniens from "../models/Naniens.js";
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

//

//FONCTION POUR AJOUTER UN LIKE
export const addLike = (req, res) => {
  Naniens.find({ _id: req.auth.nanienId })
    .then((nanien) => {
      if (!nanien) {
        return res.status(401).json({ message: "Utilisateur non-connecté" });
      }

      Publication.findOne({ _id: req.params.idPub })
        .then((publication) => {
          //Ici, je verifie si la publication existe
          if (!publication) {
            return res.status(404).json({ message: "Publication non trouvée" });
          }

          const like = new LikePub({
            idPub: req.params.idPub,
            idNanien: req.auth.nanienId,
            createdAt: theDate(),
            authorName: `${nanien[0].nomNanien} ${nanien[0].prenomNanien}`,
            authorUsername: nanien[0].nanienUsername,
          });

          LikePub.findOne({
            idPub: req.params.idPub,
            idNanien: req.auth.nanienId,
          })
            .then((likes) => {
              if (likes) {
                return res.status(401).json({ message: "Like existant !" });
              }

              like
                .save()
                .then(() => {
                  res.status(200).json({ message: "Like ajouter !" });
                })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
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
