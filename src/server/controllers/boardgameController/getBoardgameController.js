const debug = require("debug")("boardgame:get-boardgame");
const chalk = require("chalk");
const Boardgame = require("../../../database/models/Boardgame");
const User = require("../../../database/models/User");

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

const getMyBoardgames = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "boardgames",
      select:
        "-primary_publisher -primary_designer -distributors -msrps -mechanics -categories -publishers -designers -historical_low_prices",
    });
    res.status(200).json(user.boardgames);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = { getAllBoardgames, getMyBoardgames };
