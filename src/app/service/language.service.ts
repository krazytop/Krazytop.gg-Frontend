import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateService} from "@ngx-translate/core";
import {Language, SUPPORTED_LANGUAGES} from "../model/language.model";

@Injectable({ providedIn: 'root' })
export class LanguageService {

  defaultLanguage: Language = SUPPORTED_LANGUAGES[0];
  currentLanguage!: Language;
  CACHE_LANGUAGE_NAME = "language";

  constructor(public translateService: TranslateService) {
  }

  initAppLanguage() {
    this.checkAndSetLanguage(this.getLanguageFromLocalStorage());
  }

  saveLanguageToLocalStorage(language: string) {
    localStorage.setItem(this.CACHE_LANGUAGE_NAME, language);
  }

  getLanguageFromLocalStorage() {
    return localStorage.getItem(this.CACHE_LANGUAGE_NAME);
  }

  checkAndSetLanguage(language?: string | null) {
    if (!language || !SUPPORTED_LANGUAGES.find(l => l.name === language)) {
      this.saveLanguageToLocalStorage(this.defaultLanguage.name);
      this.translateService.use(this.defaultLanguage.name);
      this.currentLanguage = this.defaultLanguage;
    } else {
      this.translateService.use(language);
      this.currentLanguage = SUPPORTED_LANGUAGES.find(l => l.name === language)!;
    }
  }

  getSupportedLanguagesNames() {
    return SUPPORTED_LANGUAGES.map(l => l.name);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
