const chalk = require("chalk");
const debug = require("debug")("boardgame:controller");
const Match = require("../../../database/models/Match");

const getAllMatches = async (req, res, next) => {
  try {
    const matches = await Match.find();
    res.status(200).json({ matches });
    debug(`These are all the matches: ${matches}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = getAllMatches;
