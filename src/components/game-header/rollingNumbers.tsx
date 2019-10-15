import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './rollingNumbers.styl';

@inject("store")
@observer
class RollingNumbers  extends Component<Props, object> {
  render() {
    return (
      <div className="rolling-numbers pos-r">
        <div className="number-box">
          <div className="number">
            <div className="the-number-box">
              <div className="the-number"></div>
            </div>
          </div>
          <div className="decorations"></div>
        </div>
        <div className="number-gaps">
          <div className="number-gap">+</div>
          <div className="number-gap">+</div>
          <div className="number-gap">=</div>
          <div className="number.number-gap">
            <div className="the-number-box">
              <div className="the-number"></div>
            </div>
          </div>
        </div>
        <div className="dice-box inlb"></div>
      </div>
    )
  }
}

export default RollingNumbers;
