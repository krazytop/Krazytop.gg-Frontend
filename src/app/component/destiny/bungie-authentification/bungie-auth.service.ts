import {Injectable} from '@angular/core';
import {BungieAuthModel} from "../../../model/destiny/bungie-auth.model";
import {HeaderService} from "../../../config/headers.service";
import {DestinyMembershipsModel} from "../../../model/destiny/destiny-memberships.model";
import {Router} from "@angular/router";
import {DestinyCharacterModel} from "../../../model/destiny/destiny-character.model";
import {environment} from "../../../../environments/environment";
import {AlertService} from "../../alert/alert.service";

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
      'Authorization': 'Bearer ' + this.getPlayerTokens()!.access_token,
      'Content-Type': 'application/json',
      'X-API-Key': environment.apiKeyBungie
    };
  }

  getAPIKeyHeader() {
    return {
      'X-API-Key': environment.apiKeyBungie
    };
  }

  async getCurrentUserMembershipsWithCode(playerCode: string) {
    const playerTokens = await this.getPlayerTokensFromBungieCode(playerCode);
    if (playerTokens) {
      this.setExpirationsAndSaveTokens(playerTokens);
      const response = await fetch('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {headers: this.getHeaders()});
      const userMemberships = (await response.json())['Response'];
      const primaryMembershipId = userMemberships['primaryMembershipId'];
      const destinyMemberships: DestinyMembershipsModel[] = userMemberships['destinyMemberships'];
      if (destinyMemberships.length != 0) {
        let mainMembership: DestinyMembershipsModel | undefined;
        if (destinyMemberships.length === 1) {
          mainMembership = destinyMemberships[0];
        } else {
          mainMembership = destinyMemberships.find(membership => membership.membershipId == primaryMembershipId)!;
        }
        const characters: DestinyCharacterModel[] = await this.getCharactersFromMembership(mainMembership.membershipType!, mainMembership.membershipId!)
        if (characters.length != 0) {
          await this.router.navigate([`/destiny/${mainMembership!.membershipType}/${mainMembership!.membershipId}/${characters[0].characterId}/characters`]);
        } else {
          this.disconnectWithError("You need at least one character");
        }
      }
    } else {
      this.disconnectWithError("Failed to retrieve your Bungie profile");
    }
  }

  async getPlayerTokensFromBungieCode(playerCode: string) {
    const response = await fetch(`${environment.apiURL}destiny/get/${playerCode}`, {headers: HeaderService.getBackendHeaders()})
    return await response.json()
  }

  async getCharactersFromMembership(membershipType: number, membershipId: string) {
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`, {headers: this.getHeaders()})
    const json = await response.json();
    const characters: DestinyCharacterModel[] = Object.values(json['Response']['characters']['data']);
    return characters.sort((a, b) => new Date(b.dateLastPlayed).getTime() - new Date(a.dateLastPlayed).getTime());
  }

  async checkTokenValidity() { //TODO mettre dans error si expired
    if (this.isTokenExpired()) {
      if (this.isRefreshTokenExpired()) {
        return false;
      } else {
        const refreshToken = this.getPlayerTokens()!.refresh_token!;
        const response = await fetch(environment.apiURL + 'destiny/update', { headers: HeaderService.getBackendHeaders(), body:  refreshToken, method: 'POST' });
        this.setExpirationsAndSaveTokens(await response.json());
        return true;
      }
    } else {
      return true;
    }
  }

  isTokenExpired(): boolean {
    const tokens = this.getPlayerTokens();
    if (!tokens) {
      return false;
    } else {
      return tokens.expires_timestamp! < Math.floor(new Date().getTime() / 1000) + 60;
    }
  }

  isRefreshTokenExpired() {
    const tokens = this.getPlayerTokens();
    if (!tokens) {
      return false;
    }
    return tokens.refresh_expires_timestamp! < Math.floor(new Date().getTime() / 1000) + 60;
  }

  disconnectWithError(message: string) {
    localStorage.removeItem('bungie_player_tokens');
    this.router.navigate(['/']).then(() => this.alertService.processAlert({
      message: message,
      duration: 3000
    }));
  }

  getPlayerTokens() {
    const storedTokens = window.localStorage.getItem('bungie_player_tokens');
    return storedTokens ? JSON.parse(storedTokens) as BungieAuthModel : null;
  }

  setExpirationsAndSaveTokens(playerTokens: BungieAuthModel){
    const actualTimestamp: number = Math.floor(new Date().getTime() / 1000);
    playerTokens.expires_timestamp = actualTimestamp + playerTokens.expires_in!;
    playerTokens.refresh_expires_timestamp = actualTimestamp + playerTokens.refresh_expires_in!;
    window.localStorage.setItem('bungie_player_tokens', JSON.stringify(playerTokens));
  }

}
