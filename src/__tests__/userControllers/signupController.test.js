const User = require("../../database/models/User");
const signupController = require("../../server/controllers/usersController/signupController");

describe("Given a Sign Up controller", () => {
  describe("When it receives a request with a new user", () => {
    test("Then it should call method json and respond with a 201 status", async () => {
      const req = {
        body: { name: "James", username: "jmayer", password: "123456789" },
      };

      const user = {
        name: "James",
        username: "jmayer",
        password:
          "$2b$10$DZkKzznjB.9YFZZsNHGI5.mSoL1MZ0fXngzjbL497rMl1PGnS3Xh.",
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(user);
      await signupController(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
  describe("When it receives a request with a username that already exists", () => {
    test("Then it should call next method with a 400 status", async () => {
      const req = {
        body: { name: "Rosa", username: "Rosa0", password: "Rosa1234" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const next = jest.fn();
      const user = {
        name: "Rosa",
        username: "Rosa0",
        password:
          "$2b$10$ZZ7dKrL4q2zWFAN8CnCWEOnWPQKQAfjbqvg8yMHnaw4DUXxUQSvae",
      };
      const error = new Error("This username isn't avaliable");
      error.status = 400;

      User.findOne = jest.fn().mockResolvedValue(user);
      await signupController(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with a username that already exists", () => {
    test("Then it should call next method with a 400 status", async () => {
      const req = {
        body: { name: "" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const next = jest.fn();

      const error = new Error("You must provide a name, username and password");
      error.status = 400;

      await signupController(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
