import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LobbyGameHeader from './LobbyGameHeader';
import Ludan from 'comp/ludan';
import { Row, Col, Button } from 'antd';
import LimitSetDialog from 'comp/limit-set-dialog';
import APIs from '../../http/APIs';
import { getGameTypeByGameId } from '../../game/games';
import { getLunDanTabByName } from '../../utils/ludan';

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
  bestLudanName: string;
  isShowLimitSetDialog: boolean;
  limitLevelList: LimitLevelItem[]
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
    let gameType = getGameTypeByGameId(props.gameId);
    let item = props.store.game.getLimitListItemById(props.gameId);
    let bestLudan: BestLudanItem = item && item.bestLudan;
    // let bestLudan: string = bestLudanConfig[gameType];
    let ludanTab = getLunDanTabByName(gameType, bestLudan && bestLudan.codeStyle);
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
      bestLudanName: ludanTab && ludanTab.name,
      isShowLimitSetDialog: false,
      limitLevelList: []
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
  gotoGame() {
    this.props.goto(`/game/${this.props.gameId}`);
  }
  onIntoGame = () => {
    if (this.props.store.game.getGameLimitLevelByGameId(this.props.gameId)) {
      this.gotoGame();
    } else {
      let limitListItem = this.props.store.game.getLimitListItemById(this.props.gameId);
      this.setState({isShowLimitSetDialog: true, limitLevelList: limitListItem ? limitListItem.kqPrizeLimit : []});
    }
  }
  onLimitChoiceCB = (level: number) => {
    this.props.store.game.updateGamesLimitLevel({gameId: this.props.gameId, level});
    this.gotoGame();
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
          <Col span={12}>{this.state.bestLudanName}</Col>
          <Col span={12} className="txt-r">
            <Button type="danger" className="btn-into-game" onClick={this.onIntoGame}>进入游戏</Button>
          </Col>
        </Row>
        <LimitSetDialog isShow={this.state.isShowLimitSetDialog} gameId={this.props.gameId} limitLevelList={this.state.limitLevelList} onLimitChoiceCB={this.onLimitChoiceCB} onCloseHandler={this.onCloseLimitChoiceHandler} />
      </section>
    )
  }
}

export default LobbyGame;
