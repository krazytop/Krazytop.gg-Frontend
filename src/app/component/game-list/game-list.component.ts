import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from "@angular/router";
import {BungieAuthService} from "../destiny/bungie-authentification/bungie-auth.service";

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {

  selectedGame: string = '';
  regions: string[] = ['EUW'];
  selectedRegion: string = this.regions[0];
  riotTag: string = '';
  riotName: string = '';
  playerName: string = '';

  @ViewChild('riotForm') riotForm!: NgForm;
  @ViewChild('supercellForm') supercellForm!: NgForm;

  constructor(private router: Router, private destinyAuthService: BungieAuthService) {
  }

  ngOnInit(): void {
  }

  selectGame(game: string) {
    this.selectedGame = game;
  }

  redirectToSummonerPage() {
    if (this.riotTag === '') {
      this.riotForm.value.riotTag ='EUW';
    }
    if (this.riotForm.valid) {
      const region = this.riotForm.value.region;
      const tag = this.riotForm.value.riotTag;
      const name = this.riotForm.value.riotName;
      if (this.selectedGame == "lol") {
        this.router.navigate([`/${this.selectedGame}/${region}/${tag}/${name}/all-queues/all-roles`]);
      } else {
        this.router.navigate([`/${this.selectedGame}/${region}/${tag}/${name}/set-9.5`]);
      }
    }
  }

  redirectToSupercellPage() {
    if (this.supercellForm.valid) {
      const name = this.supercellForm.value.name;
      this.router.navigate([`/${this.selectedGame}/${name}/battles`]);
    }
  }

  loginToBungie() {
    localStorage.removeItem('bungie_player_tokens');
    this.destinyAuthService.login();
  }

  getBungieCurrentLoggedUser() {
    return this.destinyAuthService.getPlayerTokens()?.uniqueName;
  }

  async redirectToDestinyPage() {
    if(await this.destinyAuthService.checkTokenValidity()) { //TODO check aussi avant d afficher comme quoi il y a une user connecté
      await this.destinyAuthService.redirectToDestinyPage(this.destinyAuthService.getPlayerTokens()!)
    }
  }

}
