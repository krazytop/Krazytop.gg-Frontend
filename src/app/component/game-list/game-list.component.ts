import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {BungieAuthService} from "../../service/destiny/bungie-auth.service";
import {RIOTBoardService} from "../../service/riot/riot-board.service";

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {

  selectedGame: string = '';
  regions: string[] = ['EUW'];//TODO enum globale
  selectedRegion: string = this.regions[0];
  riotTag: string = '';
  riotName: string = '';
  playerName: string = '';
  riotBoardId: string = '';
  availableGames: string[] = ['lol', 'tft', 'clash-royal', 'destiny'];

  @ViewChild('riotSummonerForm') riotSummonerForm!: NgForm;
  @ViewChild('riotBoardForm') riotBoardForm!: NgForm;
  @ViewChild('supercellForm') supercellForm!: NgForm;

  constructor(private router: Router, private destinyAuthService: BungieAuthService, private riotBoardService: RIOTBoardService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const selectedGame = params['game'];
      if (this.availableGames.includes(selectedGame)) {
        this.selectedGame = selectedGame;
      } else {
        this.router.navigate(['/']);
      }
      this.selectedGame = params['game'];
    })
  }

  selectGame(game: string) {
    this.selectedGame = game;
  }

  redirectToRiotSummonerPage() {
    if (this.riotTag === '') {
      this.riotSummonerForm.value.riotTag = 'EUW';
    }
    if (this.riotSummonerForm.valid) {
      const region = this.riotSummonerForm.value.region;
      const tag = this.riotSummonerForm.value.riotTag;
      const name = this.riotSummonerForm.value.riotName;
      if (name !== "" && tag !== "") {
        if (this.selectedGame === "lol") {
          this.router.navigate([`/lol/${region}/${tag}/${name}/all-queues/all-roles`]);
        } else {
          this.router.navigate([`/tft/${region}/${tag}/${name}/all-queues/set-13`]);
        }
      }
    }
  }

  redirectToRiotBoard() {
    if (this.riotSummonerForm.valid) {
      if (this.riotBoardId !== "") {
        this.router.navigate([`/${this.selectedGame}/board/${this.riotBoardId}`]);
      }
    }
  }

  async redirectToNewRiotBoard(isLOL: boolean) {
    const newBoardId = await this.riotBoardService.createBoard(isLOL);
    if (newBoardId) {
      this.router.navigate([`/${this.selectedGame}/board/${newBoardId}`]);
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
