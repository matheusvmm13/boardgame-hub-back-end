require("dotenv").config();
const debug = require("debug")("boardgame:root");
const startServer = require("./server/startServer");

const app = require("./server/index");

const port = process.env.PORT || 4000;

(async () => {
  try {
    await startServer(app, port);
  } catch {
    debug("The server is broken");
  }
})();
