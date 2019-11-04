import React, { Component } from 'react'
import { Icon } from 'antd'

interface GameData {
  codeStyle: string;
  contCount: number;
  issue: string;
  lotteryId: number;
  lotteryName: string;
  ltrGroupId: number;
  methodId: number;
  notifyType: number;
  notifyVal: string;
  pos: string;
  unit: string;
}

interface Props {
  open: Boolean;
  gamedata: GameData;
  gameType: string;
}

interface State {
  isOpen: boolean
}

class BetRemindItem extends Component<Props> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  changeOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  notifyType(): String {
    let map = [null, '长龙', '单挑', '单边跳', '一厅两房', '拍拍连']
    return map[this.props.gamedata.notifyType] || '连出'
  }

  componentWillMount() {
    this.setState({
      isOpen: this.props.open
    })
  }

  render() {
    return (
      <div className="bet-remind">
        <div className="bet-remind-header flex jc-s-b">
          <span>{ this.props.gamedata.lotteryName }</span>
          <div className="right">
            { this.props.gamedata.pos }<span className="c-red">{ this.props.gamedata.notifyVal }</span>
              - 
            { this.notifyType() }<span className="c-red">{ this.props.gamedata.contCount }</span>期
            <span 
              onClick={ this.changeOpen }
              className={ `tigger ${ this.state.isOpen ? 'open' : '' }` }
            >
              <Icon theme="filled" type="down-circle" />
            </span>
          </div>
        </div>
        {
          this.state.isOpen ? <div className="bet-remind-ludan"></div> : ''
        }
        <div className="bet-remind-play">
          <div className="lottery">
            <span className="issue">{ this.props.gamedata.issue }期</span>
            <span className="time">00:21:01</span>
          </div>
          <div className="bet-list clearfix">
            <div className="bet-item flt-l">
              <span className="bet-ball">大</span>
              <span className="odd">1.97</span>
              <input type="text"/>
            </div>
            <div className="bet-item flt-r">
              <span className="bet-ball">小</span>
              <span className="odd">1.97</span>
              <input type="text"/>
            </div>
            <div className="bet-now flt-r">立即购买</div>
          </div>
        </div>
      </div>
    )
  }
}

export default BetRemindItem