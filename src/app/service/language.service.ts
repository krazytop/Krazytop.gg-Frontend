import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../environments/environment";
import {HTTPRequestService} from "../config/http-request.service";
import {Language} from "../model/language.model";

@Injectable({ providedIn: 'root' })
export class LanguageService {

  supportedLanguages: Language[] = [];

  defaultLanguage: Language = this.supportedLanguages[0];
  currentLanguage!: Language;
  CACHE_LANGUAGE_NAME = "language";

  constructor(public translateService: TranslateService, private httpRequestService: HTTPRequestService) {
  }

  initAppLanguage() {
    this.checkAndSetLanguage(this.getLanguageFromLocalStorage());
  }

  async getAllSupportedLanguages() {//TODO faire mieux pour ne pas avoir à faire un appel http mais mettre dans le swagger (map, list ?)
    const response = await fetch(`${environment.apiURL}language`, {headers: HTTPRequestService.getBackendHeaders()});
    this.supportedLanguages = await this.httpRequestService.hasResponse(response) ? await response.json() as Language[]: [];
  }

  saveLanguageToLocalStorage(language: string) {
    localStorage.setItem(this.CACHE_LANGUAGE_NAME, language);
  }

  getLanguageFromLocalStorage() {
    return localStorage.getItem(this.CACHE_LANGUAGE_NAME);
  }

  checkAndSetLanguage(language?: string | null) {
    if (!language || !this.supportedLanguages.find(l => l.name === language)) {
      this.saveLanguageToLocalStorage(this.defaultLanguage.name);
      this.translateService.use(this.defaultLanguage.name);
      this.currentLanguage = this.defaultLanguage;
    } else {
      this.translateService.use(language);
      this.currentLanguage = this.supportedLanguages.find(l => l.name === language)!;
    }
  }

  getSupportedLanguagesNames() {
    return this.supportedLanguages.map(l => l.name);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
