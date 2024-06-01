import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {DestinyPresentationTreesModel} from "../../model/destiny/destiny-presentation-trees.model";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyComponentArgs} from "../../model/destiny/destiny-component-args";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {DestinyClassNomenclature} from "../../model/destiny/nomenclature/destiny-class.nomenclature";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";

@Injectable({
  providedIn: 'root',
})
export class DestinyDataStorage {

  profile: DestinyProfileModel = new DestinyProfileModel();
  presentationTrees: DestinyPresentationTreesModel = new DestinyPresentationTreesModel();
  componentArgs: DestinyComponentArgs = new DestinyComponentArgs();

  itemNomenclatures: Map<number, DestinyItemNomenclature> = new Map();
  characterClassNomenclatures: Map<string, DestinyClassNomenclature> = new Map();
  characterTitleNomenclatures: Map<string, DestinyRecordNomenclature> = new Map();

  isFirstDisplay: boolean = true;
  requestDataRefreshing: Subject<boolean> = new Subject<boolean>();
}
