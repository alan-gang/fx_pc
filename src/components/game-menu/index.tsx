import React, { Component, MouseEvent  } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import games, { getGameById, getAllGameIds } from '../../game/games';
import { Menu } from 'antd';
// import { ClickParam } from 'antd/lib/menu/index';
import { GameCategory, Game } from '../../typings/games';
import { LOTTERY_TYPES } from '../../utils/config';
import { getGameTypeByGameId } from '../../game/games';
import Timer from '../../utils/timer';
import { timeFormat } from '../../utils/date';
import APIs from '../../http/APIs';

import './index.styl';

interface State {
  offsetLeft: number;
  openKeys: string[];
  defaultSelectedKeys: string[]; 
  navData: GameCategory[];
}

@inject("store")
@observer
class GameMenu extends Component<Props, object> {
  rootSubmenuKeys = ['box', LOTTERY_TYPES.SSC, LOTTERY_TYPES.G11X5, LOTTERY_TYPES.PK10, LOTTERY_TYPES.K3];
  MAIN_WIDTH: number = 1200;
  MENU_WIDTH: number = 200;
  DEFAULT_GAME_TYPE: string = ''; // LOTTERY_TYPES.SSC;
  menuGames: GameCategory[] = games;
  id: number;
  gameType: string;

  state: State;

  constructor(props: Props) {
    super(props);

    // let navData: GameCategory[] = this.initSyncFavouriteStateToGames();
    // navData.unshift({
    //   type: 'box',
    //   name: '收藏夹',
    //   items: this.props.store.game.favourites || []
    // });

    this.id = parseInt(this.getGameIdFromUrl() || '1', 10);
    this.gameType = getGameTypeByGameId(this.id) || this.DEFAULT_GAME_TYPE;

    this.state = {
      offsetLeft: 30,
      openKeys: ['box', this.gameType],
      defaultSelectedKeys: [String(this.id)],
      navData: []
    };

   
  }

  componentWillMount() {
    this.init();
  }

  init() {
    
    // this.clearAllTimer();
    // console.log('game-header init start=', Date.now());

    // let games = this.state.navData;
    // games.forEach((gameCategory: GameCategory) => {
    //   if (gameCategory.type === this.gameType) {
    //     gameCategory.items.forEach((game: Game) => {
    //       this.getIssueByGameId(game.id);
    //     });
    //   }
    // });

    this.props.store.game.getAvailableGames((availableGames: number[]) => {
      let navData: GameCategory[] = this.initSyncFavouriteStateToGames();
      navData.unshift({
        type: 'box',
        name: '收藏夹',
        items: this.props.store.game.favourites || []
      });
      this.setState({navData});
      this.getIssuesByGameIds(availableGames.join(','));
    });
    
    // let ids = getAllGameIds();
    // let ids = this.props.store.game.availableGames;
    // this.getIssuesByGameIds(ids.join(','));
    // console.log('game-header init end=', Date.now(), ' ids=', ids);
  }

  updateCurGameIssue(id: number, issue: any): void {
    let navData = this.state.navData;
    for (let i = 0; i < navData.length; i++) {
      for (let j = 0; j < navData[i].items.length; j++) {
        if (id === navData[i].items[j].id) {
          navData[i].items[j].issue = issue;
          break;
        }
      }  
    }
    this.setState({navData});
  }

  getGameById(id: number): Game | null {
    let navData = this.state.navData;
    for (let i = 0; i < navData.length; i++) {
      for (let j = 0; j < navData[i].items.length; j++) {
        if (id === navData[i].items[j].id) {
          return navData[i].items[j];
        }
      }  
    }
    return null;
  }

  getIssueByGameId(id: number) {
    APIs.curIssue({gameid: id}).then((data: any) => {
      if (data.success > 0) {
        data.remainTime = data.saleend - data.current;
        data.timeStr = timeFormat(data.remainTime);
        this.updateCurGameIssue(id, data);
        this.initCountDown(id);
      }
    });
  }

  getIssuesByGameIds(ids: string) {
    APIs.getIssuesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        data.items.forEach((issue: any) => {
          issue.remainTime = issue.saleend - data.current;
          issue.timeStr = timeFormat(issue.remainTime);
          this.updateCurGameIssue(issue.lotteryid, issue);
          this.initCountDown(issue.lotteryid);
        })
      }
    });
  }

  initCountDown(id: number): void {
    let game = this.getGameById(id);
    let issue = game && game.issue;
    if (issue) {
      if (issue.timer) {
        issue.timer.close();
      }
      issue.timer = new Timer(Math.floor(issue.remainTime / 1000), (t: number): void => {
        if (t <= 0) {
          this.getIssueByGameId(id);
        }
        issue.remainTime = Math.floor(t * 1000);
        issue.timeStr = timeFormat(t * 1000);
        this.updateCurGameIssue(id, issue);
      });
    }
  }

  clearAllTimer(): void {
    let navData = this.state.navData;
    let box = navData.shift();
    navData = games.map((gameCategory: GameCategory) => {
      gameCategory.items = gameCategory.items.map((game: Game) => {
        if (game.issue && game.issue.timer) {
          game.issue.timer.close();
          game.issue.timer = null;
        }
        return game;
      });
      return gameCategory;
    })
    if (box) navData.unshift(box);
    this.setState({navData});
  }

  componentDidMount() {
    this.updatePosition();
    window.addEventListener('resize', () => {
      this.updatePosition();
    }, false);
  }

  updatePosition() {
    this.setState({
      offsetLeft: (document.documentElement.clientWidth - this.MAIN_WIDTH) / 2 - this.MENU_WIDTH > 0 ? (document.documentElement.clientWidth - this.MAIN_WIDTH) / 2 - this.MENU_WIDTH - 10 : 0
    });
  }

  onOpenChange = (openKeys: string[]) => {
    const latestOpenKey: string = openKeys.find(key => this.state.openKeys.indexOf(key) === -1) || '';
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
    this.gameType = latestOpenKey;
    setTimeout(() => {
      this.clearAllTimer();
      this.init();
    }, 0);
  };

  // onMenuItemHandler = ({ item, key, keyPath, domEvent }: ClickParam) => {
  //   console.log('item=', item, 'key=', key, 'keyPath=', keyPath, 'domEvent=', domEvent, domEvent.target);
  // }

  onAddFavourite = (id: number, type: string, event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    let game: Game | null = getGameById(id);
    if (!!game) {
      if (type === 'box') {
        game.favourite = false;
        this.props.store.game.removeFavourite(id);
      } else {
        game.favourite = true;
        this.props.store.game.setFavourite(game);
      }
      let nav = this.state.navData[0];
      nav.items = this.props.store.game.favourites || [];
      this.state.navData[0] = nav;
      this.setState({navData: this.state.navData});
    }
  }

  initSyncFavouriteStateToGames() {
    let fav = this.props.store.game.favourites || [];
    for (let i = 0; i < fav.length; i++) {
      this.menuGames = this.menuGames.map((gameType) => {
        gameType.items = gameType.items.map((game) => {
          if (fav[i].id === game.id) {
            game.favourite = true;
          }
          if (!this.props.store.game.hasAvailableGame(game.id)) {
            game.available = false;
          }
          return game;
        });
        gameType.items = gameType.items.filter((game) => game.available !== false);
        return gameType;
      });
    }
    return this.menuGames;
  }

  getGameIdFromUrl() {
    let hash: string = window.location.hash;
    let pos: number = hash.indexOf('?');
    if (pos >= 0) {
      hash.substring(0, pos);
    }
    return hash.substring(hash.lastIndexOf('/') + 1, hash.length);
  }

  render() {
    return (
      <nav className="game-menu-view" style={{left: `${this.state.offsetLeft}px`}}>
        <header className="game-menu-header txt-c">全部彩种</header>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          onOpenChange={this.onOpenChange}
          // onClick={this.onMenuItemHandler}
          style={{ width: 200 }}
          subMenuCloseDelay={0}
          subMenuOpenDelay={0}
        >
          {this.state.navData.map((gameCate) => (
            <Menu.SubMenu
              key={gameCate.type}
              className={`sub-menu-${gameCate.type}`}
              title={
                <span>
                  <i className={`game-type-icon icon-${gameCate.type}`}></i>
                  <span>{gameCate.name}</span>
                </span>
              }
            >
              {gameCate.items.map((game) => (
                <Menu.Item key={game.id} className="game-menu-item">
                  <span className="nav-link-wp">
                    <NavLink to={`/game/${game.id}`}><span>{game.name}</span><span className="game-timer">{game.issue && game.issue.timeStr}</span></NavLink>
                  </span>
                  <span className={`favourite ${game.favourite ? 'selected' : ''}`} onClick={(e: any) => this.onAddFavourite(game.id, gameCate.type, e)}></span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu>
      </nav>
    )
  }
}

export default GameMenu;
