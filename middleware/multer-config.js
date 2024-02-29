import multer from "multer";
import path from "path";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "video/mp3": "mp3",
  "video/mpeg": "mp3",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log(file);
    if (file.fieldname === "image" || file.fieldname === "video") {
      callback(null, "./assets");
    } else {
      callback(new Error("Type de fichier non pris en charge"));
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    // const extension = MIME_TYPES[file.mimetype];
    // callback(null, name + Date.now() + extension);

    callback(null, `${Date.now()}-${name}`);
    console.log(file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

export default upload;
/* module.exports = multer({ storage: storage }).single("image"); */
