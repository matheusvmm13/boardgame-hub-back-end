/* eslint-disable no-underscore-dangle */
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../server");
const connectDataBase = require("../database");

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
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
