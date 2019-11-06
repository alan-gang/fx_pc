import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from "react-router-dom";
import LobbyMenu from './LobbyMenu';
import LobbyGame from './LobbyGame';
import games, { getGamesByType, getAllGames } from '../../game/games';
import { Game } from '../../typings/games';

import './index.styl';

interface IProps {
  store?: any;
  gameType?: string;
}

type Props = IProps & RouteComponentProps;

interface State {
  curGameType: string;
  curGames: Game[]
}

@inject("store")
@observer
class Lobby extends Component<Props, object> {
  DEFAULT_GAME_TYPE: string = 'hot';
  state: State;
  constructor(props: Props) {
    super(props);
    let curGames = getAllGames(); // getGamesByType(this.DEFAULT_GAME_TYPE);
    // let curGames = getGamesByType(this.DEFAULT_GAME_TYPE);
    this.state = {
      curGameType: this.DEFAULT_GAME_TYPE,
      curGames
    }
  }
  goto = (path: string) => {
    this.props.history.push(path)
  }
  onMenuChanged = (type: string) => {
    this.setState({curGames: type === this.DEFAULT_GAME_TYPE ? getAllGames() : getGamesByType(type)})
  }
  render() {
    console.log(this.props.store.user.name);
    return (
      <article className="lobby-view">
        <LobbyMenu onMenuChanged={this.onMenuChanged} />
        <section className="flex lobby-game-ls">
          {this.state.curGames.map((game: Game) => (
            <LobbyGame key={game.id} gameType={this.state.curGameType} gameId={game.id} goto={this.goto}/>
          ))}
        </section>
      </article>
    )
  }
}

export default Lobby;
