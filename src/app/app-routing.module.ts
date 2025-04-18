import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamfightTacticsComponent} from "./component/tft/teamfight-tactics.component";
import {LeagueOfLegendsComponent} from "./component/lol/league-of-legends.component";
import {GameListComponent} from "./component/game-list/game-list.component";
import {ClashRoyalComponent} from "./component/clash_royal/clash-royal.component";
import {BungieAuthComponent} from "./component/destiny/bungie-authentification/bungie-auth.component";
import {DestinyComponent} from "./component/destiny/destiny.component";

const routes: Routes = [
  {path: 'tft/:region/:tag/:name/:queue/:set', component: TeamfightTacticsComponent},
  {path: 'lol/:region/:tag/:name/:queue/:role', component: LeagueOfLegendsComponent},
  {path: 'clash-royal/:id/:component', component: ClashRoyalComponent},
  {path: 'bungie', component: BungieAuthComponent},
  {path: 'destiny/:platform/:membership/:character/:component', component: DestinyComponent},
  {path: '', component: GameListComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
