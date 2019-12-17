import { observable, action, runInAction } from "mobx";
import { Game } from '../typings/games';
import Types from './types';
import local from '../utils/local';
import APIs from '../http/APIs';
import user from './user';

interface IFaviourite {
  userName: string;
  games:  Game[];
}
class MyGame {
  @observable favourites: IFaviourite[] = local.get(Types.SET_PC_FAVOURITE_GAMES) || [];
  @observable limitLevelList: LimitLevelItem[] = [];
  @observable limitList: LimitListItem[] = local.get(Types.LOCAL_PC_FAST_SET_LIMIT_LIST) || []; // 限红
  @observable setGamesLimitLevel: GameLimitLevel[] = local.get(Types.LOCAL_PC_FAST_SET_GAMES_LIMIT_LEVEL) || [];
  @observable availableGames: number[] = [];

  hasFavouriteGame(id: number): boolean {
    let myFavourites = this.getMyFavourites();
    return !!myFavourites.find((game: Game) => game.id === id);
  }

  @action
  setFavourite(game: Game) {
    if (this.hasFavouriteGame(game.id)) return null;
    const index = this.getMyFavouritePos();
    if (index < 0) {
      if (this.favourites.length > 10) {
        this.favourites.shift();  
      }
      this.favourites.push({userName: user.name || '', games: []});
    }
    let myFavourites = this.getMyFavourites();
    myFavourites.push(game);
    this.updateMyFavourites(index, myFavourites);
  }
  
  @action
  removeFavourite(id: number) {
    if (id < 0) return null;
    const index = this.getMyFavouritePos();
    let myFavourites = this.getMyFavourites();
    for (let i = 0; i < myFavourites.length; i++) {
      if (id === myFavourites[i].id) {
        myFavourites.splice(i, 1);
        break;
      }
    }
    this.updateMyFavourites(index, myFavourites);
  }

  @action
  updateMyFavourites(index: number, myFavourites: Game[]) {
    this.favourites.splice(index, 1, {userName: user.name || '', games: myFavourites});
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  @action
  getMyFavouritePos() {
    return this.favourites.findIndex((fav) => fav.userName === user.name);
  }

  @action
  getMyFavourites() {
    const favourites = this.favourites.find((fav) => fav.userName === user.name);
    return favourites ? favourites.games : [];
  }

  @action
  replaceMyFavourites(games: Game[]) {
    const index = this.getMyFavouritePos();
    this.updateMyFavourites(index, games);
  }

  @action
  clearFavourites() {
    this.favourites = [];
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  // 根据ID获取限红项
  @action
  getLimitListItemById(id: number): LimitListItem | undefined {
    return this.limitList.find((item: LimitListItem) => id === item.id );
  }

  /**
   * 根据游戏ID，限红级别获取快钱限红范围数据
   * @param id 
   * @param level 限红级别
   */
  @action
  getKqLimitLevelItemById(id: number, level: number): LimitLevelItem | undefined {
    let curGameLimitItem = this.getLimitListItemById(id);
    if (curGameLimitItem) {
      return (curGameLimitItem.kqPrizeLimit || []).find((limitItem) => limitItem.level === level);
    }
    return;
  }

  /**
   * 获取当前游戏的快钱限红级别列表
   * @param gameId 游戏ID
   * @return LimitLevelItem[] | undefined
   */
  @action
  getLimitDataOfKqByGameId(gameId: number): LimitLevelItem[] | undefined {
    return (this.getLimitListItemById(gameId) || {}).kqPrizeLimit;
  }

  /**
   * 根据游戏ID和限红级别获取对应的限红级别数据
   * @param gameId 游戏ID
   * @param level 限红级别
   * @return LimitLevelItem | undefined
   */
  @action
  getLimitLevelData(gameId: number, level: number): LimitLevelItem | undefined {
    let LimitLevelList = this.getLimitDataOfKqByGameId(gameId) || [];
    return LimitLevelList.find((limitLevelItem: LimitLevelItem) => limitLevelItem.level === level);
  }

  @action
  updateLimitListItem(item: LimitListItem) {
    for (let i = 0; i < this.limitList.length; i++) {
      if (item.id === this.limitList[i].id) {
        this.limitList[i] = item;
        break;
      }
    }
  }

  @action
  setLimitList(items: LimitListItem[]) {
    if (!items) return;
    items.forEach((item: LimitListItem) => {
      if (this.getLimitListItemById(item.id)) {
        this.updateLimitListItem(item);
      } else {
        this.limitList.push(item);
      }
    });
    local.set(Types.LOCAL_PC_FAST_SET_LIMIT_LIST, this.limitList);
  }
  
  @action
  setLimitLevelList(limitLevels: LimitLevelItem[]) {
    this.limitLevelList = limitLevels;
  }

  @action
  getGameLimitLevelByGameId(gameId: number): GameLimitLevel | undefined {
    return this.setGamesLimitLevel.find(gll => gll.gameId === gameId);
  }

  @action
  updateGamesLimitLevel(gameLimitLevel: GameLimitLevel) {
    let gll = this.getGameLimitLevelByGameId(gameLimitLevel.gameId);
    if (gll) {
      let index = this.setGamesLimitLevel.findIndex(gll => gll.gameId === gameLimitLevel.gameId);
      this.setGamesLimitLevel.splice(index, 1, gameLimitLevel);
    } else {
      this.setGamesLimitLevel.push(gameLimitLevel);
    }
    local.set(Types.LOCAL_PC_FAST_SET_GAMES_LIMIT_LEVEL, this.setGamesLimitLevel);
  }

  @action
  hasAvailableGame(gameId: number) {
    return this.availableGames.includes(gameId);
  }

  @action
  updateAvailableGames() {
    APIs.getLotterys().then((data: any) => {
      if (data.lotteryList) {
        runInAction(() => {
          this.availableGames = data.lotteryList.map((game: any) => game.lotteryId);
        })
      }
    });
  }

  @action
  getAvailableGames(callback?: Function) {
    if (this.availableGames.length > 0) {
      callback && callback(this.availableGames.slice(0));
      return;
    }
    APIs.getLotterys().then((data: any) => {
      if (data.lotteryList) {
        runInAction(() => {
          this.availableGames = data.lotteryList.map((game: any) => game.lotteryId);
          callback && callback(this.availableGames.slice(0));
        })
      }
    });
  }
}

export default new MyGame;
