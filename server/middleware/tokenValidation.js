const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");

module.exports.validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token is missing from header");
    }

    const userToken = req.headers.authorization.split("Bearer")[1].trim();

    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || "default-secret-key"
    );

    // Si utilisé comme middleware, appelle next sans erreur

    return next();

    // Sinon, retourne true pour indiquer que le token est valide
  } catch (error) {
    console.error("Error in tokenValidation.js", error);

    // Si utilisé comme middleware, envoie une réponse d'erreur
    return res.status(401).send({
      status: 401,
      message: error.message,
    });
  }
};
