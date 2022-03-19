require("dotenv").config();
const matchesRouter = require("express").Router();
const {
  getAllMatches,
  createNewMatch,
  deleteMyMatch,
  createNewMatchWithId,
  getMyMatches,
  getMatchInfo,
} = require("../controllers/matchController/matchController");
const tokenAuth = require("../middlewares/tokenAuth");

matchesRouter.get("/matches/", getAllMatches);
matchesRouter.get("/matches/:id", getMatchInfo);
matchesRouter.post("/my-matches/new-match", tokenAuth, createNewMatch);
matchesRouter.get("/my-matches/:id", tokenAuth, getMyMatches);
matchesRouter.post(
  "/my-matches/new-match/:userId",
  tokenAuth,
  createNewMatchWithId
);
matchesRouter.delete("/my-matches/delete/:id", tokenAuth, deleteMyMatch);

module.exports = matchesRouter;
