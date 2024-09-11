import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BungieAuthModel} from "../../../model/destiny/bungie-auth.model";
import {HeaderService} from "../../../config/headers.service";
import {DestinyUserMembershipsModel} from "../../../model/destiny/destiny-user-memberships.model";
import {DestinyMembershipsModel} from "../../../model/destiny/destiny-memberships.model";
import {Router} from "@angular/router";
import {DestinyCharacterModel} from "../../../model/destiny/destiny-character.model";
import {catchError, concatMap, map, Observable, of, Subject, tap, throwError} from "rxjs";
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
      const userMemberships: DestinyUserMembershipsModel = (await response.json())['Response']; //TODO voir si on ne peut pas prendre le primary direct quoi
      let mainMembership: DestinyMembershipsModel | undefined = undefined;
      if (userMemberships.destinyMemberships.length === 1) {//TODO voir avec le compte de joan qi le if / else est utile ou si juste le else suffit
        mainMembership = userMemberships.destinyMemberships[0];
      } else {
        for (let membership of userMemberships.destinyMemberships) {
          if (membership.membershipId === userMemberships.primaryMembershipId) {
            mainMembership = membership;
          }
        }
      }
      if (mainMembership) {
        const characters: DestinyCharacterModel[] = await this.getCharactersFromMembership(mainMembership.membershipType!, mainMembership.membershipId!)
        if (characters.length != 0) {
          await this.router.navigate([`/destiny/${mainMembership!.membershipType}/${mainMembership!.membershipId}/${characters[0].characterId}/characters`]);
        } else {
          this.disconnectWithError("You need at least one character");
        }
      } else {
        this.disconnectWithError("You need to activate Cross Save");
      }
    } else {
      this.disconnectWithError("Failed to retrieve your Bungie profile");
    }
  }

  async getPlayerTokensFromBungieCode(playerCode: string) {
    const response = await fetch(`${environment.apiURL}destiny/get/${playerCode}`, {headers: this.getHeaders()})
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
        const response = await fetch(environment.apiURL + 'destiny/update', { headers: HeaderService.getHeaders(), body:  refreshToken, method: 'POST' });
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
