const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  gameDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    required: true,
  },
  awayTeam: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
  finalScore: {
    type: String,
    required: true,
  },
  recap: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Game", gameSchema);
