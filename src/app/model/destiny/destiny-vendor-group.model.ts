import {DestinyVendorModel} from "./destiny-vendor.model";
import {DestinyVendorGroupNomenclature} from "./nomenclature/destiny-vendor-group.nomenclature";

export class DestinyVendorGroupModel {
  vendorGroupHash!: number;
  vendorGroupNomenclature?: DestinyVendorGroupNomenclature;
  vendorHashes!: number[];
  vendors: DestinyVendorModel[] = [];
}
