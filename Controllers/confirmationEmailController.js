import ConfirmationEmail from "../models/ConfirmationEmail.js";

export const verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const confirmationEntry = await ConfirmationEmail.findOne({ code });

    if (confirmationEntry) {
      await ConfirmationEmail.findByIdAndDelete(confirmationEntry._id);
      res
        .status(200)
        .json({ message: "Code correct ! Email confirmer avec success ! " });
    } else {
      res.status(401).json({ message: "Code incorrect ! Veuillez reessayer" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erreur lors de la verification du code de confirmation",
    });
  }
};
