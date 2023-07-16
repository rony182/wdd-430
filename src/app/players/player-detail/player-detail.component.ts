import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wdd430-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
})
export class PlayerDetailComponent implements OnInit {
  player: Player;
  id: number;
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      
      this.player = this.playerService.getPlayer(this.id);
      console.log(this.player);
    });
  }

  onDelete() {
    this.playerService.deletePlayer(this.player);
    this.router.navigate(['/players']), { relativeTo: this.route };
  }
}
