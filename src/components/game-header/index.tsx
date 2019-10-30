import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RollingNumbers from './rollingNumbers';
import Timer from '../../utils/timer';
import { timeFormat } from '../../utils/date';

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
}

interface State {
  timer: any;
  remainTime: number;
  hours: string;
  minutes: string;
  seconds: string;
}

@inject("store")
@observer
class GameHeader extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      timer: null,
      remainTime: this.props.remainTime,
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
    console.log('game header constructor ', this.props.remainTime);
  }
  componentDidMount() {
    this.initTimer(this.props.remainTime);
  }
  componentWillReceiveProps(nextProps: Props) {
    console.log('game header componentWillReceiveProps ', nextProps)
    if (nextProps.remainTime !== this.state.remainTime) {
      this.setState({remainTime: nextProps.remainTime});
      this.initTimer(nextProps.remainTime);
    }
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
        
      }
      timeStr = timeFormat(t * 1000);
      times = timeStr.split(':');
      this.setState({hours: times[0], minutes: times[1], seconds: times[2]});
    });
    this.setState({timer});
  }
  render() {
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
          <div>
            <span>限红设置</span>
            <span></span>
          </div>
          <div className="limit-explain">限红说明</div>
        </div>
      </section>
    );
  }
}

export default GameHeader;

