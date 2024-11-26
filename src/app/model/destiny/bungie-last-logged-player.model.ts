export class BungieLastLoggedPlayerModel {

  constructor(playerName: string, membershipId: string, characterId: string, membershipType: number) {
    this.playerName = playerName;
    this.membershipId = membershipId;
    this.characterId = characterId;
    this.membershipType = membershipType;
  }

  playerName?: string;
  membershipId?: string;
  characterId?: string;
  membershipType?: number;
}
