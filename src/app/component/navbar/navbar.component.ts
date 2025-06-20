import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {CustomTranslateService} from "../../service/custom-translate.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, protected customTranslateService: CustomTranslateService) {}

  currentGame?: string

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof ActivationEnd),
        map(() => this.route.firstChild),
        map(route => route ? route.snapshot.url.map(segment => segment.path).join('/') : '')
      )
      .subscribe(path => {
        if (this.checkPath(path, 'lol')) {
          this.currentGame = 'lol';
        } else if (this.checkPath(path, 'tft')) {
          this.currentGame = 'tft';
        } else if (this.checkPath(path, 'destiny') || this.checkPath(path, 'bungie')) {
          this.currentGame = 'destiny';
        } else if (this.checkPath(path, 'clash-royal')) {
          this.currentGame = 'clash-royal';
        }
      });
  }

  checkPath(path: string, game: string): boolean {
    return (path.startsWith(game) && path.length === game.length) || path.startsWith(`${game}/`);
  }

  changeLanguage(newLanguage: string) {
    this.customTranslateService.saveLanguageToLocalStorage(newLanguage);
    window.location.reload();
  }

  protected readonly Object = Object;
}
