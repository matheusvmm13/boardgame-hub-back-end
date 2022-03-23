const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const loginController = require("../server/controllers/usersController/loginController");

jest.mock("../database/models/User");

describe("Given a login user controller", () => {
  describe("When it receives a request with a matching username & password", () => {
    test("Then it must call the method json of res and the method sign of jwt", async () => {
      const userPassword = "123456";
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const userData = {
        username: "ericrage",
        password: userPassword,
      };

      const dataBaseUser = {
        username: "ericrage",
        password: hashedPassword,
      };

      const token = "374873148374982749849818";

      User.findOne = jest.fn().mockResolvedValue(dataBaseUser);
      jwt.sign = jest.fn().mockReturnValue(token);

      const req = {
        body: userData,
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      await loginController(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
      expect(User.findOne).toHaveBeenCalledWith({
        username: userData.username,
      });
    });
  });
  describe("When it receives a request with a matching username & password", () => {
    test("Then it must call the method json of res and the method sign of jwt", async () => {
      const userPassword = "123456";
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const userData = {
        username: "ericrage",
        password: userPassword,
      };

      const dataBaseUser = {
        username: "ericrage",
        password: hashedPassword,
      };

      const token = "374873148374982749849818";

      User.findOne = jest.fn().mockResolvedValue(dataBaseUser);
      jwt.sign = jest.fn().mockReturnValue(token);

      const req = {
        body: userData,
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      await loginController(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
      expect(User.findOne).toHaveBeenCalledWith({
        username: userData.username,
      });
    });
  });
  describe("When it receives a request with a wrong password", () => {
    test("Then it must call the method next with an error", async () => {
      const userPassword = "123456";
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const userData = {
        username: "ericrage",
        password: "12345wrong",
      };

      const dataBaseUser = {
        username: "ericrage",
        password: hashedPassword,
      };

      const token = "374873148374982749849818";

      User.findOne = jest.fn().mockResolvedValue(dataBaseUser);
      jwt.sign = jest.fn().mockReturnValue(token);

      const req = {
        body: userData,
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      const next = jest.fn();

      const loginError = new Error("Wrong credentials");
      loginError.status = 401;

      await loginController(req, res, next);

      expect(next).toHaveBeenCalledWith(loginError);
    });
  });
  describe("When it receives a request with a non-existent user", () => {
    test("Then it should invoke next function with an error", async () => {
      const req = {
        body: { username: "Nobody", password: "NoPassword" },
      };
      const res = {};
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(false);

      const loginError = new Error("Wrong credentials");
      loginError.status = 401;

      await loginController(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(loginError);
    });
  });
});
