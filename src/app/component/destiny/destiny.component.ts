import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyCharacterModel} from "../../model/destiny/destiny-character.model";
import {BungieAuthService} from "./bungie-authentification/bungie-auth.service";
import {catchError, concatMap, filter, Observable, of, Subject, tap} from "rxjs";
import {DestinyClassNomenclature} from "../../model/destiny/destiny-class.nomenclature";
import {HeaderService} from "../../config/headers.service";
import {HttpClient} from "@angular/common/http";

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
  characters: DestinyCharacterModel[] = [];
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
        this.bungieAuthService.checkTokenValidity()
          .pipe(
            concatMap(() => this.bungieAuthService.getCharactersFromMembership(platform!, membership!)),
            catchError(error => {
              console.error('Error fetching characters:', error);
              return of([]);
            })
          )
          .subscribe(characters => {
            if (characters.length === 0) {
              console.log("Need at least one character");
              this.router.navigate(['/']);
            } else {
              this.getCharacterClass(characters).subscribe(() => {
                this.isThisComponentReady = true;
              });
            }
          });
      }
    });
    if (this.isFirstDisplay) {
      this.refreshData();
      this.isFirstDisplay = false;
    }
  }

  refreshData() {
    this.requestDataRefreshing.next(true);
  }

  ngOnDestroy() {
    this.requestDataRefreshing.unsubscribe();
  }

  getCharacterClass(characters: DestinyCharacterModel[]): Observable<{[classHash: number]: DestinyClassNomenclature}> {
    const classHashList: number[] = [];
    characters.forEach(character => classHashList.push(character.classHash));
    return this.http.post<{[classHash: number]: DestinyClassNomenclature}>(
      'http://localhost:8080/destiny/class',
      classHashList,
      { headers: HeaderService.getHeaders() }
    ).pipe(
      tap({
        next: (classNomenclatureMap: {[classHash: number]: DestinyClassNomenclature}) => {
          for (const classHash in classNomenclatureMap) {
            const character = characters.find(c => c.classHash === Number(classHash));
            character!.classNomenclature = classNomenclatureMap[classHash];
          }
          this.characters = characters;
        },
        error: (error) => {
          console.error('Error during API call:', error);
        }
      })
    );
  }

}
