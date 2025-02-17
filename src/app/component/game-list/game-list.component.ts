import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from "@angular/router";
import {BungieAuthService} from "../../service/destiny/bungie-auth.service";
import {AlertService} from "../alert/alert.service";

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent {

  selectedGame: string = '';
  regions: string[] = ['EUW'];
  selectedRegion: string = this.regions[0];
  riotTag: string = '';
  riotName: string = '';
  playerName: string = '';

  @ViewChild('riotForm') riotForm!: NgForm;
  @ViewChild('supercellForm') supercellForm!: NgForm;

  constructor(private router: Router, private destinyAuthService: BungieAuthService, private alertService: AlertService) {
  }

  selectGame(game: string) {
    this.selectedGame = game;
  }

  redirectToSummonerPage() {
    if (this.riotTag === '') {
      this.riotForm.value.riotTag = 'EUW';
    }
    if (this.riotForm.valid) {
      const region = this.riotForm.value.region;
      const tag = this.riotForm.value.riotTag;
      const name = this.riotForm.value.riotName;
      if (name !== "" && tag !== "") {
        if (this.selectedGame === "lol") {
          this.router.navigate([`/lol/${region}/${tag}/${name}/all-queues/all-roles`]);
        } else {
          this.router.navigate([`/tft/${region}/${tag}/${name}/all-queues/set-13`]);
        }
      }
    }
  }

  redirectToSupercellPage() {
    if (this.supercellForm.valid) {
      const name = this.supercellForm.value.name;
      this.router.navigate([`/clash-royal/${name}/battles`]);
    }
  }

  loginToBungie() {
    localStorage.removeItem('bungie_player_tokens');
    this.destinyAuthService.login();
  }

  isBungieUserCurrentlyLogged() {
    return !this.destinyAuthService.isTokenExpired() || !this.destinyAuthService.isRefreshTokenExpired();
  }

  getBungieCurrentLoggedUser() {
    return this.destinyAuthService.getLastLoggedPlayer().playerName;
  }

  async redirectToDestinyPage() {
    this.destinyAuthService.redirectToDestinyPage();
  }

}
