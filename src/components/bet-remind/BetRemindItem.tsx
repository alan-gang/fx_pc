import React, { Component } from 'react'
import { Icon } from 'antd'
import LuDan from 'comp/ludan'
import APIs from '../../http/APIs'
import { any } from 'prop-types'
import { LOTTERY_TYPES } from '../../utils/config'
import { getMethodName, getNoSubMenuMethods } from '../../utils/ludan'
import { inject, observer } from 'mobx-react';


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
  store?: any;
}

interface State {
  isOpen: boolean;
  curIssue: string;
  curDateTime: number;
  remainTime: number;
  issueList: any[];
  kqargses: any;
}

@inject("store")
@observer
class BetRemindItem extends Component<Props> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
      issueList: [],
      curIssue: '',
      curDateTime: 0,
      remainTime: -1,
      kqargses: any
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
      isOpen: this.props.open,
      kqargses: {
        issue: this.props.gamedata.issue,
        lotteryId: this.props.gamedata.lotteryId,
        totMoney: 0,
        totProjs: 0,
        isusefree: 0,
        betList: []
      }
    })
    this.getCurIssueData()
    this.getHistoryIssue()
  }

  getCurIssueData = () => {
    APIs.curIssue({gameid: this.props.gamedata.lotteryId})
      .then((data: any) => {
        if (data.success > 0) {
          this.setState({
            curIssue: data.issue,
            curDateTime: data.current,
            remainTime: Math.floor((data.saleend - data.current) / 1000)
          })
        } else {
          this.setState({
            curIssue: ''
          })
        }
      })
  }

  getHistoryIssue = () => {
    APIs.historyIssue({gameid: this.props.gamedata.lotteryId})
      .then((data: any) => {
        if (data.success === 1) {
          this.setState({
            issueList: this.fmtIssueListData(data.items)
          })
        }
      })
  }

  // 开奖数据整理
  private fmtIssueListData (arr: any[]) {
    return arr.map((issue: any) => {
      if (issue.codeStyle) {
        let viewDatas: any[] = [];
        const codeStyle: any[] = JSON.parse(issue.codeStyle);
        codeStyle.forEach((cs: any) => {
          if (cs.methodId.includes('1251') || cs.methodId.includes('2050') || cs.methodId.includes('5018')) {
            let dxPreTxt = '';
            let dsPreTxt = '';
            // 11x5大小，单双加前缀
            if (cs.methodId.includes('2050')) {
              dsPreTxt = dxPreTxt = '总';
            } 
            viewDatas.push({name: 'dx', value: dxPreTxt + cs.value[0].dx});
            viewDatas.push({name: 'ds', value: dsPreTxt + cs.value[0].ds});
            // 11x5尾大，尾小
            if (cs.methodId.includes('2050')) {
              viewDatas.push({name: 'wsdx', value: '和尾' + cs.value[0].wsdx});
            }
          } else if (cs.methodId.includes('4050')) {
            // PK10
            cs.value[0].pos = '冠亚和';
            viewDatas.push(cs.value[0]);
          } else if (cs.methodId.includes('1200') || cs.methodId.includes('2053')) {
            viewDatas.push({name: 'lhh', value: cs.value[0]});
          } else if (cs.methodId.includes('1250') || cs.methodId.includes('2051') || cs.methodId.includes('4053')) {
            if (this.props.gameType === LOTTERY_TYPES.G11X5) {
              cs.value.forEach((v: any) => {
                // 去掉第一个字符“第”
                v.pos = v.pos.slice(1);
                viewDatas.push(v);
              })
            } else if (this.props.gameType === LOTTERY_TYPES.PK10) {
              // 冠、亚、季
              viewDatas.push(...cs.value.slice(0, 3));
            } else {
              viewDatas.push(...cs.value);
            }
          }
        });

        // 元素顺序调整
        if (this.props.gameType === LOTTERY_TYPES.SSC) {
          viewDatas.splice(0, 0, ...viewDatas.slice(-2));
          viewDatas = viewDatas.slice(0, viewDatas.length - 2);
        } else if (this.props.gameType === LOTTERY_TYPES.G11X5) {
          let firstEle = viewDatas.shift();
          viewDatas.splice(2, 0, firstEle);
        }
        issue.viewDatas = viewDatas || [];
      }
      issue.viewDatas = issue.viewDatas || [];
      return issue;
    });
  }

  getLuDan = () => {
    if (this.state.isOpen) {
      let arr = getNoSubMenuMethods(this.props.gameType)
      let temp = {}
      if (arr.includes(this.props.gamedata.codeStyle)) {
        temp = {
          defaultMenu: this.props.gamedata.codeStyle
        }
      } else {
        temp = {
          defaultMenu: this.props.gamedata.codeStyle.split('_')[0],
          defaultSubMenu: this.props.gamedata.codeStyle.split('_')[1]
        }
      }
      let methodName = getMethodName(this.props.gameType, this.props.gamedata.codeStyle)
      return <LuDan
        gameType={this.props.gameType}
        gameId={this.props.gamedata.lotteryId}
        maxColumns={11}
        maxRows={6}
        issueList={this.state.issueList.slice(0).reverse()}
        isShowLudanMenu={false}
        methodMenuName={methodName}
        {...temp}
      />
    } else {
      return ''
    }
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    
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
          this.getLuDan()
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