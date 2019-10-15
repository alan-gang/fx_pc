import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameHeader from 'comp/game-header';
import { RouteComponentProps } from "react-router-dom";

interface IProps {
  store?: any;
  gameType?: string;
}

interface MatchParams {
  id: string;
}

type Props = IProps & RouteComponentProps<MatchParams>;

@inject("store")
@observer
class Game extends Component<Props, object> {
  id: number = 1;
  constructor(props: Props) {
    super(props);
  }
  render() {
    this.id = parseInt(this.props.match.params.id || '1', 10);
    return (
     <article className="game-view">
       <GameHeader gameId={this.id}></GameHeader>
     </article>
    );
  }
}

export default Game;
