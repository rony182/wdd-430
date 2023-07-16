import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './player.model';

@Pipe({
    name: 'playersFilter'
})
export class PlayersFilterPipe implements PipeTransform {

    transform(players: Player[], term: string): Player[] {
        let filteredPlayers: Player[] = [];
        if (term && term.length > 0) {
            filteredPlayers = players.filter((player: Player) => {
                const playerName = player.playerName.toLowerCase();
                return playerName.includes(term.toLowerCase())  });
        } else {
            filteredPlayers = players;
        }
        return filteredPlayers;
    }
}

