import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DestinyCharacterModel} from "../../../model/destiny/destiny-character.model";
import {DestinyComponent} from "../destiny.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'destiny-profile',
  templateUrl: './destiny-profile.component.html',
  styleUrls: ['./destiny-profile.component.css']
})
export class DestinyProfileComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() characters: DestinyCharacterModel[] = [];
  //@Input() memberships: DestinyMembershipsModel[] = [];

  isThisComponentReady: boolean = false;
  selectedCharacterId: string | undefined;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, protected destinyComponent: DestinyComponent) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.route.params.subscribe(params => {
        this.selectedCharacterId = params['character'];
        this.isThisComponentReady = true; //TODO enlever si pas d appels api
      });
    }
  }

  selectCharacter(characterId: string) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${characterId}/${params['component']}`]);
    });
  }

  protected readonly DestinyComponent = DestinyComponent;
}
