import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { TeamService } from './team.service';

@Component({
  selector: 'wdd430-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  onTeamSelected: Team | null = null;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.getTeams();
    this.teamService.teamSelectedEvent.subscribe((team: Team) => {
      this.onTeamSelected = team;
    });
  }

  getTeams() {
    this.teamService.getTeams();
  }
}
