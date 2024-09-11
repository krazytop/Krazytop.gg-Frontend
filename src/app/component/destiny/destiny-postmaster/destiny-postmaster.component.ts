import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {BungieAuthService} from "../bungie-authentification/bungie-auth.service";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyErrorResponseModel} from "../../../model/destiny/destiny-error-response.model";
import {AlertService} from "../../alert/alert.service";
import {DestinyInventoryBucketEnum} from "../../../model/destiny/enum/DestinyInventoryBucketsEnum";

@Component({
  selector: 'destiny-postmaster',
  templateUrl: './destiny-postmaster.component.html',
  styleUrls: ['./destiny-postmaster.component.css']
})
export class DestinyPostmasterComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemInstances!: Map<number, DestinyItemInstanceModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

  private platform?: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private alertService: AlertService) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.route.params.subscribe(params => {
        this.platform = params['platform'];
      });
    }
  }

  getPostmasters() {
    const postmasters: DestinyCharacterInventoryModel[] = [];
    this.characterInventories.forEach(characterInventory => {
      const items = characterInventory.items.filter(item =>  {
        if (item.bucketHash === DestinyInventoryBucketEnum.Postmaster) {
          item.itemNomenclature = this.itemNomenclatures.get(item.itemHash);
          item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
          return true
        } else {
          return false;
        }
      })
      postmasters.push({characterHash: characterInventory.characterHash, items: items});
    });
    return postmasters;
  }

  async moveItem(itemToMove: DestinyItemModel, characterInventory: DestinyCharacterInventoryModel) {//TODO stack
    const body = { //TODO async in html ?
      "itemReferenceHash": itemToMove.itemHash,
      "stackSize": itemToMove.quantity,
      "itemId": itemToMove.itemInstanceId,
      "characterId": characterInventory.characterHash,
      "membershipType": this.platform
    };
    if (await this.bungieAuthService.checkTokenValidity()) {
      this.http.post(`https://www.bungie.net/Platform/Destiny2/Actions/Items/PullFromPostmaster/`, body, {headers: this.bungieAuthService.getHeaders()})
        .subscribe({
          next: () => {
            this.characterInventories = this.characterInventories.map(characterInventory => {
              const filteredItems = characterInventory.items.filter(item => item !== itemToMove);
              return {...characterInventory, items: filteredItems};
            });
          },
          error: (error: HttpErrorResponse) => {
            const destinyErrorResponse: DestinyErrorResponseModel = error.error as DestinyErrorResponseModel;
            this.alertService.processAlert({
              message: destinyErrorResponse.Message,
              duration: 3000
            })
          }
        });
    }
  }

}
