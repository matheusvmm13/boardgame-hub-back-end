require("dotenv").config();
const usersRouter = require("express").Router();
const loginController = require("../controllers/usersController/loginController");
const {
  getUsers,
  getUserById,
} = require("../controllers/usersController/userController");

usersRouter.get("/users/", getUsers);
usersRouter.get("/users/:id", getUserById);
usersRouter.post("/users/login/", loginController);

module.exports = usersRouter;
