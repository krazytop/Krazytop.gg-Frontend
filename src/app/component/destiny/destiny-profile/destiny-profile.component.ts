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

@Component({
  selector: 'destiny-profile',
  templateUrl: './destiny-profile.component.html',
  styleUrls: ['./destiny-profile.component.css']
})
export class DestinyProfileComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() characters: DestinyCharacterModel[] = [];
  @Input() linkedProfiles: DestinyLinkedProfilesModel[] = [];
  //@Input() memberships: DestinyMembershipsModel[] = [];

  isThisComponentReady: boolean = false;
  selectedCharacterId: string | undefined;
  bungieProfile: DestinyLinkedProfilesModel | undefined;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, protected destinyComponent: DestinyComponent) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.route.params.subscribe(params => {
        this.selectedCharacterId = params['character'];
      });
      this.linkedProfiles.forEach(linkedProfile => { //TODO sortir et thiscomponent ready after
        if (linkedProfile.membershipType === 254) {
          this.bungieProfile = linkedProfile;
          this.linkedProfiles = this.linkedProfiles.filter(profile => profile != linkedProfile);
        } else {
          linkedProfile.platformIcon = PlatformEnum.get(linkedProfile.membershipType);
        }
      })
      this.getCharacterClassNomenclature(this.characters).subscribe(() => {
        this.isThisComponentReady = true;
      });
    }
  }

  selectCharacter(characterId: string) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${characterId}/${params['component']}`]);
    });
  }

  getCharacterClassNomenclature(characters: DestinyCharacterModel[]): Observable<{[classHash: number]: DestinyClassNomenclature}> {
    const classHashList: number[] = Array.from(new Set(characters.map(character => character.classHash)));
    return this.http.post<{[classHash: number]: DestinyClassNomenclature}>(
      'http://localhost:8080/destiny/class', classHashList, { headers: HeaderService.getHeaders() }
    ).pipe(
      tap(classNomenclatureMap => {
        characters.forEach(character => character.classNomenclature = classNomenclatureMap[character.classHash])
      })
    );
  }

  protected readonly DestinyComponent = DestinyComponent;
}
