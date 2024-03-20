import Naniens from "../models/Naniens.js";
import Publication from "../models/Publications.js";
import Search from "../models/Search.js";

export const makeSearch = (req, res) => {
  console.log(req.body);
  console.log(req.body.terms);
  const { terms } = req.body;
  const userId = req.params.userId;

  const search = new Search({
    terms: terms,
    usersId: userId,
  });

  search
    .save()
    .then(() => {
      res.status(201).json({ message: "Recherche ajouter !" });
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
