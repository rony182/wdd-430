import { Pipe, PipeTransform } from '@angular/core';
import { Team } from './team.model';

@Pipe({
    name: 'teamsFilter'
})
export class TeamsFilterPipe implements PipeTransform {

    transform(teams: Team[], term: string): Team[] {
        let filteredteams: Team[] = [];
        if (term && term.length > 0) {
            filteredteams = teams.filter((team: Team) => {
                const teamName = team.teamName.toLowerCase();
                return teamName.includes(term.toLowerCase());
            });
        } else {
            filteredteams = teams;
        }
        return filteredteams;
    }
}

