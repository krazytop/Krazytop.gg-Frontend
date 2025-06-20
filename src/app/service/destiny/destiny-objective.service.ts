import {Injectable} from "@angular/core";
import {DestinyObjectiveNomenclature} from "../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {DestinyObjectiveProgressModel} from "../../model/destiny/destiny-objective-progress.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {CustomTranslateService} from "../custom-translate.service";

@Injectable({ providedIn: 'root' })
export class DestinyObjectiveService {

  private noDescription: string = "Terminé";

  constructor(customTranslateService: CustomTranslateService) {
    customTranslateService.translateService.get('DESTINY.NO_DESCRIPTION').subscribe(translation => {
      this.noDescription = translation;
    })
  }

  getCompleteObjectiveDescription(objective: DestinyObjectiveNomenclature) {
    const progressDescription = objective.progressDescription;
    const description = objective.description;
    if (progressDescription != "") {
      return progressDescription
    } else {
      return description != "" ? description : this.noDescription;
    }
  }

  areAllObjectivesCompleted(objectives: DestinyObjectiveProgressModel[] = []) {
    return objectives!.every(objective => objective.complete);
  }

  isExpired(item: DestinyItemModel): boolean {
    return !(new Date(item.expirationDate!).getTime() <= Date.now()) ? false : this.areAllObjectivesCompleted(item.itemObjectives!)
      ? !item.itemNomenclature.suppressExpirationWhenObjectivesComplete
      : true;
  }

  showExpiration(item: DestinyItemModel) {
    return item.expirationDate && !this.areAllObjectivesCompleted(item.itemObjectives) || !item.itemNomenclature.suppressExpirationWhenObjectivesComplete;
  }
}
