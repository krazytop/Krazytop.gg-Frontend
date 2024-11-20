import {Component, Input, OnChanges} from '@angular/core';
import {DestinyComponent} from "../destiny.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyLinkedProfilesModel} from "../../../model/destiny/destiny-linked-profiles.model";
import {DestinyPlatformEnum} from "../../../model/destiny/enum/DestinyPlatformEnum";
import {DestinyProfileModel} from "../../../model/destiny/destiny-profile.model";
import {getClassName} from "../../../model/destiny/enum/DestinyClassEnum"
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
  lastUpdate: Date = new Date();

  constructor(private router: Router, private route: ActivatedRoute, protected destinyComponent: DestinyComponent, protected timeService: TimeService) {
  }

  ngOnChanges(): void {
    this.nextAllowedUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.lastUpdate, environment.updateBungieFrequency);
    setInterval(() => {//TODO ORIGINE DU RECHARGEMENT INTEMPESTIF && supprimer setInterval quand à 0
      this.nextAllowedUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.lastUpdate, environment.updateBungieFrequency);
      //this.changeDetectorRef.markForCheck();
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
    const { paramMap, queryParamMap } = this.route.snapshot;
    const title = queryParamMap.get('hash');
    if (paramMap.get('component') === 'titles' && title) {
      this.router.navigate([`/destiny/${paramMap.get('platform')}/${paramMap.get('membership')}/${characterId}/${paramMap.get('component')}`], { queryParams: { hash: title }});
    } else {
      this.router.navigate([`/destiny/${paramMap.get('platform')}/${paramMap.get('membership')}/${characterId}/${paramMap.get('component')}`]);
    }
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly String = String;
  protected readonly getClassNameByGender = getClassName;
  protected readonly Date = Date;
}
