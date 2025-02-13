import {TFTUnitNomenclature} from "./tft-unit.nomenclature";
import {TFTTraitNomenclature} from "./tft-trait.nomenclature";
import {TFTItemNomenclature} from "./tft-item.nomenclature";
import {RIOTQueueNomenclature} from "../../riot/nomenclature/riot-queue.nomenclature";

export class TFTPatchNomenclature {
  id!: string;
  patchId!: string;
  language!: string;
  set!: number;
  units!: TFTUnitNomenclature[];
  traits!: TFTTraitNomenclature[];
  items!: TFTItemNomenclature[];
  augments!: TFTItemNomenclature[];
  queues!: RIOTQueueNomenclature[];
}
