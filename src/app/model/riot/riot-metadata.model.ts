import {RIOTLanguage} from "./riot-language.model";

class RIOTQueueRank {
  id!: string;
  name!: string;
  isLOL!: boolean;
}

export class RIOTMetadata {
  currentLOLSeason!: number;
  currentTFTSet!: number;
  currentPatch!: string;
  allTFTPatches!: string[];
  allLOLPatches!: string[];
  allLanguages!: RIOTLanguage[];
  allRanks!: RIOTQueueRank[];
}
