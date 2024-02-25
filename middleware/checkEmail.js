import ConfirmationEmail from "../models/ConfirmationEmail.js";

//FONCTION POUR VERIFIER SI L'EMAIL EST CONFIRMÉ
export default async (req, res, next) => {
  try {
    const confirmationEmail = await ConfirmationEmail.findOne({
      emailNanien: req.body.emailNanien,
    });
    if (!confirmationEmail || !confirmationEmail.confirmed) {
      return res.status(401).json({ message: "Email non confirmer !" });
    }

    console.log("Email confirmer");
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erreur lors de la verification du code de confirmation",
    });
  }
};
