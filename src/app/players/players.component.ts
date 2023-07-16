import { Component, OnInit } from '@angular/core';
import { Player } from './player.model';
import { PlayerService } from './player.service';

@Component({
  selector: 'wdd430-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  onPlayerSelected: Player | null = null;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.getPlayers(); // Call the getPlayers() method to fetch the player data
    this.playerService.playerSelectedEvent.subscribe((player: Player) => {
      this.onPlayerSelected = player;
    });
  }

  getPlayers() {
    this.playerService.getPlayers(); // Call the getPlayers() method of the PlayerService
  }
}
