import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RollingNumbers from './rollingNumbers';

import './index.styl';
interface Props {
  store?: any;
  gameType?: string;
  gameId?: number;
}

@inject("store")
@observer
class GameHeader extends Component<Props, object> {
  render() {
    return (
      <section className="game-header-view flex ai-c">
        <div className={`game-logo game-header-logo-${this.props.gameId}`}>
          <span className="volumn-switch open"></span>
        </div>
        <div className="flex ai-c">
          <div className="txt-r cur-issue-wp">
            <div>123124142期</div>
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
        <div className="last-issue-wp">
          <div className="txt-r last-issue-num-wp">
            12414213421期
          </div>
          <div>
            {/* <RollingNumbers /> */}
          </div>
        </div>
        <div className="limit-set-wp">
          <div>
            <span>限红设置</span>
            <span></span>
          </div>
          <div>限红说明</div>
        </div>
      </section>
    );
  }
}

export default GameHeader;
