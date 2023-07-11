const sequenceGenerator = require("./sequenceGenerator");
const Game = require("../models/Game");

var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Game.find()
    .populate("homeTeam")
    .populate("awayTeam")
    .then((games) => {
      res.status(200).json({
        message: "Games fetched successfully!",
        games: games,
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
  const maxGameId = sequenceGenerator.nextId("games");

  const game = new Game({
    id: maxGameId,
    gameDate: req.body.gameDate,
    time: req.body.time,
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    location: req.body.location,
    attendance: req.body.attendance,
    finalScore: req.body.finalScore,
    recap: req.body.recap,
  });

  game
    .save()
    .then((createdGame) => {
      res.status(201).json({
        message: "Game added successfully",
        game: createdGame,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Game.findOne({ id: req.params.id })
    .populate("homeTeam")
    .populate("awayTeam")
    .then((game) => {
      res.status(200).json({
        message: "Game fetched successfully!",
        game: game,
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
  Game.findOne({ id: req.params.id }).then((game) => {
    game.gameDate = req.body.gameDate;
    game.time = req.body.time;
    game.homeTeam = req.body.homeTeam;
    game.awayTeam = req.body.awayTeam;
    game.location = req.body.location;
    game.attendance = req.body.attendance;
    game.finalScore = req.body.finalScore;
    game.recap = req.body.recap;

    Game.updateOne({ id: req.params.id }, game)
      .then((result) => {
        res.status(204).json({
          message: "Game updated successfully",
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
  console.log(req.params.id);
  
        Game.findOne({ id: req.params.id })
          .then((game) => {
            Game.deleteOne({ id: req.params.id })
              .then((result) => {
                res.status(204).json({
                  message: "Game deleted successfully",
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
              message: "Game not found asdasd",
              error: { game: "Game not found" },
            });
          });
      }
    
);

module.exports = router;
