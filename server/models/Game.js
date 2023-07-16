const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  id: { type: Number, required: true },
  gameDate: { type: Date, required: true },
  time: { type: String, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  location: { type: String, required: true },
  attendance: { type: Number, required: true },
  finalScore: { type: String, required: true },
  recap: { type: String, required: false },
});

module.exports = mongoose.model("Game", gameSchema);
