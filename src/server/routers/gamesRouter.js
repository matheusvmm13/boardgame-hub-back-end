require("dotenv").config();
const gamesRouter = require("express").Router();
const addBoardgame = require("../controllers/boardgameController/boardgameController");

gamesRouter.patch("/all-boardgames/add/:gameName/:idUser", addBoardgame);

module.exports = gamesRouter;
