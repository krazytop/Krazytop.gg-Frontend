import {Component, Input} from '@angular/core';
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyRecordNomenclature} from "../../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyComponent} from "../destiny.component";
import {DestinyObjectiveNomenclature} from "../../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {
  DestinyIntervalObjectiveNomenclature
} from "../../../model/destiny/nomenclature/destiny-interval-objective.nomenclature";
import {DestinyObjectiveProgressModel} from "../../../model/destiny/destiny-objective-progress.model";

@Component({
  selector: 'destiny-record',
  templateUrl: './destiny-record.component.html',
  styleUrls: ['./destiny-record.component.css']
})
export class DestinyRecordComponent {

  @Input() record!: DestinyRecordNomenclature;
  @Input() recordProgress!: DestinyNodeProgressionModel;

  private noDescription: string = "Terminé";

  getSimpleObjectiveProgress(objective: DestinyObjectiveNomenclature) {
    return this.recordProgress.objectives.find(objectiveProgress => objectiveProgress.objectiveHash === objective.hash)!;
  }

  getIntervalObjectivesProgress(objective: DestinyIntervalObjectiveNomenclature) {
    return this.recordProgress.intervalObjectives.find(objectiveProgress => objectiveProgress.objectiveHash === objective.objective.hash)!;
  }

  getIntervalObjectiveWidth(record: DestinyRecordNomenclature, objective: DestinyIntervalObjectiveNomenclature) {
    let needToBeZeroWidth: boolean = false;
    let lastObjective: DestinyObjectiveProgressModel | undefined = undefined;
    for (let intervalObjective of record.intervalObjectives!) {
      if (intervalObjective === objective) {
        if (needToBeZeroWidth) {
          return 0;
        } else if (lastObjective != undefined) {
          let min = lastObjective.completionValue;
          let max = intervalObjective.objective.completionValue;
          let current = this.getIntervalObjectivesProgress(intervalObjective).progress;
          return (current - min) / (max - min) * 100;
        } else {
          return this.getIntervalObjectivesProgress(intervalObjective).progress / intervalObjective.objective.completionValue * 100;
        }
      } else {
        lastObjective = this.getIntervalObjectivesProgress(intervalObjective);
        if (!this.getIntervalObjectivesProgress(intervalObjective).complete) {
          needToBeZeroWidth = true;
        }
      }
    }
    return 0;
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

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly Math = Math;
  protected readonly isRecordComplete = isRecordComplete;
}

export function isRecordComplete(recordProgress: DestinyNodeProgressionModel): boolean { //TODO bug (catalyseur garance)
  return (recordProgress.objectives ?? []).every(objective => objective.complete)
    && (recordProgress.intervalObjectives ?? []).every(objective => objective.complete);
}
