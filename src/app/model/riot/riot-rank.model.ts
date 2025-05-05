export class RIOTRank {
  summonerId!: string;
  seasonOrSetRanks!: RIOTSeasonOrSetRanks[];
}

export class RIOTSeasonOrSetRanks {
  nb!: number;
  queueRanks!: RIOTQueueRanks[];
}

export class RIOTQueueRanks {
  name!: string;
  rankInformations!: RIOTRankInformations[];
}

export class RIOTRankInformations {
  tier!: string;
  rank!: string;
  leaguePoints!: number;
  date!: Date;
  wins!: number;
  losses!: number;
}
