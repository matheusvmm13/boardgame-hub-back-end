/* eslint-disable no-new */
const debug = require("debug")("boardgame:database");
const chalk = require("chalk");
const { default: mongoose } = require("mongoose");

const connectDataBase = (connectionString) => {
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.bold.yellowBright(`Unable to connect Database`));
        reject(error);
        return;
      }
      debug(chalk.bold.greenBright(`Database connected`));
      resolve();
    });
  });
};

module.exports = connectDataBase;
