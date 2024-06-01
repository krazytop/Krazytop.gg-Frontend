import {Component, Input, OnChanges} from '@angular/core';
import {DestinyObjectiveProgressModel} from "../../../../model/destiny/destiny-objective-progress.model";
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {DestinyObjectiveNomenclature} from "../../../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {DestinyRecordNomenclature} from "../../../../model/destiny/nomenclature/destiny-record.nomenclature";
import {
  DestinyIntervalObjectiveNomenclature
} from "../../../../model/destiny/nomenclature/destiny-interval-objective.nomenclature";

@Component({
  selector: 'destiny-title',
  templateUrl: './destiny-title.component.html',
  styleUrls: ['./destiny-title.component.css']
})
export class DestinyTitleComponent implements OnChanges {


  @Input() isParentComponentReady: boolean = false;
  @Input() title!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  titleNodeProgress?: DestinyNodeProgressionModel

  private noDescription: string = "Terminé"; //TODO

  ngOnChanges() {
    this.titleNodeProgress = this.presentationNodeProgress.get(this.title.hash);
  }

  isTitleComplete(): boolean {
    return this.titleNodeProgress?.progressValue! >= this.titleNodeProgress?.completionValue!;
  }

  isRecordComplete(record: DestinyRecordNomenclature): boolean {
    return (this.getRecordProgress(record).objectives ?? []).every(objective => objective.complete)
      && (this.getRecordProgress(record).intervalObjectives ?? []).every(objective => objective.complete);
  }

  getRecordProgress(record: DestinyRecordNomenclature) {
    return this.presentationNodeProgress.get(record.hash)!;
  }

  getSimpleObjectiveProgress(record: DestinyRecordNomenclature, objective: DestinyObjectiveNomenclature) {
    return this.getRecordProgress(record).objectives.find(objectiveProgress => objectiveProgress.objectiveHash === objective.hash)!;
  }

  getIntervalObjectivesProgress(record: DestinyRecordNomenclature, objective: DestinyIntervalObjectiveNomenclature) {
    return this.getRecordProgress(record).intervalObjectives.find(objectiveProgress => objectiveProgress.objectiveHash === objective.objective.hash)!;
  }

  getIntervalObjectiveWidth(record: DestinyRecordNomenclature, objective: DestinyIntervalObjectiveNomenclature) {
    let needToBeZeroWidth: boolean = false;
    let lastObjective: DestinyObjectiveProgressModel | undefined = undefined;
    for (let intervalObjective of record.intervalObjectives) {
      if (intervalObjective === objective) {
        if (needToBeZeroWidth) {
          return 0;
        } else if (lastObjective != undefined) {
          let min = lastObjective.completionValue;
          let max = intervalObjective.objective.completionValue;
          let current = this.getIntervalObjectivesProgress(record, intervalObjective).progress;
          return (current - min) / (max - min) * 100;
        } else {
          return this.getIntervalObjectivesProgress(record, intervalObjective).progress / intervalObjective.objective.completionValue * 100;
        }
      } else {
        lastObjective = this.getIntervalObjectivesProgress(record, intervalObjective);
        if (!this.getIntervalObjectivesProgress(record, intervalObjective).complete) {
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
}
