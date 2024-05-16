import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BungieAuthService} from "./bungie-authentification/bungie-auth.service";
import {catchError, concatMap, map, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {DestinyCharacterInventoryModel} from "../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../model/destiny/destiny-item-instance.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyLinkedProfilesModel} from "../../model/destiny/destiny-linked-profiles.model";

@Component({
  selector: 'destiny',
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css']
})
export class DestinyComponent implements OnInit, OnDestroy {

  public requestDataRefreshing: Subject<boolean> = new Subject<boolean>();
  private isFirstDisplay: boolean = true;
  protected componentToShow: string | undefined;

  isThisComponentReady: boolean = false;
  profile: DestinyProfileModel = new DestinyProfileModel();
  linkedProfiles: DestinyLinkedProfilesModel[] = [];
  public static destinyAssetUrl: string = "https://www.bungie.net";

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private router: Router) {}

  ngOnInit() {
    let platform: number | undefined;
    let membership: string | undefined;
    this.route.params.subscribe(params => {
      platform = params['platform'];
      membership = params['membership'];
      this.componentToShow = params['component'];
    });
    this.requestDataRefreshing.subscribe(requestDataRefreshing => {
      if (requestDataRefreshing) {
        this.requestDataRefreshing.next(false);
        this.bungieAuthService.checkTokenValidity().subscribe(isTokenValid => {
          if (isTokenValid) {
            this.getProfile(platform!, membership!).subscribe(() => {
              if (this.profile != null) {
                if (this.profile.characters.length === 0) {
                  console.log("Need at least one character"); //TODO alert + deconnection
                  this.router.navigate(['/']);
                } else {
                  this.getLinkedProfile(platform!, membership!).subscribe(() => this.isThisComponentReady = true)
                }
              } else {
                console.log("Failed to load your Destiny profile"); //TODO alert + deconnection
                this.router.navigate(['/']);
              }
            })
          } else {
            //TODO alert + deconnection
          }
        });
      }
    });
    if (this.isFirstDisplay) {
      this.refreshData();
      this.isFirstDisplay = false;
    }
  }

  getLinkedProfile(platform: number, membership: string) {
    return this.http.get(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/LinkedProfiles/?getAllMemberships=true`, {headers: this.bungieAuthService.getHeaders()})
      .pipe(
        map((response: any) => {
          let profiles: DestinyLinkedProfilesModel[] = [];
          profiles = profiles.concat(Object.values(response['Response']['profiles']));
          profiles.push(response['Response']['bnetMembership'] as DestinyLinkedProfilesModel)
          Object.values(response['Response']['profilesWithErrors'])
            .forEach((profileWithErrors: any) => profiles.push(profileWithErrors['infoCard'] as DestinyLinkedProfilesModel));
          this.linkedProfiles = profiles;
          console.log(profiles)
        })
      );
  }

  getProfile(platform: number, membership: string) {
    return this.http.get(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/?components=200,201,300`, {headers: this.bungieAuthService.getHeaders()})
      .pipe(
        map((response: any) => {
          const destinyProfile: DestinyProfileModel = new DestinyProfileModel();
          destinyProfile.characters = Object.values(response['Response']['characters']['data']);
          destinyProfile.characterInventories = Object.entries(response['Response']['characterInventories']['data'])
            .map(([characterHash, items]) => {
              const characterInventory: DestinyCharacterInventoryModel = new DestinyCharacterInventoryModel();
              characterInventory.characterHash = characterHash;
              characterInventory.items = (items as { [items: string]:DestinyItemModel[] })['items'];
              return characterInventory;
            });
          destinyProfile.itemInstances = Object.entries(response['Response']['itemComponents']['instances']['data'])
            .map(([itemHash, item]) => {
              const itemInstance: DestinyItemInstanceModel = item as DestinyItemInstanceModel;
              itemInstance.hash = itemHash;
              return itemInstance;
            });
          this.profile = destinyProfile;
        })
      );
  }

  refreshData() {
    this.requestDataRefreshing.next(true);
  }

  ngOnDestroy() {
    this.requestDataRefreshing.unsubscribe();
  }

}
