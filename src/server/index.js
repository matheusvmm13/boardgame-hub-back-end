require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { notFoundError, generalError } = require("./middlewares/errors");
const matchesRouter = require("./routers/matchesRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use(matchesRouter);
app.use(usersRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
