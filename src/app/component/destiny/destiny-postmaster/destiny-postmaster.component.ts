import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {Observable, tap} from "rxjs";
import {HeaderService} from "../../../config/headers.service";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {BungieAuthService} from "../bungie-authentification/bungie-auth.service";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyErrorResponseModel} from "../../../model/destiny/destiny-error-response.model";
import {AlertService} from "../../alert/alert.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'destiny-postmaster',
  templateUrl: './destiny-postmaster.component.html',
  styleUrls: ['./destiny-postmaster.component.css']
})
export class DestinyPostmasterComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemInstances!: DestinyItemInstanceModel[];

  isThisComponentReady: boolean = false;

  private postmasterBucketHash: number = 215593132;
  private platform?: string;
  private characterHash?: string;


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private alertService: AlertService, private appComponent: AppComponent) {
  }

  ngOnChanges(): void {
    this.isThisComponentReady = false;
    if (this.isParentComponentReady) {
      this.route.params.subscribe(params => {
        this.characterHash = params['character'];
        this.platform = params['platform'];
      });

      const usefulItemHashList: number[] = [];
      this.characterInventories.forEach(characterInventory => {
        characterInventory.items = characterInventory.items.filter(item => item.bucketHash === this.postmasterBucketHash)
        characterInventory.items.forEach(item => {
          if (usefulItemHashList.find(hashItem => hashItem === item.itemHash) == undefined) {
            usefulItemHashList.push(item.itemHash);
          }
          item.itemInstance = this.itemInstances.find(itemInstance => itemInstance.hash === item.itemInstanceId);
        })
      });
      this.getItemNomenclature(usefulItemHashList).subscribe(() => {
        this.isThisComponentReady = true;
      });
    }
  }

  getItemNomenclature(itemHashList: number[]): Observable<{[itemHash: number]: DestinyItemNomenclature}> {
    return this.http.post<{[itemHash: number]: DestinyItemNomenclature}>(
      'http://localhost:8080/destiny/items',
      itemHashList,
      { headers: HeaderService.getHeaders() }
    ).pipe(
      tap({
        next: (itemNomenclatureMap: {[itemHash: number]: DestinyItemNomenclature}) => {
          this.characterInventories.forEach(characterInventory => {
            characterInventory.items.forEach(item => {
              for (const itemNomenclatureHash in itemNomenclatureMap) {
                if (Number(itemNomenclatureHash) === item.itemHash) {
                  item!.itemNomenclature = itemNomenclatureMap[itemNomenclatureHash];
                  break;
                }
              }
            })
          })
        },
        error: (error) => {
          console.error('Error during API call:', error);
        }
      })
    );
  }

  moveItem(itemToMove: DestinyItemModel, characterInventory: DestinyCharacterInventoryModel) {
    const body = {"itemReferenceHash": itemToMove.itemHash, "stackSize": itemToMove.quantity, "itemId": itemToMove.itemInstanceId, "characterId": characterInventory.characterHash, "membershipType": this.platform};
    this.http.post(`https://www.bungie.net/Platform/Destiny2/Actions/Items/PullFromPostmaster/`, body, {headers: this.bungieAuthService.getHeaders()})
      .subscribe({
        next: (response: any) => {
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
