const Joi = require("joi");
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
    required: true,
  },
  players: {
    type: [Schema.Types.ObjectId],
    default: undefined,
    ref: "user",
  },
  maxPlayers: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
});

const MatchJoiSchema = Joi.object({
  gameTitle: Joi.string().max(35).required,
  image: Joi.string(),
  maxPlayers: Joi.number().integer().min(2).required,
  date: Joi.date().required,
});

MatchSchema.statics.isValid = (object) => MatchJoiSchema.validate(object);

const Match = model("Match", MatchSchema, "matches-collection");

module.exports = Match;
