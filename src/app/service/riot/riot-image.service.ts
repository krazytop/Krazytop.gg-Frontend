import {Injectable} from "@angular/core";
import {RIOTPatchService} from "./riot-patch.service";

@Injectable({
  providedIn: 'root',
})
export class RIOTImageService {

  constructor(private patchService: RIOTPatchService) {
  }

  private defaultVersion: string = '14.24.1';
  private static EMPTY_URL = 'assets/data/lol/empty.png';
  private static OFFICIAL_CDN_URL = "https://ddragon.leagueoflegends.com/cdn/";
  private static COMMUNITY_RAW_URL = "https://raw.communitydragon.org/";
  private static BUGGED_COMMUNITY_VERSIONS: Map<string, string> = new Map([
    ['13.8', '13.10'],
    ['13.9', '13.10']]);

  private getVersion(matchVersion: string) {
    return matchVersion + '.1';
  }

  public getLOLChampionImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getLOLChampionNomenclature(matchVersion, id);
    return nomenclature ? this.getOfficialImageUrl(nomenclature.image, 'champion', matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getLOLItemImageUrl(id: string | undefined, matchVersion: string) {
    const nomenclature = this.patchService.getLOLItemNomenclature(matchVersion, id);
    return nomenclature ? this.getOfficialImageUrl(nomenclature.image, 'item', matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getLOLSpellImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getLOLSummonerSpellNomenclature(matchVersion, id);
    return nomenclature ? this.getOfficialImageUrl(nomenclature.image, 'spell', matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getLOLRuneCategoryImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getLOLRuneCategoryNomenclature(matchVersion, id);
    return nomenclature ? `${RIOTImageService.OFFICIAL_CDN_URL}img/${nomenclature.image}` : RIOTImageService.EMPTY_URL;
  }

  public getLOLRunePerkImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getLOLRunePerkNomenclature(matchVersion, id);
    return nomenclature ? `${RIOTImageService.OFFICIAL_CDN_URL}img/${nomenclature.image}` : RIOTImageService.EMPTY_URL;
  }

  public getLOLAugmentImageUrl(id: string | undefined, matchVersion: string) {
    const nomenclature = this.patchService.getLOLAugmentNomenclature(matchVersion, id);
    return nomenclature ? `${RIOTImageService.COMMUNITY_RAW_URL}${matchVersion}/game/${nomenclature.image}` : RIOTImageService.EMPTY_URL;
  }

  public getProfileIconUrl(icon: number, matchVersion: string) {
    return `${RIOTImageService.OFFICIAL_CDN_URL}${this.getVersion(matchVersion)}/img/profileicon/${icon}.png`;
  }

  private getOfficialImageUrl(image: string, component: string, matchVersion: string) {
    return `${RIOTImageService.OFFICIAL_CDN_URL}${this.getVersion(matchVersion)}/img/${component}/${image}`;
  }

  public getTFTUnitImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getTFTUnitNomenclature(matchVersion, id);
    return nomenclature ? this.getCommunityImageUrl(nomenclature.image, matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getTFTItemImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getTFTItemNomenclature(matchVersion, id);
    return nomenclature ? this.getCommunityImageUrl(nomenclature.image, matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getTFTAugmentImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getTFTAugmentNomenclature(matchVersion, id);
    return nomenclature ? this.getCommunityImageUrl(nomenclature.image, matchVersion) : RIOTImageService.EMPTY_URL;
  }

  public getTFTTraitImageUrl(id: string, matchVersion: string) {
    const nomenclature = this.patchService.getTFTTraitNomenclature(matchVersion, id);
    return nomenclature ? this.getCommunityImageUrl(nomenclature.image, matchVersion) : RIOTImageService.EMPTY_URL;
  }

  private getCommunityImageUrl(image: string, matchVersion: string) {
    return `${RIOTImageService.COMMUNITY_RAW_URL}${this.getSafeCommunityVersion(matchVersion)}/game/${image.toLowerCase().replace('.tex', '.png').replace('.dds', '.png')}`;
  }

  private getSafeCommunityVersion(version: string) {
    if (RIOTImageService.BUGGED_COMMUNITY_VERSIONS.has(version)) {
      return RIOTImageService.BUGGED_COMMUNITY_VERSIONS.get(version);
    } else {
      return version;
    }
  }

  public fixTFTUnitImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = target.src.replace('_square','');
  }

}
