import {DestinyPresentationTreeModel} from "./destiny-presentation-tree.model";

export class DestinyUrlArgs {

  platform!: number;
  membership!: string;
  character!: string;
  component!: string;

  selectedTitle?: DestinyPresentationTreeModel;
  selectedBadge?: DestinyPresentationTreeModel;
}
