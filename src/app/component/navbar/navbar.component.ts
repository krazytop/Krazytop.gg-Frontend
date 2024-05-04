import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {GameService} from "../game-list/game.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  regions: string[] = ['EUW'];
  selectedRegion: string = this.regions[0];
  summonerName: string = '';
  @ViewChild('summonerForm') summonerForm!: NgForm;

  constructor(private router: Router) {
  }

  redirectToSummonerPage() {
    const region = this.summonerForm.value.region;
    const name = this.summonerForm.value.name;
    this.summonerName = '';
    this.router.navigate([`/${GameService.game}/${region}/${name}/set-9.5`]) //TODO set
  }
}
