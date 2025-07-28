import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BungieAuthService} from "../../../service/destiny/bungie-auth.service";

@Component({
  selector: 'bungie-auth',
  templateUrl: './bungie-auth.component.html',
  styleUrls: ['./bungie-auth.component.css']
})
export class BungieAuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, public destinyAuthService: BungieAuthService) {
  }

  async ngOnInit() {
    let playerTokens = this.destinyAuthService.getPlayerTokens();
    if (playerTokens) {
      await this.destinyAuthService.checkTokenValidity();
      await this.destinyAuthService.getBungieProfileToRedirectToDestinyPage();
    } else {
      this.route.params.subscribe(async () => {
        const code = this.route.snapshot.queryParamMap.get('code');
        if (code === null) {
          this.destinyAuthService.disconnectWithError("Failed to get your Bungie player code");
        } else {
          playerTokens = await this.destinyAuthService.getPlayerTokensFromBungieCode(code);
          if (playerTokens) {
            this.destinyAuthService.saveTokens(playerTokens);
            await this.destinyAuthService.getBungieProfileToRedirectToDestinyPage();
          } else {
            this.destinyAuthService.disconnectWithError("Failed to retrieve your Bungie profile");
          }
        }
      });
    }
  }

}
