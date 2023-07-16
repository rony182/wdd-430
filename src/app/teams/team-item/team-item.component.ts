import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../team.model';

@Component({
  selector: 'wdd430-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css'],
})
export class TeamItemComponent implements OnInit {
  @Input() team: Team;
  @Output() selectedTeamEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
