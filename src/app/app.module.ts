import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DndModule } from 'ng2-dnd';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameItemComponent } from './games/game-item/game-item.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { PlayerItemComponent } from './players/player-item/player-item.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamItemComponent } from './teams/team-item/team-item.component';
import { TeamListComponent } from './teams/team-list/team-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    GameDetailComponent,
    GameEditComponent,
    GameItemComponent,
    GameListComponent,
    PlayersComponent,
    PlayerDetailComponent,
    PlayerEditComponent,
    PlayerItemComponent,
    PlayerListComponent,
    TeamsComponent,
    TeamDetailComponent,
    TeamEditComponent,
    TeamItemComponent,
    TeamListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
