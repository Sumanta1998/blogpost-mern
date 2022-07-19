const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const userD = req.userData;
  console.log(userD);

  try {
    if (userD) {
      let user = await User.findOne({ _id: userD.userId });
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
    error.message = "You are note a WRITER";
    next(error);
  } else {
    const error = new Error();
    error.message = "You are note a WRITER!!";
    next(error);
  }
}
