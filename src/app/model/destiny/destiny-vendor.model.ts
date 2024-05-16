import {DestinyVendorProgressionModel} from "./destiny-vendor-progression.model";
import {DestinyVendorNomenclature} from "./nomenclature/destiny-vendor.nomenclature";

export class DestinyVendorModel {
  progression!: DestinyVendorProgressionModel;
  nextRefreshDate!: string;
  vendorHash!: number;
  vendorNomenclature?: DestinyVendorNomenclature;
}
