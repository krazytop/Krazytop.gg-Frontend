import {DestinyVendorModel} from "./destiny-vendor.model";
import {DestinyVendorGroupNomenclature} from "./nomenclature/destiny-vendor-group.nomenclature";

export class DestinyVendorGroupModel {
  hash!: number;
  name!: string;
  vendors: DestinyVendorModel[] = [];
}
