import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlayersComponent } from './players/players.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { GamesComponent } from './games/games.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  {
    path: 'players',
    component: PlayersComponent,
    children: [
      { path: 'new', component: PlayerEditComponent },
      { path: ':id', component: PlayerDetailComponent },
      { path: ':id/edit', component: PlayerEditComponent },
    ],
  },
  {
    path: 'teams',
    component: TeamsComponent,
    children: [
      { path: 'new', component: TeamEditComponent },
      { path: ':id', component: TeamDetailComponent },
      { path: ':id/edit', component: TeamEditComponent },
    ],
  },
  {
    path: 'games',
    component: GamesComponent,
    children: [
      { path: 'new', component: GameEditComponent },
      { path: ':id', component: GameDetailComponent },
      { path: ':id/edit', component: GameEditComponent },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
