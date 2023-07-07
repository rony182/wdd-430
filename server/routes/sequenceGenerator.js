var Sequence = require("../models/Sequence");

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .then(function (sequence) {
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    })
    .catch(function (err) {
      console.error("An error occurred:", err);
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
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
