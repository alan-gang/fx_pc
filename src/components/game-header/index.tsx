import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RollingNumbers from './rollingNumbers';

import './index.styl';
interface Props {
  store?: any;
  gameType?: string;
  gameId?: number;
  curIssue?: string;
  lastIssue?: string;
  curTime?: number;
  openNumbers: string[];
  numCss: string;
}

@inject("store")
@observer
class GameHeader extends Component<Props, object> {
  render() {
    return (
      <section className="game-header-view flex ai-c">
        <div className={`game-logo game-header-logo-${this.props.gameId}`}>
          <span className="volumn-switch close"></span>
        </div>
        <div className="flex ai-c">
          <div className="txt-r cur-issue-wp">
            <div>{this.props.curIssue}期</div>
            <div>截止时间</div>
          </div>
          <div className="time-wp flex ai-c jc-c">
            <span className="hour-wp">00</span>
            <span className="colon">:</span>
            <span className="minute-wp">01</span>
            <span className="colon">:</span>
            <span className="second-wp">22</span>
          </div>
        </div>
        <div className="last-issue-wp flex ai-c">
          <div className="txt-r last-issue-num-wp">{this.props.lastIssue}期</div>
          <div>
            <RollingNumbers numbers={this.props.openNumbers} hl={this.props.numCss} gameType={this.props.gameType}/>
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
