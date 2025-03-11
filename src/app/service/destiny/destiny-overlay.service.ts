import {Injectable} from "@angular/core";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {DestinyStatNomenclature} from "../../model/destiny/nomenclature/destiny-stat.nomenclature";
import {DestinyItemOverlayModel} from "../../model/destiny/destiny-item-overlay.model";

@Injectable({ providedIn: 'root' })
export class DestinyOverlayService {

  public itemOverlay: DestinyItemOverlayModel = new DestinyItemOverlayModel();

  showItem(item: DestinyItemModel, top: number, left: number) {
    of(item).pipe(delay(10)).subscribe(() => {
      this.itemOverlay.top = top;
      this.itemOverlay.left = left;
      this.itemOverlay.item = item;
    });
  }

  hideItem() {
    this.itemOverlay.item = undefined;
  }

}
