import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLChampion} from "../../../../model/lol/lol-champion.model";

@Component({
  selector: 'lol-main-champions',
  templateUrl: './lol-main-champions.component.html',
  styleUrls: ['./lol-main-champions.component.css']
})
export class LolMainChampionsComponent implements OnChanges{

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @Input() matches: LOLMatch[] | undefined;

  mainChampions: Map<String, {wins: number; losses: number; champion: LOLChampion}> = new Map();
  mainChampionsList: {wins: number; losses: number; champion: LOLChampion}[] = [];

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
          if (summonerTeam.hasWin) {
            championResults.wins ++;
          } else {
            championResults.losses ++;
          }
        } else {
          this.mainChampions.set(summonerParticipant.champion.id, {wins: summonerTeam.hasWin ? 1 : 0, losses: summonerTeam.hasWin ? 0 : 1, champion: summonerParticipant.champion});
          this.mainChampionsList =
            Array.from(this.mainChampions.entries())
              .sort((a, b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses))
              .slice(0, 5)
              .map(([, value]) => value);
        }
    });
  }

  protected getImageUrl(image: string) {
    let versionArray = this.matches![0].version.split('.');
    const version = `${versionArray[0]}.${versionArray[1]}.1`;
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${image}`;
  }

  //barre victoire / defaite, win rate, cs, k/d/a
  //win rate prendre les couleurs des streaks

  protected getWinRate(championResult: {wins: number, losses: number, champion: LOLChampion}) {
    return (championResult.wins / (championResult.wins + championResult.losses) * 100).toFixed(0);
  }

  protected readonly Math = Math;
}
