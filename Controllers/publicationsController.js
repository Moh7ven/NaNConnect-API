import Publications from "../models/Publications.js";
import Naniens from "../models/Naniens.js";
import theDate from "../utils/generateDate.js";

export const addPublication = (req, res) => {
  Naniens.find({ _id: req.auth.nanienId })
    .then((nanien) => {
      if (!nanien) {
        return res.status(401).json({ message: "Utilisateur non-connecté" });
      }
      const publication = new Publications({
        idNanien: req.auth.nanienId,
        libPub: req.body.libPub,
        createdAtPub: theDate(),
        imagePub: req.body.imagePub,
        modifPub: req.body.modifPub,
        authorName: `${nanien[0].nomNanien} ${nanien[0].prenomNanien}`,
        authorUsername: nanien[0].nanienUsername,
      });

      publication
        .save()
        .then(() => {
          res.status(200).json({ message: "Publication ajouter !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
