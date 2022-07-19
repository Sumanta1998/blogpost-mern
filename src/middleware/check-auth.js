const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      console.log(token);
      if (token) {
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
      } else {
        handleError(null, next);
      }
    } else {
      handleError(null, next);
    }
  } catch (error) {
    handleError(error, next);
  }
};

function handleError(error, next) {
  if (error) {
    error.message = "Auth Failed!!!";
    next(error);
  } else {
    const error = new Error();
    error.message = "Auth Failed!!";
    next(error);
  }
}
