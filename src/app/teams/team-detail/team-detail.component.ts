import { Component, OnInit } from '@angular/core';
import { Team } from '../team.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../team.service';

@Component({
  selector: 'wdd430-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  id: number;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.team = this.teamService.getTeam(this.id);
    });
  }

  onDelete() {
    this.teamService.deleteTeam(this.team);
    this.router.navigate(['/teams']), { relativeTo: this.route };
  }
}
