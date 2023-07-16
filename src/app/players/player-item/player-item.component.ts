import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../player.model';

@Component({
  selector: 'wdd430-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {
  @Input() player: Player;
  @Output() selectedPlayerEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
