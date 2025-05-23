import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {LOLMatchService} from "../../../../service/lol/lol-match.service";
import {RIOTMetadata} from "../../../../model/riot/riot-metadata.model";
import {RIOTMatch} from "../../../../model/riot/riot-match.model";

@Component({
  selector: 'lol-main-friends',
  templateUrl: './lol-main-friends.component.html',
  styleUrls: ['./lol-main-friends.component.css']
})
export class LOLMainFriendsComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @Input({transform: (matches: RIOTMatch[]): LOLMatch[] => matches as LOLMatch[]}) matches!: LOLMatch[];
  @Input() metadata!: RIOTMetadata;

  mainFriends: Map<string, LolMainFriendsInterface> = new Map();
  mainFriendsList: LolMainFriendsInterface[] = [];

  constructor(protected imageService: RIOTImageService, protected matchService: LOLMatchService) {
  }

  ngOnChanges() {
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
              friendResults.matches.push(match)
            } else {
              this.mainFriends.set(participant.summoner.id,
                {wins: summonerTeam.hasWin ? 1 : 0,
                  losses: summonerTeam.hasWin ? 0 : 1,
                  summoner: participant.summoner,
                  streak: 0,
                  matches: [match]});
            }
          })
      })
    this.mainFriendsList =
      Array.from(this.mainFriends.entries())
        .map(([, value]) => value)
        .filter(result => result.losses + result.wins > 1)
        .sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses))
        .slice(0, 5);
    this.mainFriendsList.forEach(friend => {
      friend.streak = this.matchService.getMatchesStreak(friend.matches, friend.summoner);
    });
  }

  protected getWinRate(friendResults: LolMainFriendsInterface) {
    return (friendResults.wins / (friendResults.wins + friendResults.losses) * 100).toFixed(0);
  }

  protected readonly Math = Math;
}

interface LolMainFriendsInterface {
  summoner: RIOTSummoner
  wins: number;
  losses: number;
  streak: number;
  matches: LOLMatch[];
}

