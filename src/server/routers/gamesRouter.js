require("dotenv").config();
const gamesRouter = require("express").Router();
const addBoardgame = require("../controllers/boardgameController/addBoardgameController");
const {
  getAllBoardgames,
  getMyBoardgames,
} = require("../controllers/boardgameController/getBoardgameController");
const tokenAuth = require("../middlewares/tokenAuth");

gamesRouter.get("/all-boardgames", getAllBoardgames);
gamesRouter.get("/my-boardgames/:id", getMyBoardgames);
gamesRouter.patch(
  "/all-boardgames/add/:gameId/:idUser",
  tokenAuth,
  addBoardgame
);

module.exports = gamesRouter;
