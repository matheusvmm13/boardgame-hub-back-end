/* eslint-disable no-underscore-dangle */
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../server");
const connectDataBase = require("../../database");
const {
  getAllMatches,
} = require("../../server/controllers/matchController/matchController");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);
});

describe("Given a /matches endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should reply with a 200 status code", async () => {
      await request(app).get("/matches/").expect(200);
    });
  });
  describe("When it receives a bad GET request", () => {
    test("Then it should reply with a 404 status code", async () => {
      await request(app).get("/matchers/").expect(404);
    });
  });
  describe("When it receives a POST bad request", () => {
    test("Then it should invoke next", async () => {
      const next = jest.fn();

      await getAllMatches(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
