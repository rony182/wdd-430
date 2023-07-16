import { Component, OnInit } from '@angular/core';
import { Team } from '../team.model';
import { TeamService } from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wdd430-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css'],
})
export class TeamEditComponent implements OnInit {
  originalTeam: Team;
  team: Team = null;
  editMode: boolean = false;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.teamService.teamListChangedEvent.subscribe((teams: Team[]) => {
        this.originalTeam = this.teamService.getTeam(id);
        if (this.originalTeam === undefined || this.originalTeam === null) {
          return;
        }
        this.editMode = true;
        this.team = JSON.parse(JSON.stringify(this.originalTeam));
      });
      this.teamService.getTeams();
    });
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newTeam = new Team(
      this.originalTeam?.id ? this.originalTeam.id : null,
      values.teamName,
      values.coachName,
      values.homeCity,
      values.foundationYear,
      values.stadiumName,
      values.capacity,
      values.division
    );
    if (this.editMode) {
      this.teamService.updateTeam(this.originalTeam, newTeam);
    } else {
      this.teamService.addTeam(newTeam);
    }
    this.router.navigate(['/teams']);
  }

  onCancel() {
    this.router.navigate(['/teams']);
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
