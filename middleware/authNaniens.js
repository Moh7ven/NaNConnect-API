import jwt from "jsonwebtoken";

// Middleware to check if user is authenticated
export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const nanienId = decodedToken.nanienId;

    req.auth = {
      nanienId: nanienId,
    };

    next();
    /* if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    } */
  } catch (error) {
    res.status(401).json({
      error: error,
      message:
        "Une erreur est survenue lors de la vérification du token. Veuillez vous reconnecter.",
    });
  }
};
