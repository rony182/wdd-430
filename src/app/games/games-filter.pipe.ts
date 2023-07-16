import { Pipe, PipeTransform } from '@angular/core';
import { Game } from './game.model';

@Pipe({
    name: 'gamesFilter'
})
export class GamesFilterPipe implements PipeTransform {

    transform(games: Game[], term: string): Game[] {
        let filteredGames: Game[] = [];
        if (term && term.length > 0) {
            filteredGames = games.filter((game: Game) => {
                const teamName = game.homeTeam.teamName.toLowerCase();
                return teamName.includes(term.toLowerCase()) ||
                    game.awayTeam.teamName.toLowerCase().includes(term.toLowerCase());
            });
        } else {
            filteredGames = games;
        }
        return filteredGames;
    }
}

