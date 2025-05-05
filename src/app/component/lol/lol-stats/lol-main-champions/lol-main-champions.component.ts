import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {LOLMatchService} from "../../../../service/lol/lol-match.service";
import {RIOTMetadata} from "../../../../model/riot/riot-metadata.model";
import {RIOTMatch} from "../../../../model/riot/riot-match.model";

@Component({
  selector: 'lol-main-champions',
  templateUrl: './lol-main-champions.component.html',
  styleUrls: ['./lol-main-champions.component.css']
})
export class LOLMainChampionsComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @Input({transform: (matches: RIOTMatch[]): LOLMatch[] => matches as LOLMatch[]}) matches!: LOLMatch[];
  @Input() metadata!: RIOTMetadata;

  mainChampions: Map<string, LolMainChampionsInterface> = new Map();
  mainChampionsList: LolMainChampionsInterface[] = [];

  constructor(protected imageService: RIOTImageService, private matchService: LOLMatchService) {
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
        const summonerTeam = this.matchService.getSummonerTeam(match, this.summoner);
        const summonerParticipant = this.matchService.getSummonerParticipant(match, this.summoner);
        const championResults = this.mainChampions.get(summonerParticipant.champion);
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
          this.mainChampions.set(summonerParticipant.champion,
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
        .filter(champion => champion[1].wins + champion[1].losses > 1)
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
  champion: string
  wins: number;
  losses: number;
  minions: number;
  duration: number;
  kills: number;
  deaths: number;
  assists: number;
}
