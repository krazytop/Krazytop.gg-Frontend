import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../config/headers.service";
import {GameService} from "./game-list/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Krazytop-front';
  apiKey: string = '';
  protected readonly GameService = GameService;

  constructor(private http: HttpClient, private headers: HeaderService) {
  }

  ngOnInit() {
    this.http.get<string>('http://localhost:8080/riot/api-key', {headers: HeaderService.getHeaders(),}).subscribe(apiKey => {
      this.apiKey = apiKey;
    });
  }
}
