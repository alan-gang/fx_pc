import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LobbyGameHeader from './LobbyGameHeader';
import Ludan from 'comp/ludan';
import { Row, Col, Button } from 'antd';
import LimitSetDialog from 'comp/limit-set-dialog';
import APIs from '../../http/APIs';

import './lobbyGame.styl';

interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  goto(path: string): void;
}

interface State {
  gameType: string;
  curIssue: string;
  curTime: number;
  remainTime: number;
  issueList: any[];
  maxColumns: number;
  maxRows: number;
  isShowLudanMenu: boolean;
  bestLudanConfig: any;
  bestLudan: string;
  isShowLimitSetDialog: boolean;
}

@inject("store")
@observer
class LobbyGame extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    let bestLudanConfig: any = {
      'ssc': 'zhenghe',
      '11x5': 'zhenghe',
      'pk10': 'zhenghe',
      'k3': 'diansu'
    };
    let bestLudan: string = bestLudanConfig[props.gameType];
    this.state = {
      gameType: 'ssc',
      curIssue: '',
      curTime: 0,
      remainTime: 0,
      issueList: [],
      maxColumns: 19,
      maxRows: 6,
      isShowLudanMenu: false,
      bestLudanConfig,
      bestLudan,
      isShowLimitSetDialog: false
    }
  }
  componentWillMount() {
    this.init();
  }
  init() {
    this.getCurIssue(this.props.gameId);
    this.getHistoryIssue(this.props.gameId);
  }
  getCurIssue = (gameid: number) => {
    APIs.curIssue({gameid}).then((data: any) => {
      if (data.success > 0) {
        this.setState({
          curIssue: data.issue,
          curTime: data.current,
          remainTime: Math.floor((data.saleend - data.current) / 1000) || (this.state.remainTime + 0.05)
        })
      } else {
        this.setState({curIssue: ''});
      }
    });
  }
  getHistoryIssue(gameid: number) {
    APIs.historyIssue({gameid}).then((data: any) => {
      if (data.success === 1) {
        if (data.items.length > 0) {
          this.setState({
            lastIssue: data.items[0].issue,
            openNumbers: data.items[0].code.split(','),
            issueList: data.items
          });
        }
      }
    });
  }
  onIntoGame = () => {
    this.setState({isShowLimitSetDialog: true});
  }
  onLimitChoiceCB = (level: number) => {
    this.props.goto(`/game/${this.props.gameId}`);
  }
  onCloseLimitChoiceHandler = () => {
    this.setState({isShowLimitSetDialog: false});
  }
  render() {
    return (
      <section className="lobby-game-view">
        <LobbyGameHeader gameType={this.props.gameType} gameId={this.props.gameId} curIssue={this.state.curIssue} remainTime={this.state.remainTime} getNewestIssue={this.getCurIssue} />
        <div className="ludan-wp">
          <Ludan isShowLudanMenu={this.state.isShowLudanMenu} gameId={this.props.gameId} gameType={this.state.gameType} maxColumns={this.state.maxColumns} maxRows={this.state.maxRows} issueList={this.state.issueList.reverse()} methodMenuName={this.state.bestLudanConfig[this.state.gameType]} />
        </div>
        <Row className="footer-bar">
          <Col span={12}>xxxx</Col>
          <Col span={12} className="txt-r">
            <Button type="danger" className="btn-into-game" onClick={this.onIntoGame}>进入游戏</Button>
          </Col>
        </Row>
        <LimitSetDialog isShow={this.state.isShowLimitSetDialog} gameId={this.props.gameId} onLimitChoiceCB={this.onLimitChoiceCB} onCloseHandler={this.onCloseLimitChoiceHandler} />
      </section>
    )
  }
}

export default LobbyGame;
