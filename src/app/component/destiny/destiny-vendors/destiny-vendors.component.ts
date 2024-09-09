import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {BungieAuthService} from "../bungie-authentification/bungie-auth.service";
import {DestinyVendorGroupModel} from "../../../model/destiny/destiny-vendor-group.model";
import {DestinyVendorModel} from "../../../model/destiny/destiny-vendor.model";
import {HeaderService} from "../../../config/headers.service";
import {tap} from "rxjs";
import {DestinyVendorNomenclature} from "../../../model/destiny/nomenclature/destiny-vendor.nomenclature";
import {DestinyVendorGroupNomenclature} from "../../../model/destiny/nomenclature/destiny-vendor-group.nomenclature";
import {DestinyProgressionNomenclature} from "../../../model/destiny/nomenclature/destiny-progression.nomenclature";
import {environment} from "../../../../environments/environment";
import {DestinyNomenclatureService} from "../../../service/destiny/DestinyNomenclatureService";

@Component({
  selector: 'destiny-vendors',
  templateUrl: './destiny-vendors.component.html',
  styleUrls: ['./destiny-vendors.component.css']
})
export class DestinyVendorsComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  protected isThisComponentReady: boolean = false;

  protected vendorGroups: DestinyVendorGroupModel[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private nomenclatureService: DestinyNomenclatureService) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      let platform: number | undefined;
      let membership: string | undefined;
      let character: string | undefined;
      this.route.params.subscribe(params => {
        //TODO si jamais on affiche les items alors mettre le tout dans ce subscribe pour voir le changement de character
        platform = params['platform'];
        membership = params['membership'];
        character = params['character'];
      });
      this.isThisComponentReady = false;
      this.bungieAuthService.checkTokenValidity().subscribe(isTokenValid => {
        if (isTokenValid) {
          this.getVendors(platform!, membership!, character!);
        }
      });
    }
  }

  getVendors(platform: number, membership: string, character: string){
    this.http.get(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/Character/${character}/Vendors/?components=400`, {headers: this.bungieAuthService.getHeaders()})
      .subscribe(async (response: any) => {
        const vendorGroups: DestinyVendorGroupModel[] = response['Response']['vendorGroups']['data']['groups'];
        const allVendors: { [hash: number]: DestinyVendorModel } = response['Response']['vendors']['data'];
        const usefulVendors: { [hash: number]: DestinyVendorModel } = {}
        const usefulVendorHashList: number[] = [];
        const usefulProgressionHashList: number[] = [];

        Object.keys(allVendors).forEach(hash => {
          if (this.isVendorPresentInGroups(vendorGroups, Number(hash)) && allVendors[Number(hash)].progression != undefined) {
            usefulVendors[Number(hash)] = allVendors[Number(hash)]
            usefulVendorHashList.push(Number(hash));
            usefulProgressionHashList.push(allVendors[Number(hash)].progression.progressionHash)
          }
        });
        let requestCompleted: number = 2;
        await this.nomenclatureService.getVendorNomenclatures(vendorGroups.map(vendorGroups => vendorGroups.hash));
          this.http.post<{
            [vendorHash: number]: DestinyVendorNomenclature
          }>(environment.apiURL + 'destiny/vendors', usefulVendorHashList, {headers: HeaderService.getHeaders()}
          ).pipe(
          ).subscribe(() => {
            this.http.post<{
              [progressionHash: number]: DestinyProgressionNomenclature
            }>(environment.apiURL + 'destiny/progressions', usefulProgressionHashList, {headers: HeaderService.getHeaders()}
            ).pipe(
              this.addProgressionNomenclatures(vendorGroups)
            ).subscribe(() => {
              requestCompleted--;
              if (requestCompleted === 0) {
                this.vendorGroups = vendorGroups.filter(vendorGroup => vendorGroup.vendors.length > 0);
                this.isThisComponentReady = true;
              }
            });
          });
          this.http.post<{
            [vendorGroupHash: number]: DestinyVendorGroupNomenclature
          }>(environment.apiURL + 'destiny/vendor-groups', vendorGroupHashList, {headers: HeaderService.getHeaders()}
          ).pipe(
            this.addVendorGroupNomenclatures(vendorGroups)
          ).subscribe(() => {
            requestCompleted--;
            if (requestCompleted === 0) {
              this.vendorGroups = vendorGroups.filter(vendorGroup => vendorGroup.vendors.length > 0);
              this.isThisComponentReady = true;
            }
          });
      });
  }

  addProgressionNomenclatures(vendorGroups: DestinyVendorGroupModel[]) {
    return tap({
      next: (progressionNomenclatureMap: {[progressionHash: number]: DestinyProgressionNomenclature}) => {
        for (const progressionHash in progressionNomenclatureMap) {
          vendorGroups.forEach(vendorGroup => {
            vendorGroup.vendors.forEach(vendor => {
              if (vendor.progression.progressionHash === Number(progressionHash)) {
                vendor.progression.progressionNomenclature = progressionNomenclatureMap[progressionHash];
              }
            })
          })
        }
      },
      error: (error) => {
        console.error('Error during API call:', error);
      }
    })
  }

  addVendorGroupNomenclatures(vendorGroups: DestinyVendorGroupModel[]) {
    return tap({
      next: (vendorGroupNomenclatureMap: {[vendorGroupHash: number]: DestinyVendorGroupNomenclature}) => {
        for (const vendorGroupHash in vendorGroupNomenclatureMap) {
          for (const vendorGroup of vendorGroups) {
            if (vendorGroup.vendorGroupHash === Number(vendorGroupHash)) {
              vendorGroup.vendorGroupNomenclature = vendorGroupNomenclatureMap[vendorGroupHash];
              break;
            }
          }
        }
      },
      error: (error) => {
        console.error('Error during API call:', error);
      }
    })
  }

  isVendorPresentInGroups(vendorGroups: DestinyVendorGroupModel[], vendorHash: number): boolean {
    for (const vendorGroup of vendorGroups) {
      if (vendorGroup.vendorHashes.includes(vendorHash)) {
        return true;
      }
    }
    return false;
  }

}
