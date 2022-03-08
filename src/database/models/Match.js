const { model, Schema } = require("mongoose");

const MatchSchema = new Schema({
  gameTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  creator: {
    type: String,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  players: {
    type: [Schema.Types.ObjectId],
    default: undefined,
    ref: "user",
  },
  maxPlayers: {
    type: Number,
  },
  location: {
    type: String,
  },
});

const Match = model("Match", MatchSchema, "matches-collection");

module.exports = Match;
