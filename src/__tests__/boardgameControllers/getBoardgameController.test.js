/* eslint-disable no-underscore-dangle */
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDataBase = require("../../database");
const User = require("../../database/models/User");
const app = require("../../server");
const {
  getAllBoardgames,
  getMyBoardgames,
} = require("../../server/controllers/boardgameController/getBoardgameController");

let mongoServer;
let userTest;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);

  userTest = await User.create({
    name: "Luis",
    username: "luisito13",
    password: "$2b$10$69ISBNYPu8yiIaez3HKrUOfI5Xj4/Qi5myFNyFO2AfHnA6cSUz.GK",
    picture: "",
    boardgames: [],
    matches: [],
  });
});

describe("Given a /all-boardgames endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should reply with a 200 status code", async () => {
      await request(app).get("/all-boardgames/").expect(200);
    });
  });
  describe("When it receives a bad GET request", () => {
    test("Then it should reply with a 404 status code", async () => {
      await request(app).get("/all-boardgame/").expect(404);
    });
  });
  describe("When it receives a GET request with an ID", () => {
    test("Then it should reply with a 200 status code", async () => {
      await request(app).get(`/my-boardgames/${userTest.id}`).expect(200);
    });
    test("Then it should invoke next", async () => {
      const next = jest.fn();

      await getAllBoardgames(null, null, next);
      await getMyBoardgames(null, null, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
