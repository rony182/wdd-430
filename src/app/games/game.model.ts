import { Team } from '../teams/team.model';

export class Game {
  constructor(
    public id: number,
    public gameDate: Date,
    public time: string,
    public homeTeam: Team,
    public awayTeam: Team,
    public location: string,
    public attendance: number,
    public finalScore: string,
    public recap: string
  ) {}
}
