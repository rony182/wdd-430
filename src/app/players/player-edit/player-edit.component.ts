import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { NgForm } from '@angular/forms';
import { Team } from '../../teams/team.model';
import { TeamService } from '../../teams/team.service';

@Component({
  selector: 'wdd430-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
})
export class PlayerEditComponent implements OnInit {
  originalPlayer: Player;
  player: Player = null;
  editMode: boolean = false;
  players: Player[]; // Variable to store the players
  teams: Team[]; // Variable to store the teams

  teamMap: { [id: number]: Team }; // Map to store teams by ID
  selectedClub: number; // Update the type to number

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService // Inject the Team service
  ) {}

  ngOnInit() {
    this.teamService.teamListChangedEvent.subscribe((teams: Team[]) => {
      this.teams = teams;
      this.teamMap = this.createTeamMap(teams);
      this.initializePlayer();
    });
    
    this.teamService.getTeams(); // Move getTeams() call here
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.playerService.playerListChangedEvent.subscribe(
        (players: Player[]) => {
          this.originalPlayer = this.playerService.getPlayer(id);
          if (
            this.originalPlayer === undefined ||
            this.originalPlayer === null
          ) {
            return;
          }
          this.editMode = true;
          this.player = JSON.parse(JSON.stringify(this.originalPlayer));
          this.initializePlayer();
        }
      );
      this.playerService.getPlayers();
    });
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    
    let club = this.teamMap[values.club]; 
    console.log(club);
      
    let newPlayer = new Player(
      null,
      values.playerName,
      values.position,
      values.height,
      values.weight,
      values.birthdate,
      values.nationality,
      values.experienceYears,
      club
    );    
    if (this.editMode) {
      this.playerService.updatePlayer(this.originalPlayer, newPlayer);
    } else {
      this.playerService.addPlayer(newPlayer);
    }
    this.router.navigate(['/players']);
  }

  onCancel() {
    this.router.navigate(['/players']);
  }

  createTeamMap(teams: Team[]): { [id: number]: Team } {
    let map: { [id: number]: Team } = {};
    for (let team of teams) {
      map[team.id] = team;
    }
    return map;
  }

  initializePlayer() {
    if (this.teams.length > 0) {
      this.player.club = this.teams.find((team) => team.id === this.player.club?.id);
      this.selectedClub = this.player.club?.id;
    } else {
      this.player = {
        id: null,
        playerName: null,
        position: null,
        height: null,
        weight: null,
        birthdate: null,
        nationality: null,
        experienceYears: null,
        club: null,
      };
      this.selectedClub = null;
    }
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getSelectedClubId() {
    return this.player?.club?.id;
  }
  
  setSelectedClubId(id: number) {
    this.player.club = this.teams.find((team) => team.id === id);
  }
}
