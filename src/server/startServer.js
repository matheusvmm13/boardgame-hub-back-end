const debug = require("debug")("boardgame:server");

const startServer = async (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`The server it's up and listening on http://localhost:${port}`);
      resolve();
    });

    server.on("error", (error) => {
      debug("We couldn't initialize the server");
      debug(`Error${error.message}`);
      reject();
    });
  });

module.exports = startServer;
