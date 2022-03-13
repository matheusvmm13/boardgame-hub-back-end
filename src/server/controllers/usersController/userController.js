const chalk = require("chalk");
const debug = require("debug")("boardgame:controller-user");
const User = require("../../../database/models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("matches")
      .populate({ path: "boardgames", select: "name" });
    res.status(200).json({ users });
    debug(`These are all the users: ${users}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "boardgames",
      select: "name",
    });
    res.status(200).json({ user });
    debug(`This is the users: ${user}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = { getUsers, getUserById };
