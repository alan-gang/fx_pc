import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RollingNumbers from './rollingNumbers';
import Timer from '../../utils/timer';
import { timeFormat } from '../../utils/date';
import { Select, Tooltip } from 'antd';

import './index.styl';
interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  curIssue?: string;
  lastIssue?: string;
  curTime?: number;
  remainTime: number;
  openNumbers: string[];
  getNewestIssue(gameid: number): void;
}

interface State {
  timer: any;
  remainTime: number;
  hours: string;
  minutes: string;
  seconds: string;
  limitLevelList: LimitLevelItem[];
  curGameLimitLevel: number;
  tipText: string;
}

const { Option } = Select;

@inject("store")
@observer
class GameHeader extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    let limitItem = props.store.game.getLimitListItemById(props.gameId);
    let curGameLimitLevel = props.store.game.getGameLimitLevelByGameId(props.gameId);
    // console.log('curGameLimitLevel=', curGameLimitLevel, curGameLimitLevel && curGameLimitLevel.level, limitItem, props.gameId, props.store.game.setGamesLimitLevel);
    this.state = {
      timer: null,
      remainTime: this.props.remainTime,
      hours: '00',
      minutes: '00',
      seconds: '00',
      limitLevelList: limitItem && limitItem.kqPrizeLimit || [],
      curGameLimitLevel: curGameLimitLevel && curGameLimitLevel.level || 1,
      tipText: '第一次进入需选择限红；再次进入不需要选择限红；除非该游戏限红与之前游戏限红不同。当切换不同的限红模式时，再次投注同一彩种，需至少间隔1期再投注。'
    }
    // console.log('game header constructor ', this.props.remainTime);
  }
  componentDidMount() {
    this.initTimer(this.props.remainTime);
  }
  componentWillReceiveProps(nextProps: Props) {
    let limitItem = nextProps.store.game.getLimitListItemById(nextProps.gameId);
    let curGameLimitLevel = nextProps.store.game.getGameLimitLevelByGameId(nextProps.gameId);
    this.setState({
      remainTime: nextProps.remainTime,
      limitLevelList: limitItem && limitItem.kqPrizeLimit || [],
      curGameLimitLevel: curGameLimitLevel && curGameLimitLevel.level || 1
    });
    this.initTimer(nextProps.remainTime);
  }
  initTimer(remainTime: number) {
    if (remainTime <= 0) return;
    let timer = this.state.timer;
    let timeStr: string = '';
    let times: string[] = [];
    if (timer && timer.close) {
      timer.close();
      timer = null;
    }
    timer = new Timer(Math.floor(remainTime), (t: number): void => {
      if (t <= 0) {
        this.props.getNewestIssue(this.props.gameId);
      }
      timeStr = timeFormat(t * 1000);
      times = timeStr.split(':');
      this.setState({hours: times[0], minutes: times[1], seconds: times[2]});
    });
    this.setState({timer});
  }
  onLimitLevelChanged = (value: any) => {
    this.props.store.game.updateGamesLimitLevel({gameId: this.props.gameId, level: parseInt(value, 10)});
    this.setState({
      curGameLimitLevel: parseInt(value, 10)
    });
  }
  clearTimer(): void {
    if (this.state.timer && this.state.timer.close) {
      this.state.timer.close();
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  render() {
    let state = this.state;
    // console.log('game-header render ', state.curGameLimitLevel, state.limitLevelList);
    return (
      <section className={`game-header-view flex ai-c ${this.props.gameType}`}>
        <div className={`game-logo game-header-logo-${this.props.gameId}`}>
          <span className="volumn-switch close"></span>
        </div>
        <div className="flex ai-c">
          <div className="txt-r cur-issue-wp">
            <div>{this.props.curIssue}期</div>
            <div>截止时间</div>
          </div>
          <div className="time-wp flex ai-c jc-c">
            <span className="hour-wp">{this.state.hours}</span>
            <span className="colon">:</span>
            <span className="minute-wp">{this.state.minutes}</span>
            <span className="colon">:</span>
            <span className="second-wp">{this.state.seconds}</span>
          </div>
        </div>
        <div className="last-issue-wp flex ai-c">
          <div className="txt-r last-issue-num-wp">{this.props.lastIssue}期</div>
          <div>
            <RollingNumbers numbers={this.props.openNumbers} gameType={this.props.gameType} />
          </div>
        </div>
        <div className="limit-set-wp">
          <div className="limit-set-inner-wp">
            <span>限红设置:</span>
            <span>
            {state.limitLevelList && state.limitLevelList.length > 0 && 
              <Select defaultValue={state.curGameLimitLevel} value={state.curGameLimitLevel} style={{ width: 80 }} onChange={this.onLimitLevelChanged}>
                {state.limitLevelList.map((limitLevelItem: LimitLevelItem, i: number) => (
                  <Option value={limitLevelItem.level} key={i}>{`${limitLevelItem.minAmt}-${limitLevelItem.maxAmt}`}</Option>
                ))}
              </Select>
            }
            </span>
          </div>
          <Tooltip placement="bottom" title={this.state.tipText}>
          <div className="limit-explain">限红说明:</div>
          </Tooltip>
        </div>
      </section>
    );
  }
}

export default GameHeader;

