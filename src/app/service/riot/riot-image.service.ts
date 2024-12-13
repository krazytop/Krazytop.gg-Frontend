import {Injectable} from "@angular/core";
import {LOLItem} from "../../model/lol/lol-item.model";
import {LOLSummonerSpell} from "../../model/lol/lol-summoner-spell.model";
import {LOLRune} from "../../model/lol/lol-rune.model";
import {LOLChampion} from "../../model/lol/lol-champion.model";
import {LOLAugmentNomenclature} from "../../model/lol/nomenclature/lol-augment.nomenclature";

@Injectable({
  providedIn: 'root',
})
export class RIOTImageService {

  private version?: string;
  private defaultVersion: string = '14.24.1';
  private static EMPTY_URL = 'assets/data/lol/empty.png';

  setVersion(version: string) {
    this.version = this.formatVersion(version);
  }

  private formatVersion(version: string) {
    let versionArray = version.split('.');
    return `${versionArray[0]}.${versionArray[1]}.1`;
  }

  private getVersion(matchVersion: string | undefined) {
    if (matchVersion) {
      return this.formatVersion(matchVersion)
    } else {
      return this.version ? this.version : this.defaultVersion;
    }
  }

  public getChampionImageUrl(champion: LOLChampion, matchVersion?: string) {
    return this.getImageUrl(champion.image, 'champion', matchVersion);
  }

  public getItemImageUrl(item: LOLItem | undefined, matchVersion?: string) {
    return item ? this.getImageUrl(item.image, 'item', matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getSpellImageUrl(spell: LOLSummonerSpell | undefined, matchVersion?: string) {
    return spell ? this.getImageUrl(spell.image, 'spell', matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getRuneImageUrl(rune: LOLRune | undefined) {
    return rune ? `https://ddragon.leagueoflegends.com/cdn/img/${rune.image}` : RIOTImageService.EMPTY_URL;
  }

  public getAugmentImageUrl(augment: LOLAugmentNomenclature | undefined) {
    return augment ? `https://raw.communitydragon.org/14.18/game/${augment.image}` : RIOTImageService.EMPTY_URL;
  }

  public getProfileIconUrl(icon: number, matchVersion?: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${this.getVersion(matchVersion)}/img/profileicon/${icon}.png`;
  }

  private getImageUrl(image: string, component: string, matchVersion?: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${this.getVersion(matchVersion)}/img/${component}/${image}`;
  }
}
