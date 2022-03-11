const { string, number } = require("joi");
const { model, Schema } = require("mongoose");

const BoardgameSchema = new Schema({
  name: {
    type: string,
  },
  image: {
    type: string,
  },
  maxPlayers: {
    type: number,
  },
  maxPlayTime: {
    type: number,
  },
});

const Boardgame = model("Boardgame", BoardgameSchema, "boardgame-collection");

module.exports = Boardgame;
