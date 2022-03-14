const jsonwebtoken = require("jsonwebtoken");

const tokenAuth = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const error = new Error("The token is missing");
    error.status = 401;
    next(error);
  } else {
    try {
      const token = headerAuth.replace("Bearer ", "");
      jsonwebtoken.verify(token, process.env.JWT_SECRET);
      const { _id } = jsonwebtoken.decode(token, { payload: true });
      req.userId = _id;
      next();
    } catch (error) {
      const myError = new Error("No token");
      error.status = 401;
      next(myError);
    }
  }
};

module.exports = tokenAuth;
