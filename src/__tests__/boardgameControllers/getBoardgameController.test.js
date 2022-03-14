/* eslint-disable no-underscore-dangle */
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDataBase = require("../../database");
const User = require("../../database/models/User");
const app = require("../../server");
const {
  getAllBoardgames,
} = require("../../server/controllers/boardgameController/getBoardgameController");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);

  await User.create({
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
      await request(app).get("/all-baordgame/").expect(404);
    });
    test("Then it should invoke next", async () => {
      const next = jest.fn();

      await getAllBoardgames(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

/* describe("Given a all-boardgames/add/ endpoint", () => {
  describe("When it receives a PATCH request", () => {
    test.skip("Then it should reply with a 200 status code", async () => {
      const userToBeUpdated = await User.findOne();
      console.log(userToBeUpdated);

      const updatedUser = {
        name: "Luis",
        username: "luisito13",
        password:
          "$2b$10$69ISBNYPu8yiIaez3HKrUOfI5Xj4/Qi5myFNyFO2AfHnA6cSUz.GK",
        picture: "",
        boardgames: ["622dcdce87c35208164d62a8"],
        matches: [],
      };

      await request(app)
        .patch(
          `/all-boardgames/add/622dcdce87c35208164d62a8/${userToBeUpdated._id}`
        )
        .expect(200);

      expect(updatedUser.boardgames).toHaveLength(1);
    });
  });
}); */

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
