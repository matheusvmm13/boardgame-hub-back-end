require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

module.exports = app;
