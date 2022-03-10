require("dotenv").config();
const usersRouter = require("express").Router();
const getUsers = require("../controllers/usersController/userController");

usersRouter.get("/users/", getUsers);

module.exports = usersRouter;
