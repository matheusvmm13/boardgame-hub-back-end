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
const User = require("../../database/models/User");
const Match = require("../../database/models/Match");

let mongoServer;
let userToken;
let testUser;
let testMatch;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);

  await User.deleteMany({});
  await Match.deleteMany({});

  testUser = await User.create({
    name: "James",
    username: "jmayerhey",
    password: "$2b$10$DZkKzznjB.9YFZZsNHGI5.mSoL1MZ0fXngzjbL497rMl1PGnS3Xh.",
    boardgames: [],
    matches: [],
  });

  testMatch = await Match.create({
    gameTitle: "Ticket to Ride: Europe",
    image: "",
    creator: { _id: "622a34ef55c15b820edc9a3e" },
    date: "2022-03-14T00:00:00.000+00:00",
    players: [],
    maxPlayers: 6,
    location: "Pau claris, 32, Barcelona",
  });

  const { body } = await request(app).post("/users/login").send({
    username: "jmayerhey",
    password: "123456789",
  });

  userToken = body.token;
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
  describe("When it receives a GET request with an ID", () => {
    test("Then it should reply with a 200 status code", async () => {
      const userId = "6233075705443313063349fd";
      await request(app).get(`/matches/${userId}`).expect(200);
    });
  });
  describe("When it receives a Bad GET request with an ID", () => {
    test("Then it should reply with a 404 status code", async () => {
      const userId = "6233075705443313063349fd";
      await request(app).get(`/matchers/${userId}`).expect(404);
    });
  });
  describe("When it receives a GET my match request with an ID", () => {
    test("Then it should reply with a 200 status code", async () => {
      User.findById(testUser.id);

      await request(app)
        .get(`/my-matches/${testUser.id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);
    });
  });
  describe("When it receives a bad GET my match request with an ID", () => {
    test("Then it should reply with a 404 status code", async () => {
      const foundUser = User.findById();

      await request(app)
        .get(`/my-matches/${foundUser.id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });
  });
  describe("When it receives a PUT request with an ID", () => {
    test("Then it should reply with a 200 status code", async () => {
      const newMatch = {
        gameTitle: "Ticket to Ride: Europe",
        image: "",
        creator: { _id: "622a34ef55c15b820edc9a3e" },
        date: "2022-03-16T00:00:00.000+00:00",
        players: [],
        maxPlayers: 3,
        location: "Pau claris, 32, Barcelona",
      };

      User.findById(testUser.id);
      Match.findById(testMatch.id);

      await request(app)
        .put(`/my-matches/edit/${testUser.id}`)
        .send(newMatch)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);
    });
  });
  describe("When it receives a bad PUT request with an ID", () => {
    test("Then it should reply with a 404 status code", async () => {
      const newMatch = {
        gameTitle: "Ticket to Ride: Europe",
        image: "",
        creator: { _id: "622a34ef55c15b820edc9a3e" },
        date: "2022-03-16T00:00:00.000+00:00",
        players: [],
        maxPlayers: 3,
        location: "Pau claris, 32, Barcelona",
      };

      User.findById(testUser.id);
      Match.findById(testMatch.id);

      await request(app)
        .put(`/my-matchers/edit/${testUser.id}`)
        .send(newMatch)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
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
