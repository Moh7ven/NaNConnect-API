import Naniens from "../models/Naniens.js";
import Publication from "../models/Publications.js";
import Search from "../models/Search.js";

export const makeSearch = async (req, res) => {
  const { terms } = req.body;
  const userId = req.params.userId;

  const nanien = await Naniens.find({
    $or: [
      { nomNanien: { $regex: terms, $options: "i" } },
      { prenomNanien: { $regex: terms, $options: "i" } },
      { nanienUsername: { $regex: terms, $options: "i" } },
      { matricule: { $regex: terms, $options: "i" } },
    ],
  });

  const publication = await Publication.find({
    $or: [
      { libNanien: { $regex: terms, $options: "i" } },
      { authorName: { $regex: terms, $options: "i" } },
      { authorUsername: { $regex: terms, $options: "i" } },
    ],
  });

  const search = new Search({
    terms: terms,
    usersId: userId,
  });

  search
    .save()
    .then(() => {
      res.status(201).json({ nanien, publication });
    })
    .catch((error) => res.status(400).json({ error }));
};

export const getAllSearch = async (req, res) => {
  try {
    const search = await Search.find();
    res.status(200).json(search);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getByUserConnetectedSearch = async (req, res) => {
  try {
    const search = await Search.find({ usersId: req.params.userId });
    res.status(200).json(search);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
