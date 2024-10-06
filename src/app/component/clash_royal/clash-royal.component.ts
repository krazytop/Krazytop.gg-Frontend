import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CRPlayer} from "../../model/clash-royal/cr-player.model";
import {HTTPRequestService} from "../../config/http-request.service";
import {CrTabSelectorComponent} from "./cr-tab-selector/cr-tab-selector.component";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'clash-royal',
  templateUrl: './clash-royal.component.html',
  styleUrls: ['./clash-royal.component.css']
})
export class ClashRoyalComponent implements OnInit {

  isThisComponentReady: boolean = false;
  component!: string;

  localPlayer: CRPlayer | undefined;
  remotePlayer: CRPlayer | undefined;

  constructor(private route: ActivatedRoute, private httpRequestService: HTTPRequestService) {
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const id = params['id'];
      this.component = params['component'];
      if (this.localPlayer?.id === id) {
        this.isThisComponentReady = true;
      } else {
        this.localPlayer = await this.getLocalPlayer(id);
        if (this.localPlayer == null) {
          this.remotePlayer = await this.getRemotePlayer(id);
        }
        this.isThisComponentReady = true;
      }
    });
  }

    async getLocalPlayer(id: string) {
      const response = await fetch(environment.apiURL + 'clash-royal/player/local/' + id, {headers: HTTPRequestService.getBackendHeaders()});
      return await this.httpRequestService.hasResponse(response) ? await response.json() as CRPlayer : undefined;
  }

  async getRemotePlayer(id: string) {
      const response = await fetch(environment.apiURL + 'clash-royal/player/remote/' + id, {headers: HTTPRequestService.getBackendHeaders()});
      return await this.httpRequestService.hasResponse(response) ? await response.json() as CRPlayer : undefined;
    }

  protected readonly CrTabSelectorComponent = CrTabSelectorComponent;
}
