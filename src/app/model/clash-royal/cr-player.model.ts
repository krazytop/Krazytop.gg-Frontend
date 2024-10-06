import {CRClan} from "./cr-clan.model";
import {CRBadge} from "./cr-badge.model";
import {CRCard} from "./cr-card.model";
import {CRAccountLevelNomenclature} from "./nomenclature/cr-account-level.nomenclature";
import {CRLeagues} from "./cr-leagues.model";
import {CRTrophies} from "./cr-trophies.model";
import {CRChest} from "./cr-chest.model";
import {CRArenaNomenclature} from "./nomenclature/cr-arena.nomenclature";

export class CRPlayer {
  id!: string;
  name!: string;
  starPoints!: string;
  expPoints!: number;
  bestTrophies!: number;
  wins!: number;
  losses!: number;
  threeCrownWins!: number;
  challengeCardsWon!: number;
  clanWarCardsWon!: number;
  totalDonations?: number;
  clan!: CRClan;
  arenaNomenclature!: CRArenaNomenclature;
  badges!: CRBadge[];
  cards!: CRCard[];
  currentDeck!: CRCard[];
  currentFavouriteCard!: CRCard;
  updateDate!: Date;
  accountLevelNomenclature!: CRAccountLevelNomenclature;
  seasonsLeagues!: CRLeagues;
  seasonsTrophies!: CRTrophies;
  upcomingChests!: CRChest[];
}
