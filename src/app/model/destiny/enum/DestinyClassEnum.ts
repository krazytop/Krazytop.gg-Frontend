const DestinyClassEnum: {[index: number]:any} = {
  671679327: {
    genders: {
      2204441813: "Chasseuse",
      3111576190: "Chasseur"
    },
    image: 'hunter.png'
  },
  2271682572: {
    genders: {
      2204441813: "Arcaniste",
      3111576190: "Arcaniste"
    },
    image: 'warlock.png'
  },
  3655393761: {
    genders: {
      2204441813: "Titan",
      3111576190: "Titan"
    },
    image: 'titan.png'
  }
}

export function getClassNameByGender(classHash: number, genderHash: number): string {
  return DestinyClassEnum[classHash]['genders'][genderHash];
}

export function getImageByClassHash(classHash: number): string {
  return DestinyClassEnum[classHash]['image'];
}
