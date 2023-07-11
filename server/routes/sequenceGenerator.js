var Sequence = require("../models/Sequence");

var maxGameId;
var maxPlayerId;
var maxTeamId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .then(function (sequence) {
      sequenceId = sequence._id;
      maxGameId = sequence.maxGameId;
      maxPlayerId = sequence.maxPlayerId;
      maxTeamId = sequence.maxTeamId;
    })
    .catch(function (err) {
      console.error("An error occurred:", err);
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "games":
      maxGameId++;
      updateObject = { maxGameId: maxGameId };
      nextId = maxGameId;
      break;
    case "players":
      maxPlayerId++;
      updateObject = { maxPlayerId: maxPlayerId };
      nextId = maxPlayerId;
      break;
    case "teams":
      maxTeamId++;
      updateObject = { maxTeamId: maxTeamId };
      nextId = maxTeamId;
      break;
    default:
      return -1;
  }
  console.log("nextId: ", nextId);

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .then(function () {
      console.log("Sequence updated successfully");
    })
    .catch(function (err) {
      console.log("nextId error:", err);
    });
  console.log("nextId: ", nextId);
  return nextId;
};

module.exports = new SequenceGenerator();
