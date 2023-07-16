import { EventEmitter, Injectable } from '@angular/core';
import { Player } from './player.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  playerListChangedEvent = new Subject<Player[]>();
  players: Player[] = [];
  maxPlayerId: number;
  playerSelectedEvent = new EventEmitter<Player>();
  playerChangedEvent = new EventEmitter<Player[]>();

  constructor(private http: HttpClient) {
    this.getPlayers();
  }

  getPlayers() {
    this.http
      .get<{ message: string; players: Player[] }>(
        'http://localhost:3000/players'
      )
      .subscribe((responseData) => {
        this.players = responseData.players;
        this.sortAndSend();
      });
  }

  getPlayer(id: number): Player {
    for (let player of this.players) {
      if (player.id == id) {
        return player;
      }
    }
    return null;
  }

  deletePlayer(player: Player) {
    if (!player) {
      return;
    }

    const pos = this.players.findIndex((d) => d.id === player.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/players/' + player.id)
      .subscribe((response: Response) => {
        this.players.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addPlayer(newPlayer: Player) {
    if (!newPlayer) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{ message: string; player: Player }>(
        'http://localhost:3000/players',
        newPlayer,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.players.push(responseData.player);
        this.sortAndSend();
        this.getPlayers();
      });
  }

  updatePlayer(originalPlayer: Player, newPlayer: Player) {
    if (!originalPlayer || !newPlayer) {
      return;
    }

    const pos = this.players.findIndex((d) => d.id === originalPlayer.id);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('http://localhost:3000/players/' + originalPlayer.id, newPlayer, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.players[pos] = newPlayer;
        this.sortAndSend();
        this.getPlayers();
      });
  }

  sortAndSend() {
    this.players.sort((a, b) =>
      a.playerName > b.playerName ? 1 : b.playerName > a.playerName ? 1 : -1
    );
    this.playerListChangedEvent.next(this.players.slice());
  }
}
