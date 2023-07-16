const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  coachName: {
    type: String,
    required: true,
  },
  homeCity: {
    type: String,
    required: true,
  },
  foundationYear: {
    type: Number,
    required: true,
  },
  stadiumName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});
module.exports = mongoose.model("Team", teamSchema);
