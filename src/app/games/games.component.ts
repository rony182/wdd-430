import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game.model';

@Component({
  selector: 'wdd430-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [GameService],
})
export class GamesComponent implements OnInit {
  onGameSelected: Game | null = null;
  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.gameSelectedEvent.subscribe((game: Game) => {
      this.onGameSelected = game;
    });
  }
}
