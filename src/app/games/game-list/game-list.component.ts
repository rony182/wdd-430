import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'wdd430-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  term: string;
  subscription: Subscription;
  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.subscription = this.gameService.gameListChangedEvent.subscribe(
      (games: Game[]) => {
        this.games = games;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
