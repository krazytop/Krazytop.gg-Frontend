import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLChampion} from "../../../../model/lol/lol-champion.model";
import {RiotImageService} from "../../../riot/riot-summoner/riot-image.service";

@Component({
  selector: 'lol-main-champions',
  templateUrl: './lol-main-champions.component.html',
  styleUrls: ['./lol-main-champions.component.css']
})
export class LolMainChampionsComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @Input() matches?: LOLMatch[];
  @Input() version?: string;

  mainChampions: Map<String, LolMainChampionsInterface> = new Map();
  mainChampionsList: LolMainChampionsInterface[] = [];

  constructor(protected imageService: RiotImageService) {
  }

  ngOnChanges() {
    if (this.matches) {
      this.setMainChampions();
    }
  }

  private setMainChampions() {
    this.mainChampions = new Map();
    this.matches!
      .filter(match => !match.remake)
      .forEach(match => {
        const summonerTeam = match.teams.find(team => team.participants.some(p => p.summoner.puuid === this.summoner.puuid))!;
        const summonerParticipant = summonerTeam.participants.find(p => p.summoner.puuid === this.summoner.puuid)!;
        const championResults = this.mainChampions.get(summonerParticipant.champion.id);
        if (championResults) {
          championResults.minions += summonerParticipant.minions + summonerParticipant.neutralMinions;
          championResults.kills += summonerParticipant.kills;
          championResults.deaths += summonerParticipant.deaths;
          championResults.assists += summonerParticipant.assists;
          championResults.duration += match.duration;
          if (summonerTeam.hasWin) {
            championResults.wins ++;
          } else {
            championResults.losses ++;
          }
        } else {
          this.mainChampions.set(summonerParticipant.champion.id,
            {wins: summonerTeam.hasWin ? 1 : 0,
              losses: summonerTeam.hasWin ? 0 : 1,
              minions: summonerParticipant.minions + summonerParticipant.neutralMinions,
              kills: summonerParticipant.kills,
              assists: summonerParticipant.assists,
              deaths: summonerParticipant.deaths,
              duration: match.duration,
              champion: summonerParticipant.champion});
        }
    });
    this.mainChampionsList =
      Array.from(this.mainChampions.entries())
        .sort((a, b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses))
        .slice(0, 5)
        .map(([, value]) => value);
  }

  protected getWinRate(championResults: LolMainChampionsInterface) {
    return (championResults.wins / (championResults.wins + championResults.losses) * 100).toFixed(0);
  }

  protected getMinionsPerMatch(championResults: LolMainChampionsInterface) {
    return (championResults.minions / (championResults.wins + championResults.losses)).toFixed(0);
  }

  protected getMinionsPerMin(championResults: LolMainChampionsInterface) {
    return (championResults.minions / championResults.duration * 60).toFixed(1);
  }

  protected getKDA(championResults: LolMainChampionsInterface) {
    const kda =  (championResults.kills + championResults.assists) / championResults.deaths;
    return kda % 1 === 0 ? kda.toFixed(0) : kda.toFixed(1);
  }

  protected getSeparatedKDA(championResults: LolMainChampionsInterface) {
    const nbMatches = championResults.wins + championResults.losses;
    const kills = (championResults.kills / nbMatches).toFixed(0);
    const assists = (championResults.assists / nbMatches).toFixed(0);
    const deaths = (championResults.deaths / nbMatches).toFixed(0);
    return `${kills} / ${deaths} / ${assists}`;
  }

}

interface LolMainChampionsInterface {
  champion: LOLChampion
  wins: number;
  losses: number;
  minions: number;
  duration: number;
  kills: number;
  deaths: number;
  assists: number;
}
