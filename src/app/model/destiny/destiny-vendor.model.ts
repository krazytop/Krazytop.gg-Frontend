import {DestinyVendorProgressionModel} from "./destiny-vendor-progression.model";
import {DestinyVendorNomenclature} from "./destiny-vendor.nomenclature";

export class DestinyVendorModel {
  progression!: DestinyVendorProgressionModel;
  nextRefreshDate!: string;
  vendorHash!: number;
  vendorNomenclature?: DestinyVendorNomenclature;
}
