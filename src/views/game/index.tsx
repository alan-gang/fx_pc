import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameHeader from 'comp/game-header';
import MethodMenu from 'comp/method-menu';
import Play from 'comp/play';
import { RouteComponentProps } from "react-router-dom";
import { getGameTypeByGameId } from '../../game/games';
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';

import './index.styl';

interface IProps {
  store?: any;
  gameType?: string;
}

interface State {
  id: number;
  gameType: string;
  curIssue: number;
  lastIssue: number;
  curTime: number;
  openNumbers: string[];
  numCss: string;
  methodIds: string[];
}

interface MatchParams {
  id: string;
}

type Props = IProps & RouteComponentProps<MatchParams>;

@inject("store")
@observer
class Game extends Component<Props, object> {
  id: number = 1;
  gameType: string = 'ssc';
  // curIssue: number = 1231242121;
  // lastIssue: number = 123124120;
  // curTime: number = 1571212837157;
  // openNumbers: string[] = ['0', '5', '7', '2', '2'];
  // numCss: string = '';
  // methodIds: string[] = [];
  state: State;
  constructor(props: Props) {
    super(props);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    this.state = {
      id: 1,
      gameType: 'ssc',
      curIssue: 1231242121,
      lastIssue: 123124120,
      curTime: 1571212837157,
      openNumbers: ['0', '5', '7', '2', '2'],
      numCss: '',
      methodIds: (menus && menus[0].ids) || []
    }
  }
  updateMethodIds = (methodIds: string[]) => {
    this.setState({methodIds});
  }
  render() {
    this.id = parseInt(this.props.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    console.log('id=', this.id)
    return (
      <article className="game-view">
        <GameHeader 
          gameId={this.id}
          gameType={this.gameType}
          curIssue={this.state.curIssue}
          lastIssue={this.state.lastIssue}
          curTime={this.state.curTime}
          openNumbers={this.state.openNumbers}
          numCss={this.state.numCss}
        />
        <section className="game-main">
          <MethodMenu gameType={this.gameType} updateMethodIds={this.updateMethodIds} />
          <Play methodIds={this.state.methodIds} />
        </section>
        <section className="recent-open"></section>
      </article>
    );
  }
}

export default Game;
