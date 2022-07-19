const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const userD = req.userData;
  try {
    if (userD) {
      let user = await User.findOne({ _id: userD.userId });
      //   console.log(token);
      if (user.role == "ADMIN") {
        console.log("ADMIN");
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
    error.message = "You are not ADMIN!!";
    next(error);
  } else {
    const error = new Error();
    error.message = "You are not ADMIN!!";
    next(error);
  }
}
