import {Injectable} from '@angular/core';
import {BungieAuthModel} from "../../model/destiny/bungie-auth.model";
import {HTTPRequestService} from "../../config/http-request.service";
import {DestinyMembershipsModel} from "../../model/destiny/destiny-memberships.model";
import {Router} from "@angular/router";
import {DestinyCharacterModel} from "../../model/destiny/destiny-character.model";
import {environment} from "../../../environments/environment";
import {AlertService} from "../../component/alert/alert.service";
import {BungieLastLoggedPlayerModel} from "../../model/destiny/bungie-last-logged-player.model";

@Injectable({
  providedIn: 'root'
})
export class BungieAuthService {

  constructor(private router: Router, private alertService: AlertService) {}

  login() {
    window.location.replace("https://www.bungie.net/en/OAuth/Authorize?client_id=" + environment.apiClientIdBungie + "&response_type=code");
  }

  getHeaders() {
    return {
      'Authorization': 'Bearer ' + this.getPlayerTokens()!.accessToken,
      'Content-Type': 'application/json',
      'X-API-Key': environment.apiKeyBungie
    };
  }

  getAPIKeyHeader() {
    return {
      'X-API-Key': environment.apiKeyBungie
    };
  }

  async getBungieProfileToRedirectToDestinyPage() {
    const response = await fetch('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {headers: this.getHeaders()});
    const userMemberships = (await response.json())['Response'];
    const primaryMembershipId = userMemberships['primaryMembershipId'];
    const destinyMemberships: DestinyMembershipsModel[] = userMemberships['destinyMemberships'];
    if (destinyMemberships.length !== 0) {
      let mainMembership: DestinyMembershipsModel = destinyMemberships.find(membership => membership.membershipId === primaryMembershipId) ?? destinyMemberships[0];
      const characters: DestinyCharacterModel[] = await this.getCharactersFromMembership(mainMembership.membershipType!, mainMembership.membershipId!)
      if (characters.length !== 0) {
        this.saveLastLoggedPlayer(userMemberships['bungieNetUser']['uniqueName'], mainMembership!.membershipId, characters[0].characterId, mainMembership!.membershipType)
        await this.router.navigate([`/destiny/${mainMembership!.membershipType}/${mainMembership!.membershipId}/${characters[0].characterId}/characters`]);
      } else {
        this.disconnectWithError("You need at least one character");
      }
    }
  }

  async getPlayerTokensFromBungieCode(playerCode: string) {
    const response = await fetch(`${environment.apiURL}bungie/auth/${playerCode}`, {headers: HTTPRequestService.getBackendHeaders()})
    return response.json();
  }

  async getCharactersFromMembership(membershipType: number, membershipId: string) {
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`, {headers: this.getHeaders()})
    const json = await response.json();
    const characters: DestinyCharacterModel[] = Object.values(json['Response']['characters']['data']);
    return characters.sort((a, b) => new Date(b.dateLastPlayed).getTime() - new Date(a.dateLastPlayed).getTime());
  }

  async checkTokenValidity() {
    if (this.isTokenExpired()) {
      if (this.isRefreshTokenExpired()) {
        return false;
      } else {
        const response = await fetch(`${environment.apiURL}bungie/auth`, { headers: HTTPRequestService.getBackendHeaders(), body:  JSON.stringify(this.getPlayerTokens()), method: 'POST' });
        this.saveTokens(await response.json());
        return true;
      }
    } else {
      return true;
    }
  }

  isTokenExpired(): boolean {
    const tokens = this.getPlayerTokens();
    if (!tokens) {
      return true;
    } else {
      return new Date(tokens.accessTokenExpiresAt) < new Date(Date.now() + 60 * 1000);
    }
  }

  isRefreshTokenExpired() {
    const tokens = this.getPlayerTokens();
    if (!tokens) {
      return true;
    }
    return new Date(tokens.refreshTokenExpiresAt) < new Date(Date.now() + 60 * 1000);
  }

  disconnectWithError(message: string) {
    localStorage.removeItem('bungie_player_tokens');
    this.router.navigate(['/destiny']).then(() => this.alertService.processAlert({
      message: message,
      duration: 3000
    }));
  }

  getPlayerTokens() {
    const storedTokens = window.localStorage.getItem('bungie_player_tokens');
    return storedTokens ? JSON.parse(storedTokens) as BungieAuthModel : null;
  }

  saveTokens(playerTokens: BungieAuthModel){
    window.localStorage.setItem('bungie_player_tokens', JSON.stringify(playerTokens));
  }

  saveLastLoggedPlayer(playerName: string, membershipId: string, characterId: string, membershipType: number) {
    const player = new BungieLastLoggedPlayerModel(playerName, membershipId, characterId, membershipType);
    localStorage.setItem('lastLoggedPlayer', JSON.stringify(player));
  }

  saveLastLoggedPlayerIcon(icon: string) {
    const player = this.getLastLoggedPlayer();
    player.icon = icon;
    localStorage.setItem('lastLoggedPlayer', JSON.stringify(player));
  }

  getLastLoggedPlayer() {
    const storedTokens = window.localStorage.getItem('lastLoggedPlayer');
    return JSON.parse(storedTokens!) as BungieLastLoggedPlayerModel;
  }

  redirectToDestinyPage() {
    const player = this.getLastLoggedPlayer();
    this.router.navigate([`/destiny/${player.membershipType}/${player.membershipId}/${player.characterId}/characters`]);
  }

}
