import { observable, action } from "mobx";
import { Game } from '../typings/games';
import Types from './types';
import local from '../utils/local';

class MyGame {
  @observable favourites: Game[] = local.get(Types.SET_PC_FAVOURITE_GAMES) || [];

  hasGame(id: number): boolean {
    return !!this.favourites.find((game: Game) => game.id === id);
  }

  @action
  setFavourite(game: Game) {
    if (this.hasGame(game.id)) {
      return null;
    }
    this.favourites.push(game);
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  @action
  removeFavourite(id: number) {
    if (id < 0) return null;
    for (let i = 0; i < this.favourites.length; i++) {
      if (id === this.favourites[i].id) {
        this.favourites.splice(i, 1);
        break;
      }
    }
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  @action
  clearFavourites() {
    this.favourites = [];
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }
}

export default new MyGame;
