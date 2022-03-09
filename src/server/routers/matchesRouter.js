require("dotenv").config();
const matchesRouter = require("express").Router();
const {
  getAllMatches,
  createNewMatch,
  deleteMyMatch,
} = require("../controllers/matchController/matchController");

matchesRouter.get("/matches/", getAllMatches);
matchesRouter.post("/my-matches/new-match", createNewMatch);
matchesRouter.delete("/my-matches/:id", deleteMyMatch);

module.exports = matchesRouter;
