const chalk = require("chalk");
const debug = require("debug")("boardgame:controller-user");
const User = require("../../../database/models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
    debug(`These are all the users: ${users}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = getUsers;
