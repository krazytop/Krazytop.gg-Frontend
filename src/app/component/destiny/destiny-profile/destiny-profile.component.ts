import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DestinyCharacterModel} from "../../../model/destiny/destiny-character.model";
import {DestinyComponent} from "../destiny.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {DestinyClassNomenclature} from "../../../model/destiny/nomenclature/destiny-class.nomenclature";
import {HeaderService} from "../../../config/headers.service";
import {DestinyLinkedProfilesModel} from "../../../model/destiny/destiny-linked-profiles.model";
import {PlatformEnum} from "../../../model/destiny/enum/PlatformEnum";
import {DestinyProfileModel} from "../../../model/destiny/destiny-profile.model";
import {DestinyRecordNomenclature} from "../../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyDataStorage} from "../DestinyDataStorage";

@Component({
  selector: 'destiny-profile',
  templateUrl: './destiny-profile.component.html',
  styleUrls: ['./destiny-profile.component.css']
})
export class DestinyProfileComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() profile!: DestinyProfileModel;

  selectedCharacterId: string | undefined;
  bungieProfile: DestinyLinkedProfilesModel | undefined;

  linkedProfilesToShow: DestinyLinkedProfilesModel[] = [];

  constructor(private router: Router, private route: ActivatedRoute, protected destinyComponent: DestinyComponent, protected dataStorage: DestinyDataStorage) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.route.params.subscribe(params => {
        this.selectedCharacterId = params['character'];
      });
      this.profile.linkedProfiles.forEach(linkedProfile => { //TODO sortir et thiscomponent ready after
        if (linkedProfile.membershipType === 254) {
          this.bungieProfile = linkedProfile;
        } else {
          this.linkedProfilesToShow.push(linkedProfile);
          linkedProfile.platformIcon = PlatformEnum.get(linkedProfile.membershipType);
        }
      })
    }
  }

  selectCharacter(characterId: string) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${characterId}/${params['component']}`]);
    });
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly String = String;
}
