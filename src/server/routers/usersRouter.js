require("dotenv").config();
const usersRouter = require("express").Router();
const {
  getMyMatches,
} = require("../controllers/matchController/matchController");
const loginController = require("../controllers/usersController/loginController");
const getUsers = require("../controllers/usersController/userController");

usersRouter.get("/users/", getUsers);
usersRouter.get("/users/my-matches/:id", getMyMatches);
usersRouter.post("/users/login/", loginController);

module.exports = usersRouter;
