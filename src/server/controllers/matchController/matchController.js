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

const createNewMatch = async (req, res, next) => {
  try {
    const newMatch = req.body;
    const createdMatch = await Match.create(newMatch);
    res.status(201).json(createdMatch);
    debug(`The match was created`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 400;
    next(error);
  }
};

const deleteMyMatch = async (req, res, next) => {
  try {
    const matchToDelete = await Match.findByIdAndDelete(req.params.id);
    res.status(200).json(matchToDelete);
    debug(`The ${matchToDelete} was deleted`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = { getAllMatches, createNewMatch, deleteMyMatch };
