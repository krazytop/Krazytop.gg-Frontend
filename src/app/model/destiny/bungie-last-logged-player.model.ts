export class BungieLastLoggedPlayerModel {

  constructor(playerName: string, membershipId: string, characterId: string, membershipType: number, icon?: string) {
    this.playerName = playerName;
    this.membershipId = membershipId;
    this.characterId = characterId;
    this.membershipType = membershipType;
    this.icon = icon;
  }

  playerName?: string;
  membershipId?: string;
  characterId?: string;
  membershipType?: number;
  icon?: string;
}
