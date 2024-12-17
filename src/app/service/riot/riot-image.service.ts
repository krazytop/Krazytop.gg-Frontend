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

  private defaultVersion: string = '14.24.1';
  private static EMPTY_URL = 'assets/data/lol/empty.png';
  private static COMMUNITY_RAW_URL = "https://raw.communitydragon.org/";
  private static BUGGED_COMMUNITY_VERSIONS: Map<string, string> = new Map([
    ['13.1', '13.22'],
    ['13.2', '13.22'],
    ['13.3', '13.22'],
    ['13.4', '13.22'],
    ['13.5', '13.22'],
    ['13.6', '13.22'],
    ['13.7', '13.22'],
    ['13.8', '13.22'],
    ['13.9', '13.22'],
    ['13.10', '13.22'],
    ['13.11', '13.22'],
    ['13.12', '13.22'],
    ['13.13', '13.22'],
    ['13.14', '13.22'],
    ['13.15', '13.22'],
    ['13.16', '13.22'],
    ['13.17', '13.22'],
    ['13.18', '13.22'],
    ['13.19', '13.22'],
    ['13.20', '13.22'],
    ['13.21', '13.22']/**['12.23', '13.22'], ['13.22', '13.24'], ['13.23', '13.24']**/]);

  private formatVersion(version: string) {
    let versionArray = version.split('.');
    return `${versionArray[0]}.${versionArray[1]}.1`;
  }

  private getVersion(matchVersion: string | undefined) {
    if (matchVersion) {
      return this.formatVersion(matchVersion)
    } else {
      return this.defaultVersion;
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

  public getCommunityImage(image: string, matchVersion: string) {
    return `${RIOTImageService.COMMUNITY_RAW_URL}${this.getSafeCommunityVersion(matchVersion)}/game/${image.toLowerCase().replace('.tex', '.png').replace('.dds', '.png')}`;
  }

  private getSafeCommunityVersion(version: string) {
    if (RIOTImageService.BUGGED_COMMUNITY_VERSIONS.has(version)) {
      return RIOTImageService.BUGGED_COMMUNITY_VERSIONS.get(version);
    } else {
      return version;
    }
  }

  public fixCommunityImage(image: string, version: string, event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.getCommunityImage(image, version);
  }
}
