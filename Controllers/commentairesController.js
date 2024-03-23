import Commentaires from "../models/Commentaires.js";
import Publication from "../models/Publications.js";
import Naniens from "../models/Naniens.js";
import theDate from "../utils/generateDate.js";

export const addCommentaires = (req, res) => {
  Naniens.find({ _id: req.auth.nanienId }).then((nanien) => {
    if (!nanien) {
      return res.status(401).json({ message: "Utilisateur non-connecté" });
    }

    Publication.findOne({ _id: req.params.idPub })
      .then((publication) => {
        //Ici, je verifie si la publication existe
        if (!publication) {
          return res.status(404).json({ message: "Publication non trouvée" });
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
      })
      .catch((error) => res.status(500).json({ error }));
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

export const getOneCommentaires = (req, res) => {
  Commentaires.findOne({ _id: req.params.id })
    .then((commentaire) => {
      if (!commentaire) {
        return res.status(404).json({ message: "Commentaire non trouvé" });
      }
      res.status(200).json(commentaire);
    })

    .catch((error) => res.status(400).json({ error }));
};

export const updateComment = (req, res) => {
  const commentId = req.params.commentId;
  const nanienId = req.auth.nanienId;
  const { contenuComment } = req.body;

  Commentaires.findOne({ _id: commentId })
    .then((commentaire) => {
      if (!commentaire) {
        return res.status(404).json({ message: "Commentaire non trouvé !" });
      }

      if (commentaire.idNanien !== nanienId) {
        return res.status(401).json({ message: "Vous n'etes pas autorisé !" });
      }

      if (commentaire.modifCom === true) {
        return res.status(401).json({
          message: "Impossible de modifier ce commentaire plus d'une fois !",
        });
      }

      // Mettre à jour le commentaire
      Commentaires.updateOne(
        { _id: commentId },
        { contenuComment, createdAtCom: theDate(), modifCom: true }
      )
        .then(() => {
          res.status(200).json({ message: "Commentaire mis à jour !" });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du commentaire." });
        });
    })
    .catch();
};

export const deleteCommentaires = (req, res) => {
  const commentId = req.params.id;
  const nanienId = req.auth.nanienId; // Identifiant de l'utilisateur authentifié

  // Vérifier si l'utilisateur est l'auteur du commentaire
  Commentaires.findById(commentId)
    .then((commentaire) => {
      if (!commentaire) {
        return res.status(404).json({ error: "Commentaire non trouvé." });
      }

      // Si l'utilisateur est l'auteur du commentaire, supprimer le commentaire
      if (commentaire.idNanien === nanienId) {
        Commentaires.deleteOne({ _id: commentId })
          .then(() => {
            res
              .status(200)
              .json({ message: "Commentaire supprimé avec succès !" });
          })
          .catch((error) =>
            res
              .status(500)
              .json({ error: "Erreur lors de la suppression du commentaire." })
          );
      } else {
        // Sinon, vérifier si l'utilisateur est l'auteur de la publication associée au commentaire
        Publication.findOne({ _id: commentaire.idPub, idNanien: nanienId })
          .then((publication) => {
            if (!publication) {
              return res.status(403).json({
                error: "Accès non autorisé à la suppression du commentaire.",
              });
            }

            // Si l'utilisateur est l'auteur de la publication, supprimer le commentaire
            Commentaires.deleteOne({ _id: commentId })
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Commentaire supprimé avec succès !" });
              })
              .catch((error) =>
                res.status(500).json({
                  error: "Erreur lors de la suppression du commentaire.",
                })
              );
          })
          .catch((error) =>
            res.status(500).json({
              error:
                "Erreur lors de la vérification de l'accès à la publication.",
            })
          );
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error: "Erreur lors de la recherche du commentaire." })
    );
};
