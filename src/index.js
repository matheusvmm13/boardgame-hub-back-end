require("dotenv").config();
const debug = require("debug")("boardgame:root");
const startServer = require("./server/startServer");

const app = require("./server/index");
const connectDataBase = require("./database");

const port = process.env.PORT || 4000;
const connectionString = process.env.MONGO_STRING;

(async () => {
  try {
    await connectDataBase(connectionString);
    await startServer(app, port);
  } catch {
    debug("The server is broken");
  }
})();
