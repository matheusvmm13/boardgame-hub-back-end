const chalk = require("chalk");
const { default: mongoose } = require("mongoose");
const debug = require("debug")("boardgame:controller");
const Match = require("../../../database/models/Match");
const User = require("../../../database/models/User");

const toId = mongoose.Types.ObjectId;

const getAllMatches = async (req, res, next) => {
  try {
    const matches = await Match.find()
      .populate({
        path: "players",
        select: "-password -boardgames -matches",
      })
      .populate({
        path: "creator",
        select: "-password -boardgames -matches",
      });
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

const createNewMatchWithId = async (req, res, next) => {
  debugger;
  const userId = toId(req.params.userId);
  const matchData = req.body;

  const newMatch = {
    gameTitle: matchData.gameTitle,
    image: matchData.image,
    date: matchData.date,
    players: [],
    maxPlayers: matchData.maxPlayers,
    creator: userId,
    location: matchData.location,
  };

  try {
    const { id } = await Match.create(newMatch);
    const createdMatch = await Match.findById(id).populate("creator", userId);
    createdMatch.players.push(userId);
    await createdMatch.save();
    res.status(201).json(createdMatch);
    debug(`The match was created`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 400;
    next(error);
  }
};

const getMyMatches = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("matches");
    res.status(200).json(user.matches);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
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

module.exports = {
  getAllMatches,
  createNewMatch,
  deleteMyMatch,
  getMyMatches,
  createNewMatchWithId,
};
