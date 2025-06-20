import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateService} from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class CustomTranslateService {

  availableLangs: string[] = ['Français', 'English'];

  defaultLanguage = this.availableLangs[0];
  CACHE_LANGUAGE_NAME = "language";

  constructor(public translateService: TranslateService) {
    this.checkAndSetLanguage(this.getLanguageFromLocalStorage());
  }

  saveLanguageToLocalStorage(language: string) {
    localStorage.setItem(this.CACHE_LANGUAGE_NAME, language);
  }

  getLanguageFromLocalStorage() {
    return localStorage.getItem(this.CACHE_LANGUAGE_NAME);
  }

  checkAndSetLanguage(language?: string | null) {
    if (!language || !this.availableLangs.find(l => l === language)) {
      this.saveLanguageToLocalStorage(this.defaultLanguage);
      this.translateService.use(this.defaultLanguage);
    } else {
      this.translateService.use(language);
    }
  }

}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
