import Publications from "../models/Publications.js";
import Commentaires from "../models/Commentaires.js";
import LikePub from "../models/LikePub.js";
import Naniens from "../models/Naniens.js";
import theDate from "../utils/generateDate.js";
import fs from "fs/promises";

export const addPublication = (req, res) => {
  Naniens.find({ _id: req.auth.nanienId })
    .then((nanien) => {
      if (!nanien) {
        return res.status(401).json({ message: "Utilisateur non-connecté" });
      }

      //Verification des fichiers images et videos si rien n'est pas soumis par l'user alors il prend la valeur null
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

export const getPublicationWithCommentsAndLikes = (req, res) => {
  Publications.findById(req.params.idPub)
    .then((publication) => {
      Commentaires.find({ idPub: req.params.idPub })
        .then((commentaires) => {
          LikePub.find({ idPub: req.params.idPub })
            .then((likes) => {
              res.status(200).json({ publication, commentaires, likes });
            })
            .catch((error) => {
              res
                .status(400)
                .json({ error: "Erreur lors de la sélection des likes." });
            });
        })
        .catch((error) => {
          res.status(400).json({
            error: "Erreur lors de la récupération des commentaires.",
          });
        });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error: "Erreur lors de la récupération de la publication." });
    });
};

export const deletePublication = async (req, res) => {
  try {
    // Trouver la publication à supprimer
    const pub = await Publications.findOne({ _id: req.params.id });

    // Vérifier si la publication existe
    if (!pub) {
      return res.status(404).json({ message: "Publication non trouvée" });
    }

    // Vérifier si l'utilisateur est autorisé à supprimer cette publication
    if (pub.idNanien !== req.auth.nanienId) {
      return res.status(401).json({
        message: "Vous n'êtes pas autorisé à supprimer cette publication",
      });
    }

    // Extraire les noms de fichiers des images à supprimer
    const filenamesImage =
      pub.image && pub.image.length > 0
        ? pub.image.map((file) => file.split("/assets/")[1])
        : [];

    // Extraire les noms de fichiers des vidéos à supprimer
    const filenamesVideo =
      pub.video && pub.video.length > 0
        ? pub.video.map((file) => file.split("/assets/")[1])
        : [];

    // Supprimer la publication de la base de données
    await Publications.deleteOne({ _id: req.params.id });

    // Supprimer les commentaires liés à la publication
    await Commentaires.deleteMany({ idPub: req.params.id });

    // Fonction pour supprimer les fichiers
    const deleteFiles = async (filenames, type) => {
      const results = [];

      for (const filename of filenames) {
        if (filename) {
          try {
            // Supprimer le fichier du dossier 'assets'
            await fs.unlink(`./assets/${filename}`);
            results.push(`${type} ${filename} supprimé(e) !`);
          } catch (err) {
            console.log(err);
            results.push(
              `Erreur lors de la suppression de ${type} ${filename}`
            );
          }
        }
      }

      return results;
    };

    // Supprimer les images
    const imageResults = await deleteFiles(filenamesImage, "image");

    // Supprimer les vidéos
    const videoResults = await deleteFiles(filenamesVideo, "vidéo");

    // Répondre avec un message indiquant les éléments supprimés
    /* res.status(200).json({
      message:
        "Publication, commentaires, " +
        imageResults.join(" ") +
        " " +
        videoResults.join(" "),
    }); */
    res.status(200).json({
      message: "Publication supprimée avec success !",
    });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec le message d'erreur
    res.status(500).json({ error: error.message });
  }
};
