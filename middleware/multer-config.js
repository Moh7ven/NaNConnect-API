import multer from "multer";
import path from "path";

// Types MIME supportés et leurs extensions associées
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "video/mp3": "mp3",
  "video/mpeg": "mp3",
  "video/mp4": "mp4",
};

// Configuration du stockage des fichiers avec Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Liste des types de fichiers autorisés
    const allowedFileTypes = ["image", "video"];

    // Vérifie si le type de fichier est autorisé
    if (allowedFileTypes.includes(file.fieldname)) {
      // Si autorisé, définir le répertoire de destination
      callback(null, "./assets");
    } else {
      // Si non autorisé, renvoyez une erreur
      callback(new Error("Type de fichier non pris en charge"));
    }
  },
  filename: (req, file, callback) => {
    // Nettoie le nom du fichier en remplaçant les espaces par des underscores
    const name = file.originalname.split(" ").join("_");

    // Obtient l'extension du fichier à partir du type MIME
    const extension = MIME_TYPES[file.mimetype];

    // Vérifie si l'extension est définie
    if (!extension) {
      // Si non définie, renvoyez une erreur
      return callback(new Error("Type de fichier non pris en charge"));
    }

    // Construction du nom du fichier avec le timestamp pour le rendre unique
    callback(null, `${Date.now()}-${name}.${extension}`);
  },
});

// Configuration du middleware Multer avec la configuration de stockage définie ci-dessus
const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 }, // Maximum 1 fichier pour le champ "image"
  { name: "video", maxCount: 1 }, // Maximum 1 fichier pour le champ "video"
]);

// Exporte le middleware pour une utilisation dans d'autres parties de l'application
export default upload;
