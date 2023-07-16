import { EventEmitter, Injectable } from '@angular/core';
import { Team } from './team.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teams: Team[] = [];
  teamListChangedEvent = new Subject<Team[]>();
  maxTeamId: number;
  teamSelectedEvent = new EventEmitter<Team>();
  teamChangedEvent = new EventEmitter<Team[]>();
  constructor(private http: HttpClient) {
    this.getTeams();
  }

  getTeams() {
    this.http
      .get<{ message: string; teams: Team[] }>('http://localhost:3000/teams')
      .subscribe((responseData) => {
        this.teams = responseData.teams;
        this.sortAndSend();
      });
  }

  getTeam(id: number): Team {
    for (let team of this.teams) {
      if (team.id == id) {
        return team;
      }
    }
    return null;
  }

  deleteTeam(team: Team) {
    if (!team) {
      return;
    }
    const pos = this.teams.findIndex((d) => d.id === team.id);
    if (pos < 0) {
      return;
    }
    this.http
      .delete('http://localhost:3000/teams/' + team.id)
      .subscribe((response: Response) => {
        this.teams.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addTeam(newTeam: Team) {
    if (!newTeam) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post<{ message: string; team: Team }>(
        'http://localhost:3000/teams',
        newTeam,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.teams.push(responseData.team);
        this.getTeams(); // Fetch the updated list of teams from the server
      });
  }

  updateTeam(originalTeam: Team, newTeam: Team) {
    if (!originalTeam || !newTeam) {
      return;
    }
    const pos = this.teams.findIndex((d) => d.id === originalTeam.id);
    if (pos < 0) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('http://localhost:3000/teams/' + originalTeam.id, newTeam, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.teams[pos] = newTeam;
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.teams.sort((a, b) =>
      a.teamName > b.teamName ? 1 : b.teamName > a.teamName ? -1 : 0
    );
    this.teamListChangedEvent.next(this.teams.slice());
  }
}
