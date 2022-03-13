require("dotenv").config();
const gamesRouter = require("express").Router();
const addBoardgame = require("../controllers/boardgameController/addBoardgameController");
const getAllBoardgames = require("../controllers/boardgameController/getBoardgameController");

gamesRouter.get("/all-boardgames", getAllBoardgames);
gamesRouter.patch("/all-boardgames/add/:gameId/:idUser", addBoardgame);

module.exports = gamesRouter;
