require("dotenv").config();
const matchesRouter = require("express").Router();
const getAllMatches = require("../controllers/matchController/matchController");

matchesRouter.get("/matches/", getAllMatches);

module.exports = matchesRouter;
