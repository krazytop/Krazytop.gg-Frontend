import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import {LanguageService} from "../app/service/language.service";
import {SUPPORTED_LANGUAGES} from "../app/model/language.model";

class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): any {
    return of({}); // Retourne un observable vide. Adaptez si vous avez besoin de clés spécifiques.
  }
}

const mockInnerTranslateService = {
  get: (key: string | Array<string>, interpolateParams?: Object) => of(key), // Retourne la clé elle-même ou un mock de traduction
  // Ajoutez d'autres méthodes si elles sont utilisées par LanguageService
  // currentLang: 'en',
  // onLangChange: of({ lang: 'en' }),
};


const mockLanguageService = {
  currentLanguage: SUPPORTED_LANGUAGES[0],
  defaultLanguage: SUPPORTED_LANGUAGES[0],
  translateService: mockInnerTranslateService,
  // Si LanguageService a des méthodes appelées, moquez-les ici
  // changeLanguage: (lang: string) => {}
};


@NgModule({
  imports: [
    HttpClientTestingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      }
    })
  ],
  exports: [
    TranslateModule,
    HttpClientTestingModule
  ],
  providers: [
    { provide: LanguageService, useValue: mockLanguageService },
  ]
})
export class TranslateTestingModule {}
