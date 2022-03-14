/* eslint-disable no-underscore-dangle */
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../server");
const connectDataBase = require("../../database");
const Match = require("../../database/models/Match");
const {
  deleteMyMatch,
} = require("../../server/controllers/matchController/matchController");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);

  await Match.create({
    gameTitle: "Carcasone",
    id: "6217ceafa37925757491ca2c",
    image: "",
    creator: "6217ceafa37925757487ca2c",
    date: "2022-03-27T16:30:00.000+00:00",
    players: ["6227adb37ab103d1d964c91f", "6227adb37ab103d1d964c91f"],
    maxPlayers: 6,
    location: "Madrid",
  });
});

describe("Given a /my-matches/id endpoint", () => {
  describe("When it receives a DELETE request", () => {
    test("Then it should reply with a 200 status code", async () => {
      const matchToBeDeleted = await Match.findOne();

      await request(app)
        .delete(`/my-matches/delete/${matchToBeDeleted._id}`)
        .expect(200);
    });
  });
  describe("When it receives a bad DELETE request", () => {
    test("Then it should reply with a 404 status code", async () => {
      await request(app).delete(`/my-matches/delete/30824720842`).expect(404);
    });
  });
  describe("When it receives a POST bad request", () => {
    test("Then it should invoke next", async () => {
      const next = jest.fn();

      await deleteMyMatch(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
