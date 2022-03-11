const debug = require("debug")("boardgame:password");
const bcrypt = require("bcrypt");

const password = "123456";

const passwordGenerator = async (word) => {
  const encrypted = await bcrypt.hash(word, 10);
  debug(encrypted);
};

passwordGenerator(password);
