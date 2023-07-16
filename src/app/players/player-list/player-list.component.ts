import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'wdd430-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  term: string;
  subscription: Subscription;
  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.subscription = this.playerService.playerListChangedEvent.subscribe(
      (players: Player[]) => {
        this.players = players;
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
