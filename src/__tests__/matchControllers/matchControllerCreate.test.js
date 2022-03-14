/* eslint-disable no-underscore-dangle */
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDataBase = require("../../database");
const {
  createNewMatch,
} = require("../../server/controllers/matchController/matchController");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);
});

describe("Given a /my-matches/id endpoint", () => {
  describe("When it receives a POST request", () => {
    test("Then it should reply with a 200 status code", async () => {
      const req = {
        body: {
          gameTitle: "Blood Rage",
          image: "",
          creator: "622a4dc955c15b820edc9a45",
          date: "2022-04-01",
          maxPlayers: 4,
          location: "Barcelona",
          id: "622b60c1c250e10c2410d952",
        },
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      const next = jest.fn();

      await createNewMatch(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a POST bad request", () => {
    test("Then it should invoke next", async () => {
      const next = jest.fn();

      await createNewMatch(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
