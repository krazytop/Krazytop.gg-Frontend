export class DestinyPresentationNodeNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon!: string;
  nodeType!: number;
  isSeasonal!: boolean;
  objective!: number;
  childrenNode: number[] = [];
  childrenCollectible: number[] = [];
  childrenRecord: number[] = [];
  childrenMetric: number[] = [];
  childrenCraftable: number[] = [];
}
