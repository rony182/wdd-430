import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from './game.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameListChangedEvent = new Subject<Game[]>();
  games: Game[] = [];
  maxGameId: number;
  gameSelectedEvent = new EventEmitter<Game>();
  gameChangedEvent = new EventEmitter<Game[]>();

  constructor(private http: HttpClient) {
    this.getGames();
  }

  getGames() {
    this.http
      .get<{ message: string; games: Game[] }>('http://localhost:3000/games')
      .subscribe((responseData) => {
        this.games = responseData.games;
        this.sortAndSend();
      });
  }

  getGame(id: number): Game {
    for (let game of this.games) {
      if (game.id == id) {
        return game;
      }
    }
    return null;
  }

  deleteGame(game: Game) {
    if (!game) {
      return;
    }

    const pos = this.games.findIndex((d) => d.id === game.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/games/' + game.id)
      .subscribe((response: Response) => {
        this.games.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addGame(newGame: Game) {
    if (!newGame) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; game: Game }>(
        'http://localhost:3000/games',
        newGame,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.games.push(responseData.game);
        this.sortAndSend();
      });
  }

  updateGame(originalGame: Game, newGame: Game) {
    if (!originalGame || !newGame) {
      return;
    }

    const pos = this.games.findIndex((d) => d.id === originalGame.id);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/games/' + originalGame.id, newGame, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.games[pos] = newGame;
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.games.sort((a, b) => (a.gameDate > b.gameDate ? 1 : -1));
    this.gameListChangedEvent.next(this.games.slice());
  }
}
