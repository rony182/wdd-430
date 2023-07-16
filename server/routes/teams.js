const sequenceGenerator = require("./sequenceGenerator");
const Team = require("../models/Team");

var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Team.find()
    .populate("players")
    .then((teams) => {
      res.status(200).json({
        message: "Teams fetched successfully!",
        teams: teams,
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
  const maxTeamId = sequenceGenerator.nextId("teams");
  const team = new Team({
    id: maxTeamId,
    teamName: req.body.teamName,
    coachName: req.body.coachName,
    homeCity: req.body.homeCity,
    foundationYear: req.body.foundationYear,
    stadiumName: req.body.stadiumName,
    capacity: req.body.capacity,
    division: req.body.division,
    players: req.body.players,
  });
  team
    .save()
    .then((createdTeam) => {
      res.status(201).json({
        message: "Team added successfully",
        message: createdTeam,
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
  Team.findOne({ id: req.params.id }).then((team) => {
    team.teamName = req.body.teamName;
    team.coachName = req.body.coachName;
    team.homeCity = req.body.homeCity;
    team.foundationYear = req.body.foundationYear;
    team.stadiumName = req.body.stadiumName;
    team.capacity = req.body.capacity;
    team.division = req.body.division;
    team.players = req.body.players;

    Team.updateOne({ id: req.params.id }, team)
      .then((result) => {
        res.status(204).json({
          message: "Team updated successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error occurred",
          error: error,
        });
      });
  });
});

router.delete("/:id", (req, res, next) => {
  Team.findOne({ id: req.params.id })
    .then((team) => {
      Team.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Team deleted successfully",
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
        message: "Team not found.",
        error: { message: "Team not found" },
      });
    });
});

module.exports = router;
