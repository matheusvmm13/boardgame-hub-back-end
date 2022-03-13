require("dotenv").config();
const gamesRouter = require("express").Router();
const addBoardgame = require("../controllers/boardgameController/addBoardgameController");
const getAllBoardgames = require("../controllers/boardgameController/getBoardgameController");

gamesRouter.get("/", getAllBoardgames);
gamesRouter.patch("/all-boardgames/add/:gameName/:idUser", addBoardgame);

module.exports = gamesRouter;
