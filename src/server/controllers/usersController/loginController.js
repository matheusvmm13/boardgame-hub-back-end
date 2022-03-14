const debug = require("debug")("boardgame:user-login");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../database/models/User");

const secret = process.env.JWT_SECRET;

const loginController = async (req, res, next) => {
  debugger;
  const loginErrorProtocol = () => {
    const loginError = new Error("Wrong credentials");
    debug(chalk.red(`Error: `, loginError.message));
    loginError.status = 401;
    next(loginError);
  };
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
      const userPayload = {
        name: foundUser.name,
        id: foundUser.id,
      };
      const token = jwt.sign(userPayload, secret);
      res.status(200).json({ token });
    } else {
      loginErrorProtocol();
    }
  } else {
    loginErrorProtocol();
  }
};
module.exports = loginController;
