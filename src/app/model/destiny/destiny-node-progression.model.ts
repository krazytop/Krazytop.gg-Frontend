import {DestinyObjectiveProgressModel} from "./destiny-objective-progress.model";

export class DestinyNodeProgressionModel {
  state!: number;
  progressValue!: number;
  completionValue!: number;
  objectives: DestinyObjectiveProgressModel[] = [];
  intervalObjectives: DestinyObjectiveProgressModel[] = [];
}
