const sequenceGenerator = require("./sequenceGenerator");
const Player = require("../models/Player");

var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Player.find()
    .populate("club")
    .then((players) => {
      res.status(200).json({
        message: "Players fetched successfully!",
        players: players,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxPlayerId = sequenceGenerator.nextId("players");

  const player = new Player({
    id: maxPlayerId,
    playerName: req.body.playerName,
    position: req.body.position,
    height: req.body.height,
    weight: req.body.weight,
    birthdate: req.body.birthdate,
    nationality: req.body.nationality,
    experienceYears: req.body.experienceYears,
    club: req.body.club,    
  });

  player
    .save()
    .then((createdPlayer) => {
      res.status(201).json({
        message: "Player added successfully",
        player: createdPlayer,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Player.findOne({ id: req.params.id })
    .then((player) => {
      player.playerName = req.body.playerName;
      player.position = req.body.position;
      player.height = req.body.height;
      player.weight = req.body.weight;
      player.birthdate = req.body.birthdate;
      nationality = req.body.nationality;
      experienceYears = req.body.experienceYears;
      club = req.body.club;
      
      Player.updateOne({ id: req.params.id }, player)
        .then((result) => {
          res.status(204).json({
            message: "Player updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Player not found.",
        error: { player: "Player not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Player.findOne({ id: req.params.id })
    .then((player) => {
      Player.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Player deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Player not found.",
        error: { player: "Player not found" },
      });
    });
});

router.get("/:id", (req, res, next) => {
  Player.findOne({ id: req.params.id })
    .populate("club")
    .then((player) => {
      res.status(200).json({
        message: "Player fetched successfully!",
        player: player,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Player not found.",
        error: { player: "Player not found" },
      });
    });
});

module.exports = router;
