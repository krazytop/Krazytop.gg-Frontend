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

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {}

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

  getCurrentUserMembershipsWithCode(playerCode: string) {
    this.http.get(environment.apiURL + `destiny/get/${playerCode}`, {headers: HeaderService.getHeaders()})
      .subscribe((response: BungieAuthModel) => {
        this.setExpirations(response);
        this.setPlayerTokens(response);
        this.http.get('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {headers: this.getHeaders()})
          .subscribe({
            next: (response: any) => {
              const userMemberships: DestinyUserMembershipsModel = response['Response'];
              let mainMembership: DestinyMembershipsModel | null = null;
              if (userMemberships.destinyMemberships.length === 1) {
                mainMembership = userMemberships.destinyMemberships[0];
              } else {
                for (let membership of userMemberships.destinyMemberships) {
                  if (membership.membershipId === userMemberships.primaryMembershipId) {
                    mainMembership = membership;
                  }
                }
              }
              if (mainMembership != null) {
                this.getCharactersFromMembership(mainMembership.membershipType!, mainMembership.membershipId!)
                  .subscribe((characters: DestinyCharacterModel[]) => {
                    if (characters.length != 0) {
                      this.router.navigate([`/destiny/${mainMembership!.membershipType}/${mainMembership!.membershipId}/${characters[0].characterId}/characters`]);
                    } else {
                      this.disconnectWithError("You need at least one character");
                    }
                  });
              } else {
                this.disconnectWithError("You need to activate Cross Save");
              }
            }
          });
      }, () => {
        this.disconnectWithError("Failed to retrieve your Bungie profile");
      });
  }

  getCharactersFromMembership(membershipType: number, membershipId: string) {
    return this.http.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`, {headers: this.getHeaders()})
      .pipe(
        map((response: any) => {
          const charactersData: any = response['Response']['characters']['data'];
          const characters: DestinyCharacterModel[] = Object.values(charactersData);
          characters.sort((a, b) => new Date(b.dateLastPlayed).getTime() - new Date(a.dateLastPlayed).getTime());
          return characters;
        })
      );
  }

  checkTokenValidity(): Observable<boolean> { //TODO mettre dans error si expired
    if (this.isTokenExpired()) {
      if (this.isRefreshTokenExpired()) {
        return of(false);
      } else {
        const refreshToken = this.getPlayerTokens()!.refresh_token!;
        return this.http.post<BungieAuthModel>(environment.apiURL + 'destiny/update', { refreshToken }, { headers: HeaderService.getHeaders() })
          .pipe(
            tap((response: BungieAuthModel | null) => {
              if (response != null) {
                this.setExpirations(response);
                this.setPlayerTokens(response);
              }
            }),
            map(() => true)
          );
      }
    } else {
      return of(true);
    }
  }

  setExpirations(playerTokens: BungieAuthModel){
    const actualTimestamp: number = Math.floor(new Date().getTime() / 1000);
    playerTokens.expires_timestamp = actualTimestamp + playerTokens.expires_in!;
    playerTokens.refresh_expires_timestamp = actualTimestamp + playerTokens.refresh_expires_in!;
  }

  isTokenExpired(): boolean {
    const tokens = this.getPlayerTokens();
    if (!tokens) {
      return false;
    }
    return tokens.expires_timestamp! < Math.floor(new Date().getTime() / 1000) + 60;
  }

  isRefreshTokenExpired() {
    const tokens = this.getPlayerTokens();
    if (!tokens) {
      return false;
    }
    return tokens.refresh_expires_timestamp! < Math.floor(new Date().getTime() / 1000) + 60;
  }

  disconnect() {
    localStorage.removeItem('bungie_player_tokens');
    this.router.navigate(['/']);
  }

  disconnectWithNotLoggedError() {
    localStorage.removeItem('bungie_player_tokens');
    this.router.navigate(['/']).then(() => this.alertService.processAlert({
      message: "You need to reconnect your bungie account",
      duration: 3000
    }));
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
    if (storedTokens) {
      return JSON.parse(storedTokens) as BungieAuthModel;
    } else {
      return null;
    }
  }

  setPlayerTokens(playerTokens: BungieAuthModel) {
    window.localStorage.setItem('bungie_player_tokens', JSON.stringify(playerTokens));
  }

}
