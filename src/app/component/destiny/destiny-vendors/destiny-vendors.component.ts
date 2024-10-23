import {Component, Input} from '@angular/core';
import {DestinyVendorGroupNomenclature} from "../../../model/destiny/nomenclature/destiny-vendor-group.nomenclature";

@Component({
  selector: 'destiny-vendors',
  templateUrl: './destiny-vendors.component.html',
  styleUrls: ['./destiny-vendors.component.css']
})
export class DestinyVendorsComponent {

  @Input() vendorGroups!: DestinyVendorGroupNomenclature[];
}
