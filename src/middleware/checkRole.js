const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const user = req.userData;
  try {
    if (user) {
      let user = await User.findOne({ _id: user.userId });
      //   console.log(token);
      if (user.role == "WRITER") {
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
