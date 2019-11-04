import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LobbyGameHeader from './LobbyGameHeader';
import Ludan from 'comp/ludan';
import { Row, Col, Button } from 'antd';

import './lobbyGame.styl';

interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  curIssue: string;
}

interface State {
  id: number;
  gameType: string;
  curIssue: string;
  remainTime: number;
  issueList: any[];
  maxColumns: number;
  maxRows: number;
}

@inject("store")
@observer
class LobbyGame extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    // this.id = parseInt(this.props.match.params.id || '1', 10);
    // this.gameType = getGameTypeByGameId(this.id);
    // let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    this.state = {
      id: 1,
      gameType: 'ssc',
      curIssue: '',
      remainTime: 0,
      issueList: [],
      maxColumns: 30,
      maxRows: 6
    }
  }
  getNewestIssue = () => {

  }
  onIntoGame = () => {

  }
  render() {
    return (
      <section className="lobby-game-view">
        <LobbyGameHeader gameType={this.props.gameType} gameId={this.props.gameId} curIssue={this.props.curIssue} remainTime={1234} getNewestIssue={this.getNewestIssue} />
        <div className="ludan-wp">
          {this.state.issueList && this.state.issueList.length > 0 && <Ludan gameId={this.state.id} gameType={this.state.gameType} maxColumns={this.state.maxColumns} maxRows={this.state.maxRows} issueList={this.state.issueList.reverse()} methodMenuName={'zhenghe'} />}
        </div>
        <Row className="footer-bar">
          <Col span={12}>xxxx</Col>
          <Col span={12} className="txt-r">
            <Button type="danger" className="btn-into-game" onClick={this.onIntoGame}>进入游戏</Button>
          </Col>
        </Row>
      </section>
    )
  }
}

export default LobbyGame;
