const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  boardgames: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: "Boardgame",
  },
  matches: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: "Match",
  },
});

const User = model("User", UserSchema, "users-collection");

module.exports = User;
