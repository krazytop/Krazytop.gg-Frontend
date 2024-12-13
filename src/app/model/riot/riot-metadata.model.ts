class RIOTQueueRank {
  id!: string;
  name!: string;
  isLOL!: boolean;
}

export class RIOTMetadata {
  currentLOLSeason!: number;
  currentTFTSet!: number;
  ranks!: RIOTQueueRank[];
}
