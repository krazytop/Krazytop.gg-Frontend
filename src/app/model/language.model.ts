export interface Language {
  name: string;
  riotPatchPath: string;
  destinyPatchPath: string;
}
export const SUPPORTED_LANGUAGES: Language[] = [
  {
    name: "Français",
    riotPatchPath: "fr_FR",
    destinyPatchPath: "fr",
  },
  {
    name: "English",
    riotPatchPath: "en_GB",
    destinyPatchPath: "en",
  },
];
