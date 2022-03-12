require("dotenv").config();
const matchesRouter = require("express").Router();
const {
  getAllMatches,
  createNewMatch,
  deleteMyMatch,
  createNewMatchWithId,
} = require("../controllers/matchController/matchController");

matchesRouter.get("/matches/", getAllMatches);
matchesRouter.post("/my-matches/new-match", createNewMatch);
matchesRouter.post("/my-matches/new-match/:userId", createNewMatchWithId);
matchesRouter.delete("/my-matches/delete/:id", deleteMyMatch);

module.exports = matchesRouter;
