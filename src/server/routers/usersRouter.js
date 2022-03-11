require("dotenv").config();
const usersRouter = require("express").Router();
const loginController = require("../controllers/usersController/loginController");
const getUsers = require("../controllers/usersController/userController");

usersRouter.post("/users/login/", loginController);
usersRouter.get("/users/", getUsers);

module.exports = usersRouter;
