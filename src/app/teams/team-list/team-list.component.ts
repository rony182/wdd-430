import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../team.model';
import { Subscription } from 'rxjs';
import { TeamService } from '../team.service';

@Component({
  selector: 'wdd430-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  term: string;
  subscription: Subscription;
  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(){
    this.subscription = this.teamService.teamListChangedEvent.subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  search(value: string){
    this.term = value;
  }

}
