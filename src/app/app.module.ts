import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './component/app.component';
import {RiotSummonerComponent} from './component/riot/riot-summoner/riot-summoner.component';
import {HttpClientModule} from '@angular/common/http';
import {NgOptimizedImage} from "@angular/common";
import {TftMatchComponent} from './component/tft/tft-match/tft-match.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {AppRoutingModule} from "./app-routing.module";
import {TeamfightTacticsComponent} from './component/tft/teamfight-tactics.component';
import {LeagueOfLegendsComponent} from './component/lol/league-of-legends.component';
import {TftMatchUnitComponent} from './component/tft/tft-match/tft-match-unit/tft-match-unit.component';
import {TftLatestMatchesPlacementComponent} from './component/tft/tft-stats/tft-latest-matches-placement/tft-latest-matches-placement.component';
import {GameListComponent} from './component/game-list/game-list.component';
import {FormsModule} from "@angular/forms";
import {TftSearchCriteriaComponent} from './component/tft/tft-search-criteria/tft-search-criteria.component';
import { ClashRoyalComponent } from './component/clash_royal/clash-royal.component';
import { CrPlayerComponent } from './component/clash_royal/cr-player/cr-player.component';
import { CrTabSelectorComponent } from './component/clash_royal/cr-tab-selector/cr-tab-selector.component';
import { CrCardsComponent } from './component/clash_royal/cr-cards/cr-cards.component';
import { CrRankingComponent } from './component/clash_royal/cr-ranking/cr-ranking.component';
import { CrChestsComponent } from './component/clash_royal/cr-chests/cr-chests.component';
import { CrBadgesComponent } from './component/clash_royal/cr-badges/cr-badges.component';
import { RiotMatchesComponent } from './component/riot/riot-matches/riot-matches.component';
import { RiotRankingComponent } from './component/riot/riot-ranking/riot-ranking.component';
import { LolLatestMatchesPlacementComponent } from './component/lol/lol-stats/lol-latest-matches-placement/lol-latest-matches-placement.component';
import { LolSearchCriteriaComponent } from './component/lol/lol-search-criteria/lol-search-criteria.component';
import { LolMatchComponent } from './component/lol/lol-match/lol-match.component';
import { LolMatchParticipantComponent } from './component/lol/lol-match/lol-match-participant/lol-match-participant.component';
import { BungieAuthComponent } from './component/destiny/bungie-authentification/bungie-auth.component';
import { DestinyCollectionsComponent } from './component/destiny/destiny-collections/destiny-collections.component';
import { DestinyVendorsComponent } from './component/destiny/destiny-vendors/destiny-vendors.component';
import { DestinyProfileComponent } from './component/destiny/destiny-profile/destiny-profile.component';
import { DestinyComponent } from './component/destiny/destiny.component';
import { DestinyVendorComponent } from './component/destiny/destiny-vendors/destiny-vendor/destiny-vendor.component';
import { DestinyComponentSelectorComponent } from './component/destiny/destiny-component-selector/destiny-component-selector.component';
import { DestinyPostmasterComponent } from './component/destiny/destiny-postmaster/destiny-postmaster.component';
import { DestinyItemComponent } from './component/destiny/destiny-item/destiny-item.component';
import { AlertComponent } from './component/alert/alert.component';
import { DestinyMainInventoryComponent } from './component/destiny/destiny-main-inventory/destiny-main-inventory.component';
import { DestinyTitlesComponent } from './component/destiny/destiny-titles/destiny-titles.component';
import { DestinyTitleComponent } from './component/destiny/destiny-titles/destiny-title/destiny-title.component';
import { DestinyBadgesComponent } from './component/destiny/destiny-badges/destiny-badges.component';
import { DestinyCharactersComponent } from './component/destiny/destiny-characters/destiny-characters.component';
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {DestinyCatalystsComponent} from "./component/destiny/destiny-catalysts/destiny-catalysts.component";
import {DestinyRecordComponent} from "./component/destiny/destiny-record/destiny-record.component";
import { DestinyModelsComponent } from './component/destiny/destiny-models/destiny-models.component';
import { LOLMainChampionsComponent } from './component/lol/lol-stats/lol-main-champions/lol-main-champions.component';
import { LOLMainFriendsComponent } from './component/lol/lol-stats/lol-main-friends/lol-main-friends.component';
import { LOLMainMasteriesComponent } from './component/lol/lol-stats/lol-main-masteries/lol-main-masteries.component';
import { ToggleSwitchComponent } from './ui/toggle-switch/toggle-switch.component';
import { DestinyCharacterItemFiltersComponent } from './component/destiny/destiny-characters/destiny-character-item-filters/destiny-character-item-filters.component';
import { RequestButtonComponent } from './ui/request-button/request-button.component';
import { LoadingScreenComponent } from './ui/loading-screen/loading-screen.component';
import { ProgressBarComponent } from './ui/progression-bar/progress-bar.component';
import { DestinyBadgeComponent } from './component/destiny/destiny-badges/destiny-badge/destiny-badge.component';
import { DestinyCollectibleComponent } from './component/destiny/destiny-collectible/destiny-collectible.component';
import { DestinyBadgePreviewComponent } from './component/destiny/destiny-badges/destiny-badge-preview/destiny-badge-preview.component';
import { DestinyTitlePreviewComponent } from './component/destiny/destiny-titles/destiny-title-preview/destiny-title-preview.component';
import { DropdownComponent } from './ui/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    RiotSummonerComponent,
    TftMatchComponent,
    NavbarComponent,
    TeamfightTacticsComponent,
    LeagueOfLegendsComponent,
    TftMatchUnitComponent,
    TftLatestMatchesPlacementComponent,
    GameListComponent,
    TftSearchCriteriaComponent,
    ClashRoyalComponent,
    CrPlayerComponent,
    CrTabSelectorComponent,
    CrCardsComponent,
    CrRankingComponent,
    CrChestsComponent,
    CrBadgesComponent,
    RiotMatchesComponent,
    RiotRankingComponent,
    LolLatestMatchesPlacementComponent,
    LolSearchCriteriaComponent,
    LolMatchComponent,
    LolMatchParticipantComponent,
    BungieAuthComponent,
    DestinyCollectionsComponent,
    DestinyVendorsComponent,
    DestinyProfileComponent,
    DestinyComponent,
    DestinyVendorComponent,
    DestinyComponentSelectorComponent,
    DestinyPostmasterComponent,
    DestinyItemComponent,
    AlertComponent,
    DestinyMainInventoryComponent,
    DestinyTitlesComponent,
    DestinyTitleComponent,
    DestinyBadgesComponent,
    DestinyCharactersComponent,
    DestinyCatalystsComponent,
    DestinyRecordComponent,
    DestinyModelsComponent,
    LOLMainChampionsComponent,
    LOLMainFriendsComponent,
    LOLMainMasteriesComponent,
    ToggleSwitchComponent,
    DestinyCharacterItemFiltersComponent,
    RequestButtonComponent,
    LoadingScreenComponent,
    ProgressBarComponent,
    DestinyBadgeComponent,
    DestinyCollectibleComponent,
    DestinyBadgePreviewComponent,
    DestinyTitlePreviewComponent,
    DropdownComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgOptimizedImage,
        AppRoutingModule,
        FormsModule,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup,
        CdkDragHandle,
        CdkDragPreview
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
