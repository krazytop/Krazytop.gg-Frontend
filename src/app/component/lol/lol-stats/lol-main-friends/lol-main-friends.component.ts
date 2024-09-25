import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {RiotImageService} from "../../../riot/riot-summoner/riot-image.service";

@Component({
  selector: 'lol-main-friends',
  templateUrl: './lol-main-friends.component.html',
  styleUrls: ['./lol-main-friends.component.css']
})
export class LolMainFriendsComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @Input() matches: LOLMatch[] | undefined;

  mainFriends: Map<String, LolMainFriendsInterface> = new Map();
  mainFriendsList: LolMainFriendsInterface[] = [];

  constructor(protected imageService: RiotImageService) {
  }

  ngOnChanges() { //TODO mettre la streak avec chacun
    if (this.matches) {
      this.setMainFriends();
    }
  }

  private setMainFriends() {
    this.mainFriends = new Map();
    this.matches!
      .filter(match => !match.remake)
      .forEach(match => {
        const summonerTeam = match.teams.find(team => team.participants.some(p => p.summoner.puuid === this.summoner.puuid))!;
        summonerTeam.participants
          .filter(participant => participant.summoner.id != this.summoner.id)
          .forEach(participant => {
            const friendResults = this.mainFriends.get(participant.summoner.id);
            if (friendResults) {
              if (summonerTeam.hasWin) {
                friendResults.wins ++;
              } else {
                friendResults.losses ++;
              }
            } else {
              this.mainFriends.set(participant.summoner.id,
                {wins: summonerTeam.hasWin ? 1 : 0,
                  losses: summonerTeam.hasWin ? 0 : 1,
                  summoner: participant.summoner});
            }
          })
      })
    this.mainFriendsList =
      Array.from(this.mainFriends.entries())
        .map(([, value]) => value)
        .filter(result => result.losses + result.wins > 1)
        .sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses))
        .slice(0, 5);
  }

  protected getWinRate(friendResults: LolMainFriendsInterface) {
    return (friendResults.wins / (friendResults.wins + friendResults.losses) * 100).toFixed(0);
  }

}

interface LolMainFriendsInterface {
  summoner: RIOTSummoner
  wins: number;
  losses: number;
}

