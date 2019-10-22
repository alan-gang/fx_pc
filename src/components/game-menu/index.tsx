import React, { Component, MouseEvent  } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import games, { getGameById } from '../../game/games';
import { Menu } from 'antd';
// import { ClickParam } from 'antd/lib/menu/index';
import { GameCategory, Game } from '../../typings/games';

import './index.styl';

interface State {
  offsetLeft: number;
  openKeys: string[];
  navData: GameCategory[];
}

@inject("store")
@observer
class GameMenu extends Component<Props, object> {
  rootSubmenuKeys = ['box', 'ssc', '11x5', 'pk10', 'k3'];
  MAIN_WIDTH: number = 1200;
  MENU_WIDTH: number = 200;
  menuGames: GameCategory[] = games;
  state: State;
  constructor(props: Props) {
    super(props);

    let navData: GameCategory[] = this.initSyncFavouriteStateToGames();
    navData.unshift({
      type: 'box',
      name: '收藏夹',
      items: this.props.store.game.favourites || []
    });

    this.state = {
      offsetLeft: 30,
      openKeys: ['box', 'ssc'],
      navData
    };
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
          return game;
        });
        return gameType;
      });
    }
    return this.menuGames;
  }

  render() {
    return (
      <nav className="game-menu-view" style={{left: `${this.state.offsetLeft}px`}}>
        <header className="game-menu-header txt-c">全部彩种</header>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
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
                    <NavLink to={`/game/${game.id}`}><span>{game.name}</span><span className="game-timer">00:15:36</span></NavLink>
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
