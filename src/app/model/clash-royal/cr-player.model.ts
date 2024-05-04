import {CRClan} from "./cr-clan.model";
import {CRArena} from "./cr-arena.model";
import {CRBadge} from "./cr-badge.model";
import {CRCard} from "./cr-card.model";
import {CRAccountLevel} from "./cr-account-level.model";
import {CRLeagues} from "./cr-leagues.model";
import {CRTrophies} from "./cr-trophies.model";
import {CRChest} from "./cr-chest.model";

export class CRPlayer {
  id?: string;
  name?: string;
  starPoints?: string;
  bestTrophies?: number;
  wins?: number;
  losses?: number;
  threeCrownWins?: number;
  challengeCardsWon?: number;
  clanWarCardsWon?: number;
  clan?: CRClan;
  arena?: CRArena;
  badges?: CRBadge[];
  totalDonations?: number;
  cards?: CRCard[];
  currentDeck?: CRCard[];
  currentFavouriteCard?: CRCard;
  updateDate?: Date;
  accountLevel?: CRAccountLevel;
  seasonsLeagues?: CRLeagues;
  seasonsTrophies?: CRTrophies;
  upcomingChests?: CRChest[];
}
