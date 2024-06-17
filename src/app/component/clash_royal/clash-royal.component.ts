import {Component, OnInit} from '@angular/core';
import {GameService} from "../game-list/game.service";
import {ActivatedRoute} from "@angular/router";
import {CRPlayer} from "../../model/clash-royal/cr-player.model";
import {Observable} from "rxjs";
import {HeaderService} from "../../config/headers.service";
import {HttpClient} from "@angular/common/http";
import {CrTabSelectorService} from "./cr-tab-selector/cr-tab-selector.service";
import {CrTabSelectorComponent} from "./cr-tab-selector/cr-tab-selector.component";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'clash-royal',
  templateUrl: './clash-royal.component.html',
  styleUrls: ['./clash-royal.component.css']
})
export class ClashRoyalComponent implements OnInit {

  isThisComponentReady: boolean = false;

  localPlayer: CRPlayer | undefined;
  remotePlayer: CRPlayer | undefined;

  constructor(private gameService: GameService, private route: ActivatedRoute, private http: HttpClient, private crTabSelectorService: CrTabSelectorService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameService.initGame("clash-royal");
      const id = params['id'];
      const tab = params['tab'];
      this.crTabSelectorService.initTab(tab);
      if (this.localPlayer?.id == id) {
        this.isThisComponentReady = true;
      } else {
        this.remotePlayer = undefined;
        this.localPlayer = undefined;
        this.getLocalPlayer(id).subscribe((localPlayer: CRPlayer) => {
          if (localPlayer == null) {
            this.getRemotePlayer(id).subscribe((remotePlayer: CRPlayer) => {
              if (remotePlayer != null) {
                this.remotePlayer = remotePlayer;
              }
              this.isThisComponentReady = true;
            });
          } else {
            this.localPlayer = localPlayer
            this.isThisComponentReady = true
          }
        });
      }
    });
  }

    getLocalPlayer(id: string): Observable<CRPlayer> {
      return this.http.get<CRPlayer>(environment.apiURL + 'clash-royal/player/local/' + id, {headers: HeaderService.getHeaders()});
    }

    getRemotePlayer(id: string): Observable<CRPlayer> {
      return this.http.get<CRPlayer>(environment.apiURL + 'clash-royal/player/remote/' + id, {headers: HeaderService.getHeaders(),});
    }

  protected readonly CrTabSelectorService = CrTabSelectorService;
  protected readonly CrTabSelectorComponent = CrTabSelectorComponent;
}
