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
import {BungieAuthService} from "../../../service/destiny/bungie-auth.service";

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
  linkedProfilesToShow: DestinyLinkedProfilesModel[] = [];
  nextPossibleUpdateDate: Date = new Date();

  constructor(private router: Router, private route: ActivatedRoute, protected destinyComponent: DestinyComponent, protected timeService: TimeService, private bungieAuthService: BungieAuthService) {
    setInterval(() => {}, 1000);
  }

  ngOnChanges(): void {
    this.nextPossibleUpdateDate = new Date(new Date(this.destinyComponent.lastUpdate).getTime() + environment.updateBungieFrequency * 1000);
    this.route.params.subscribe(params => {
      this.selectedCharacterId = params['character'];
    });
    this.linkedProfilesToShow = [];
    this.profile.linkedProfiles.forEach(linkedProfile => { //TODO sortir et thiscomponent ready after
      if (linkedProfile.membershipType === 254) {
        this.bungieProfile = linkedProfile;
        this.bungieAuthService.saveLastLoggedPlayerIcon(linkedProfile.iconPath!);
      } else {
        this.linkedProfilesToShow.push(linkedProfile);
        linkedProfile.platformIcon = DestinyPlatformEnum.get(linkedProfile.membershipType);
      }
    })
  }

  selectCharacter(characterId: string) {//TODO en balise <a>
    const { paramMap, queryParamMap } = this.route.snapshot;
    const hash = queryParamMap.get('hash');
    if (paramMap.get('component') === 'titles' && hash) {
      this.router.navigate([`/destiny/${paramMap.get('platform')}/${paramMap.get('membership')}/${characterId}/${paramMap.get('component')}`], { queryParams: { hash: hash }});
    } else if (paramMap.get('component') === 'badges' && hash) {
      this.router.navigate([`/destiny/${paramMap.get('platform')}/${paramMap.get('membership')}/${characterId}/${paramMap.get('component')}`], { queryParams: { hash: hash }});
    } else {
      this.router.navigate([`/destiny/${paramMap.get('platform')}/${paramMap.get('membership')}/${characterId}/${paramMap.get('component')}`]);
    }
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly String = String;
  protected readonly getClassNameByGender = getClassName;
  protected readonly Date = Date;
}
