import { Player } from "../players/player.model";

export class Team {
    constructor (
        public id: number,
        public teamName: string,
        public coachName: string,
        public homeCity: string,
        public foundationYear: number,
        public stadiumName: string,
        public capacity: number,
        public division: string,
        public players: Player[],
    ) {}
}