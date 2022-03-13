const debug = require("debug")("boardgame:get-boardgame");
const chalk = require("chalk");
const Boardgame = require("../../../database/models/Boardgame");

const getAllBoardgames = async (req, res, next) => {
  try {
    const boardgames = await Boardgame.find();
    res.status(200).json({ boardgames });
    debug(`These are all the boardgames: ${boardgames}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = getAllBoardgames;
