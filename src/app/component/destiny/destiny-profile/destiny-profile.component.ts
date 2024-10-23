import {Component, Input, OnChanges} from '@angular/core';
import {DestinyComponent} from "../destiny.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyLinkedProfilesModel} from "../../../model/destiny/destiny-linked-profiles.model";
import {DestinyPlatformEnum} from "../../../model/destiny/enum/DestinyPlatformEnum";
import {DestinyProfileModel} from "../../../model/destiny/destiny-profile.model";
import {getClassNameByGender} from "../../../model/destiny/enum/DestinyClassEnum"
import {DestinyRecordNomenclature} from "../../../model/destiny/nomenclature/destiny-record.nomenclature";
import {TimeService} from "../../../service/time.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'destiny-profile',
  templateUrl: './destiny-profile.component.html',
  styleUrls: ['./destiny-profile.component.css']
})
export class DestinyProfileComponent implements OnChanges {

  @Input() profile!: DestinyProfileModel;
  @Input() characterTitleNomenclatures!: Map<number, DestinyRecordNomenclature>;

  selectedCharacterId: string | undefined;
  bungieProfile: DestinyLinkedProfilesModel | undefined;
  nextAllowedUpdate: number = 0;
  linkedProfilesToShow: DestinyLinkedProfilesModel[] = [];

  constructor(private router: Router, private route: ActivatedRoute, protected destinyComponent: DestinyComponent, protected timeService: TimeService) {
  }

  ngOnChanges(): void {
    this.nextAllowedUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.destinyComponent.lastUpdate, environment.updateBungieFrequency);
    setInterval(() => {
      this.nextAllowedUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.destinyComponent.lastUpdate, environment.updateBungieFrequency);
    }, 1000);
    this.route.params.subscribe(params => {
      this.selectedCharacterId = params['character'];
    });
    this.linkedProfilesToShow = [];
    this.profile.linkedProfiles.forEach(linkedProfile => { //TODO sortir et thiscomponent ready after
      if (linkedProfile.membershipType === 254) {
        this.bungieProfile = linkedProfile;
      } else {
        this.linkedProfilesToShow.push(linkedProfile);
        linkedProfile.platformIcon = DestinyPlatformEnum.get(linkedProfile.membershipType);
      }
    })
  }

  selectCharacter(characterId: string) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${characterId}/${params['component']}`]);
    });
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly String = String;
  protected readonly getClassNameByGender = getClassNameByGender;
  protected readonly Date = Date;
}
