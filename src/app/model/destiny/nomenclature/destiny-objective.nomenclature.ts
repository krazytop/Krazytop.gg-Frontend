export class DestinyObjectiveNomenclature {
  hash!: number;
  name!: string;
  icon!: string;
  description!: string;
  progressDescription!: string;
  completionValue!: number;
  scope!: number;
  locationHash!: number; //TODO
  allowValueChangeWhenCompleted!: boolean;
  isCountingDownward!: boolean;
  allowNegativeValue!: boolean;
  allowOvercompletion!: boolean;
  showValueOnComplete!: boolean;
  isDisplayOnlyObjective!: boolean;
}
