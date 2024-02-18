import Publications from "../models/Publications";

export const addPublication = (req, res) => {
    const publication = new Publications({
        idNanien: req.body.idNanien,
        libPub: req.body.libPub,
        createdAtPub: req.body.createdAtPub,
        imagePub: req.body.imagePub,
        modifPub: req.body.modifPub,
        authorName: req.body.authorName,
    });
};
