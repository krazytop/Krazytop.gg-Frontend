const DestinyClassEnum: {[index: number]:any} = {
  671679327: {
    2204441813: "Chasseuse",
    3111576190: "Chasseur"
  },
  2271682572: {
    2204441813: "Arcaniste",
    3111576190: "Arcaniste"
  },
  3655393761: {
    2204441813: "Titan",
    3111576190: "Titan"
  }
}

export function getClassNameByGender(classHash: number, genderHash: number): string {
  return DestinyClassEnum[classHash][genderHash];
}
