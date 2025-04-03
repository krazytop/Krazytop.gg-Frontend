export class LOLMasteries {
  puuid!: string;
  champions: LOLMastery[] = [];
}

export class LOLMastery {
  level!: number;
  points!: number;
  champion!: string;
  lastPlayTime!: Date;
}
