const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

module.exports = mongoose.model("Player", playerSchema);
