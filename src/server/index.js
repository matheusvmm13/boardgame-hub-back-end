require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

module.exports = app;
