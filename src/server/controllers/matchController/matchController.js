/* eslint-disable no-underscore-dangle */
const chalk = require("chalk");
const debug = require("debug")("boardgame:controller");
const Match = require("../../../database/models/Match");
const User = require("../../../database/models/User");

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

const getMatchInfo = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id).populate({
      path: "creator",
      select: "-password",
    });
    res.status(200).json({ match });
    debug(`This is your match: ${match}`);
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
    const userId = createdMatch.creator;
    const user = await User.findById(userId);
    user.matches.push(createdMatch._id);
    await user.save();
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

const editMyMatch = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  const { date, maxPlayers, location } = data;
  const infoToUpdate = {
    date,
    maxPlayers,
    location,
  };
  try {
    const updatedMatch = await Match.findByIdAndUpdate(id, infoToUpdate, {
      new: true,
    });
    res.status(200).json(updatedMatch);
    debug(`The updated match: ${updatedMatch}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = {
  getAllMatches,
  getMatchInfo,
  createNewMatch,
  deleteMyMatch,
  getMyMatches,
  editMyMatch,
};
