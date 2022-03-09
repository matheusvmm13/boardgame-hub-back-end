require("dotenv").config();
const matchesRouter = require("express").Router();
const deleteMyMatch = require("../controllers/matchController/matchController");
const getAllMatches = require("../controllers/matchController/matchController");

matchesRouter.get("/matches/", getAllMatches);
matchesRouter.delete("/my-matches/:id", deleteMyMatch);

module.exports = matchesRouter;
