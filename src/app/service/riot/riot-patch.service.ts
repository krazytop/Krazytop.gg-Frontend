import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HTTPRequestService} from "../../config/http-request.service";
import {LOLPatchNomenclature} from "../../model/lol/nomenclature/lol-patch.nomenclature";
import {TFTPatchNomenclature} from "../../model/tft/nomenclature/tft-patch.nomenclature";
import {CustomTranslateService} from "../custom-translate.service";

@Injectable({
  providedIn: 'root',
})
export class RIOTPatchService {

  constructor(private httpRequestService: HTTPRequestService, private customTranslateService: CustomTranslateService) {
  }

  private lolPatches: LOLPatchNomenclature[] = [];//TODO reset function
  private tftPatches: TFTPatchNomenclature[] = [];
  private language: string = this.customTranslateService.translateService.currentLang;

  public async checkAndGetNewLOLPatchIfNeeded(patchId: string) {
    if (!this.getLOLPatch(patchId)) await this.getNewLOLPatch(patchId);
  }

  public async checkAndGetNewTFTPatchIfNeeded(patchId: string) {
    if (!this.getTFTPatch(patchId)) await this.getNewTFTPatch(patchId);
  }

  private async getNewLOLPatch(patchId: string) {
    const response = await fetch(`${environment.apiURL}lol/patch/${patchId}/${this.language}`, {headers: HTTPRequestService.getBackendHeaders()});
    const patch = await this.httpRequestService.hasResponse(response) ? await response.json() as LOLPatchNomenclature : undefined;
    if (patch) this.lolPatches.push(patch);
  }

  private async getNewTFTPatch(patchId: string) {
    const response = await fetch(`${environment.apiURL}tft/patch/${patchId}/${this.language}`, {headers: HTTPRequestService.getBackendHeaders()});
    const patch = await this.httpRequestService.hasResponse(response) ? await response.json() as TFTPatchNomenclature : undefined;
    if (patch) this.tftPatches.push(patch);
  }

  private getLOLPatch(patchId: string) {
    return this.lolPatches.find(patch => patch.patchId === patchId);
  }

  private getTFTPatch(patchId: string) {
    return this.tftPatches.find(patch => patch.patchId === patchId);
  }

  public getLOLChampionNomenclature(patchId: string, id: string) {
    return this.getLOLPatch(patchId)?.champions.find(champion => champion.id === id);
  }

  public getLOLSummonerSpellNomenclature(patchId: string, id: string) {
    return this.getLOLPatch(patchId)?.summonerSpells.find(summonerSpell => summonerSpell.id === id);
  }

  public getLOLAugmentNomenclature(patchId: string, id: string | undefined) {
    return this.getLOLPatch(patchId)?.augments.find(augment => augment.id === id);
  }

  public getLOLItemNomenclature(patchId: string, id: string | undefined) {
    return this.getLOLPatch(patchId)?.items.find(item => item.id === id);
  }

  public getLOLRuneCategoryNomenclature(patchId: string, id: string) {
    return this.getLOLPatch(patchId)?.runes.find(runeCategory => runeCategory.id === id);
  }

  public getLOLRunePerkNomenclature(patchId: string, id: string) {
    const patch = this.getLOLPatch(patchId);
    for (const runeCategory of patch?.runes ?? []) {
      for (const perk of runeCategory.perks) {
        const subPerk = perk.find(subPerk => subPerk.id === id);
        if (subPerk) {
          return subPerk;
        }
      }
    }
    return undefined;
  }

  public getLOLQueueNomenclature(patchId: string, queueId: string) {
    return this.getLOLPatch(patchId)?.queues.find(queue => queue.id === queueId);
  }

  public getTFTUnitNomenclature(patchId: string, id: string) {
    return this.getTFTPatch(patchId)?.units.find(unit => unit.id.toLowerCase() === id.toLowerCase());
  }

  public getTFTTraitNomenclature(patchId: string, id: string) {
    return this.getTFTPatch(patchId)?.traits.find(trait => trait.id === id);
  }

  public getTFTItemNomenclature(patchId: string, id: string) {
    return this.getTFTPatch(patchId)?.items.find(item => item.id === id);
  }

  public getTFTAugmentNomenclature(patchId: string, id: string) {
    return this.getTFTPatch(patchId)?.augments.find(augment => augment.id === id);
  }

  public getTFTQueueNomenclature(patchId: string, queueId: string) {
    return this.getTFTPatch(patchId)?.queues.find(queue => queue.id === queueId);
  }

}
