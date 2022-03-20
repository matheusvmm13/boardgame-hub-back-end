const jsonwebtoken = require("jsonwebtoken");

const tokenAuth = async (req, res, next) => {
  const headerAuthorization = req.header("authorization");
  if (!headerAuthorization) {
    const error = new Error("Missing Token");
    error.status = 401;
    return next(error);
  }
  const token = headerAuthorization.replace("Bearer ", "");
  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    error.status = 401;
    return next(error);
  }
};

module.exports = tokenAuth;
