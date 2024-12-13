export class RIOTRank {
  puuid!: string;
  ranks!: RanksJson;
}

export class RIOTRankInformations {
  tier!: string;
  rank!: string;
  leaguePoints!: number;
  date!: Date;
  wins!: number;
  losses!: number;
}

export type RanksJson = {
  [seasonOrSet: number]: {
    [queueId: string]: RIOTRankInformations[];
  };
};
