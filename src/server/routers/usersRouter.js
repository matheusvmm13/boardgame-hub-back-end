require("dotenv").config();
const usersRouter = require("express").Router();
const loginController = require("../controllers/usersController/loginController");
const signupController = require("../controllers/usersController/signupController");
const getUsers = require("../controllers/usersController/userController");

usersRouter.get("/users/", getUsers);
usersRouter.post("/users/login/", loginController);
usersRouter.post("/users/signup/", signupController);

module.exports = usersRouter;
