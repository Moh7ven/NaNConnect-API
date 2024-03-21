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
    const search = await Search.find({ nanienId: req.params.nanienId });
    res.status(200).json(search);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};