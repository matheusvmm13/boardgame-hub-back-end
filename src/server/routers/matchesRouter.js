require("dotenv").config();
const chalk = require("chalk");
const matchesRouter = require("express").Router();
const getAllMatches = require("../controllers/matchController/matchController");

matchesRouter.get("/matches", getAllMatches);

module.exports = matchesRouter;
