require("dotenv").config();
const gamesRouter = require("express").Router();
const addBoardgame = require("../controllers/boardgameController/addBoardgameController");
const {
  getAllBoardgames,
  getMyBoardgames,
} = require("../controllers/boardgameController/getBoardgameController");

gamesRouter.get("/all-boardgames", getAllBoardgames);
gamesRouter.get("/my-boardgames/:id", getMyBoardgames);
gamesRouter.patch("/all-boardgames/add/:gameId/:idUser", addBoardgame);

module.exports = gamesRouter;
