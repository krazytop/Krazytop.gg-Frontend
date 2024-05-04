import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  static game: String | undefined;

  initGame(game: string): void {
    GameService.game = game;
  }

}
