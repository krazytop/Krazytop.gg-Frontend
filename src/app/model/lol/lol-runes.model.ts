export class LOLRunes {
  stats!: {[key: string]: number};
  runeCategories!: LOLRuneCategory[];
}

export class LOLRuneCategory {
  style!: string;
  perks!: string[];
}
