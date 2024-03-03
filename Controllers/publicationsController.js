import Publications from "../models/Publications.js";
import Naniens from "../models/Naniens.js";
import theDate from "../utils/generateDate.js";

export const addPublication = (req, res) => {
  console.log("req.files:", req.files);
  console.log('req.files["image"]:', req.files && req.files["image"]);
  console.log('req.files["video"]:', req.files && req.files["video"]);

  Naniens.find({ _id: req.auth.nanienId })
    .then((nanien) => {
      if (!nanien) {
        return res.status(401).json({ message: "Utilisateur non-connecté" });
      }

      //Verification des fichiers images et videos si rien n'est soumis par l'user alors il prend la valeur null
      const imagePath =
        req.files && req.files["image"]
          ? `${req.protocol}://${req.get("host")}/assets/${
              req.files["image"][0].filename
            }`
          : null;
      const videoPath =
        req.files && req.files["video"]
          ? `${req.protocol}://${req.get("host")}/assets/${
              req.files["video"][0].filename
            }`
          : null;

      console.log("imagePath:", imagePath);
      console.log("videoPath:", videoPath);

      const publication = new Publications({
        idNanien: req.auth.nanienId,
        libPub: req.body.libPub,
        createdAtPub: theDate(),
        image: imagePath,
        video: videoPath,
        modifPub: req.body.modifPub,
        authorName: `${nanien[0].nomNanien} ${nanien[0].prenomNanien}`,
        authorUsername: nanien[0].nanienUsername,
      });

      publication
        .save()
        .then(() => {
          res.status(200).json({ message: "Publication ajouter !" });
        })
        .catch((error) =>
          res.status(400).json({ error, message: "Publication non ajouter !" })
        );
    })
    .catch((error) =>
      res.status(400).json({ error, message: "Publication non ajouter !" })
    );
};

export const getOnePublication = (req, res) => {
  Publications.findOne({ _id: req.params.id })
    .then((publication) => res.status(200).json(publication))
    .catch((error) => res.status(400).json({ error }));
};

export const getAllNaniensPublications = (req, res) => {
  Publications.find({ idNanien: req.auth.nanienId })
    .then((pubs) => res.status(200).json(pubs))
    .catch((error) => res.status(400).json({ error }));
};

export const getAllPublications = (req, res) => {
  Publications.find()
    .then((publications) => {
      res.status(200).json(publications);
    })
    .catch((error) => res.status(400).json({ error }));
};

export const deletePublication = (req, res) => {
  Publications.findOne({ _id: req.params.id })
    .then((pub) => {
      if (pub.idNanien != req.auth.nanienId) {
        return res.status(401).json({
          message: "Vous n'êtes pas autorisé a supprimer cette publication",
        });
      } else {
        Publications.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Publication supprimée !" });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
