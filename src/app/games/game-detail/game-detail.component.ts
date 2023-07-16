import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wdd430-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  game: Game;
  id: number;
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.game = this.gameService.getGame(this.id);
    });
  }

  onDelete() {
    this.gameService.deleteGame(this.game);
    this.router.navigate(['/games']), { relativeTo: this.route };
  }
}
