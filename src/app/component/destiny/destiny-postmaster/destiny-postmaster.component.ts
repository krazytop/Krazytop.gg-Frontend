import {Component, Input, OnInit} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {BungieAuthService} from "../../../service/destiny/bungie-auth.service";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyErrorResponseModel} from "../../../model/destiny/destiny-error-response.model";
import {AlertService} from "../../alert/alert.service";
import {DestinyInventoryBucketEnum} from "../../../model/destiny/enum/DestinyInventoryBucketsEnum";
import {getClassName, getClassImage} from "../../../model/destiny/enum/DestinyClassEnum";
import {DestinyComponent} from "../destiny.component";

@Component({
  selector: 'destiny-postmaster',
  templateUrl: './destiny-postmaster.component.html',
  styleUrls: ['./destiny-postmaster.component.css']
})
export class DestinyPostmasterComponent implements OnInit { //TODO pb refresh en boucle

  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemInstances!: Map<number, DestinyItemInstanceModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

  postmasters: DestinyCharacterInventoryModel[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private alertService: AlertService, protected destinyComponent: DestinyComponent) {
  }

  ngOnInit() {
    this.setPostmasters();
  }

  setPostmasters() {
    this.postmasters = [];
    this.characterInventories.forEach(characterInventory => {
      const items = characterInventory.items.filter(item =>  {
        if (item.bucketHash === DestinyInventoryBucketEnum.Postmaster) {
          item.itemNomenclature = this.itemNomenclatures.get(item.itemHash)!;
          item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
          return true
        } else {
          return false;
        }
      })
      this.postmasters.push({characterHash: characterInventory.characterHash, items: items});
    });
  }

  //TODO supprimer de la liste en input et affichée
  async moveItem(itemToMove: DestinyItemModel, characterInventory: DestinyCharacterInventoryModel) {//TODO stack
    const body = { //TODO async in html ?
      "itemReferenceHash": itemToMove.itemHash,
      "stackSize": itemToMove.quantity,
      "itemId": itemToMove.itemInstanceId,
      "characterId": characterInventory.characterHash,
      "membershipType": this.route.snapshot.paramMap.get('platform')
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

  protected readonly getClassNameByGender = getClassName;
  protected readonly getImageByClassHash = getClassImage;
}
