import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PlayExplain from './PlayExplain'
import LotteryExplain from './LotteryExplain'
import './index.styl'

interface State {
  tabIndex: number;
}

const tabs = ['玩法说明', '彩种说明']

@inject("store")
@observer
class PlayMethodRule extends Component<Props, {}> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      tabIndex: 0
    }
  }

  getComp = () => {
    return this.state.tabIndex === 0 ? <PlayExplain /> : <LotteryExplain />
  }

  render() {
    return (
      <article className="play-method-rule-view">
        {
          tabs.map((tab, idx) => <div key={tab} className={`page-title ${ idx === this.state.tabIndex ? 'active' : '' }`} onClick={() => this.setState({tabIndex: idx})}>{ tab }</div>)
        }
        <div className="rule-container m-t-1">
          {this.getComp()}
        </div>
      </article>
    )
  }
}

export default PlayMethodRule;
