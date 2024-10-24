import {DestinyCharacterModel} from "../destiny-character.model";

const DestinyClassEnum: {[index: number]:any} = {
  671679327: {
    genders: {
      2204441813: "Chasseuse",
      3111576190: "Chasseur"
    },
    image: 'hunter.png',
    classType: 1
  },
  2271682572: {
    genders: {
      2204441813: "Arcaniste",
      3111576190: "Arcaniste"
    },
    image: 'warlock.png',
    classType: 2
  },
  3655393761: {
    genders: {
      2204441813: "Titan",
      3111576190: "Titan"
    },
    image: 'titan.png',
    classType: 0
  }
}

export function getClassName(characters: DestinyCharacterModel[], characterId: string): string {
  const character = characters.find(character => character.characterId === characterId);
  return DestinyClassEnum[character!.classHash]['genders'][character!.genderHash];
}

export function getClassImage(characters: DestinyCharacterModel[], characterId: string): string {
  const character = characters.find(character => character.characterId === characterId);
  return DestinyClassEnum[character!.classHash]['image'];
}

export function getClassImageByClassType(classType: number): string | undefined {
  for (const key in DestinyClassEnum) {
    if (DestinyClassEnum[key].classType === classType) {
      return DestinyClassEnum[key].image;
    }
  }
  return undefined;
}
