import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Team } from '../../teams/team.model';
import { TeamService } from '../../teams/team.service';

@Component({
  selector: 'wdd430-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css'],
})
export class GameEditComponent implements OnInit {
  originalGame: Game;
  game: Game = null;
  editMode: boolean = false;
  teams: Team[]; // Variable to store the teams

  teamMap: { [id: number]: Team }; // Map to store teams by ID

  homeTeam: number; // Update the type to number
  awayTeam: number; // Update the type to number

  constructor(
    private gameService: GameService,
    private teamService: TeamService, // Inject the Team service
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Subscribe to the teamsListChangedEvent
    this.teamService.teamListChangedEvent.subscribe((teams: Team[]) => {
      this.teams = teams;
      this.teamMap = this.createTeamMap(teams);
    });
  }

  ngOnInit() {
    this.teamService.teamListChangedEvent.subscribe((teams: Team[]) => {
      this.teams = teams;
      this.initializeGame();
    });

    this.teamService.getTeams(); // Move getTeams() call here

    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return; 
      }

      this.gameService.gameListChangedEvent.subscribe((games: Game[]) => {
        this.originalGame = this.gameService.getGame(id);
        if (this.originalGame === undefined || this.originalGame === null) {
          return;
        }
        this.editMode = true;
        this.game = JSON.parse(JSON.stringify(this.originalGame));
        this.initializeGame(); // Call initializeGame() after assigning this.game
      });

      this.gameService.getGames();
    });
  }

  initializeGame() {
    if (this.teams.length > 0 && this.game) {
      this.game.homeTeam = this.teams.find(
        (team) => team.id === this.game.homeTeam?.id
      );
      this.game.awayTeam = this.teams.find(
        (team) => team.id === this.game.awayTeam?.id
      );
      this.game.recap = this.game.recap || ''; // Initialize recap with an empty string if it is null
    } else {
      this.game = {
        id: null,
        gameDate: null,
        time: null,
        homeTeam: null,
        awayTeam: null,
        location: null,
        attendance: null,
        finalScore: null,
        recap: '',
      };
    }
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    // Extract the id values from game.homeTeam and game.awayTeam objects
    let homeTeamId = values.homeTeam;
    let awayTeamId = values.awayTeam;
    // Retrieve the corresponding team objects based on the IDs
    let homeTeam = this.teamMap[homeTeamId];   
    let awayTeam = this.teamMap[awayTeamId];  
    let newGame = new Game(
      null,
      values.gameDate,
      values.time,
      homeTeam,
      awayTeam,
      values.location,
      values.attendance,
      values.finalScore,
      values.recap
    );
  
    if (this.editMode === true) {
      this.gameService.updateGame(this.originalGame, newGame);
    } else {
      this.gameService.addGame(newGame);
    }
  
    this.router.navigate(['/games']);
  }
  

  onCancel() {
    this.router.navigate(['/games']);
  }

  getHomeTeamId() {
    return this.game?.homeTeam?.id;
  }

  setHomeTeamId(id: number) {
    this.game.homeTeam = this.teams.find((team) => team.id === id);
  }

  getAwayTeamId() {
    return this.game?.awayTeam?.id;
  }

  setAwayTeamId(id: number) {
    this.game.awayTeam = this.teams.find((team) => team.id === id);
  }

  createTeamMap(teams: Team[]): { [id: number]: Team } {
    let teamMap: { [id: number]: Team } = {};
    for (let team of teams) {
      teamMap[team.id] = team;
    }
    return teamMap;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
}
