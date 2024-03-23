import Naniens from "../models/Naniens.js";
import Publication from "../models/Publications.js";
import Search from "../models/Search.js";

export const makeSearch = async (req, res) => {
  const { terms } = req.body;
  const nanienId = req.auth.nanienId;

  const nanienResults = await Naniens.find({
    $or: [
      { nomNanien: { $regex: terms, $options: "i" } },
      { prenomNanien: { $regex: terms, $options: "i" } },
      { nanienUsername: { $regex: terms, $options: "i" } },
      { matricule: { $regex: terms, $options: "i" } },
    ],
  });

  const publicationResults = await Publication.find({
    $or: [
      { libNanien: { $regex: terms, $options: "i" } },
      { authorName: { $regex: terms, $options: "i" } },
      { authorUsername: { $regex: terms, $options: "i" } },
    ],
  });

  const search = new Search({
    terms: terms,
    nanienId: nanienId,
  });

  search
    .save()
    .then(() => {
      res
        .status(201)
        .json({ nanien: nanienResults, publication: publicationResults });
    })
    .catch((error) => res.status(400).json({ error }));
};

export const getAllSearchHistory = async (req, res) => {
  try {
    const search = await Search.find();
    res.status(200).json(search);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getByUserConnetectedSearchHistory = async (req, res) => {
  try {
    const searches = await Search.find({ nanienId: req.auth.nanienId });

    if (!searches || searches.length === 0) {
      return res
        .status(401)
        .json({ message: "Aucun historique de recherche !" });
    }
    res.status(200).json(searches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteSearchHistory = async (req, res) => {
  try {
    const search = await Search.findOne({
      _id: req.params.id,
      nanienId: req.auth.nanienId,
    });
    if (!search) {
      return res
        .status(401)
        .json({ message: "Cette recherche est inexistant !" });
    }

    await Search.deleteOne({ _id: search._id });
    res.status(200).json({
      message: `Historique de la recherche ${search.terms} supprimée !`,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
