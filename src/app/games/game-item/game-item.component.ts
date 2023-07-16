import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../game.model';

@Component({
  selector: 'wdd430-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css'],
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;
  @Output() selectedGameEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
