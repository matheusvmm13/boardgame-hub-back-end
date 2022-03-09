require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../..");
const connectDataBase = require("../../../database");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /matches endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should reply with a 200 status code", async () => {
      await request(app).get("/matches/").expect(200);
    });
  });
});
