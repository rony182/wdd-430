import { Team } from "../teams/team.model";

export class Player {
    constructor(
        public id: number,
        public playerName: string,
        public position: string,
        public height: number,
        public weight: number,
        public birthDate: Date,
        public nationality: string,
        public experienceYears: number,
        public club: Team,
    ) {}
}