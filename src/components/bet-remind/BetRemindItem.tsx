import React, { Component, createRef, ChangeEvent } from 'react'
import { Icon } from 'antd'
import LuDan from 'comp/ludan'
import APIs from '../../http/APIs'
import { any } from 'prop-types'
import { LOTTERY_TYPES } from '../../utils/config'
import { getMethodName, getNoSubMenuMethods } from '../../utils/ludan'
import { inject, observer } from 'mobx-react';
import methodItems from '../../game/methodItems'

import local from '../../utils/local'
import { message, Tooltip } from 'antd'
import inject_unmount from '../inject_unmount'
import BetRemindTime from './BetRemindTime'

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
  codeRange: string;
}

interface Props {
  open: Boolean;
  gamedata: GameData;
  gameType: string;
  store?: any;
  removeItem: Function;
}

interface State {
  isOpen: boolean;
  curIssue: string;
  curDateTime: number;
  remainTime: number;
  issueList: any[];
  kqargses: any;
  timeCls: string;
  time: string;
  showHeader: boolean;
}

interface AppRefs {
  inputParent: HTMLElement
}

@inject("store")
@observer
@inject_unmount
class BetRemindItem extends Component<Props, {}> {
  state: State
  private inputParent: React.RefObject<HTMLDivElement>
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
      issueList: [],
      curIssue: '',
      curDateTime: 0,
      remainTime: -1,
      kqargses: any,
      timeCls: '',
      time: '00:00:00',
      showHeader: false
    }
    this.inputParent = createRef()
  }



  // 获取赔率数据
  getOdd = (type: string) => {
    let limitItem = this.props.store.game.getLimitListItemById(this.props.gamedata.lotteryId)
    // console.log(this.props.gamedata.lotteryId, ' limitItem=', limitItem)
    if (limitItem) {
      let arr: any[] = limitItem.items[this.props.gamedata.methodId]
      // console.log(this.props.gamedata.methodId, ' arr=', arr )
      if (arr) {
        if (arr.length === 1) return arr[0].maxprize
        let rows = methodItems[this.props.gamedata.methodId + ':1']().rows
        if (rows.length > 1) {
          let temp: any = arr[0].maxprize
          rows.some((row: any) => {
            if (row.n === type || row.p === this.props.gamedata.pos) {
              return row.vs.some((tp: any) => {
                if (tp.n === type || tp.pv === type) {
                  temp = arr[tp.oddIndex || 0].maxprize
                  return true
                }
              })
            }
          })
          return temp
        } else if (rows[0].vs.length > 0) {
          let temp: any = arr[0].maxprize
          rows[0].vs.some((row: any) => {
            if (row.n === type || row.pv === type) {
              temp = arr[row.oddIndex].maxprize
              return true
            }
          })
          return temp
        } else {
          return arr[0].maxprize
        }
      }
      return ''
    }
    return ''
  }

  changeOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  notifyType(): String {
    let map = [null, '长龙', '单跳', '单边跳', '一厅两房', '拍拍连']
    return map[this.props.gamedata.notifyType] || '连出'
  }

  componentWillMount() {
    this.setState({
      isOpen: this.props.open,
      kqargses: {
        // issue: this.props.gamedata.issue,
        issue: this.state.curIssue,
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
          let kqargses = this.state.kqargses;
          this.setState({
            curIssue: data.issue,
            curDateTime: data.current,
            remainTime: Math.floor((data.saleend - data.current) / 1000),
            showHeader: true,
            kqargses: Object.assign(kqargses, {issue: data.issue})
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
    if (!this.state.issueList.length) return ''
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

  // 限制 input 框只能输入数字
  inputValChange(event: any) {
    event.target.value = event.target.value.replace(/[^\d]/g,'')
  }

  __kqbooking = () => {
    let totMoney = 0
    let totProjs = 0
    let betList = []
    let types = this.props.gamedata.codeRange.split(',')
    let limit = this.getLimit(this.props.gamedata.lotteryId)
    if (this.inputParent.current) {
      let list: any = this.inputParent.current.children
      let inputs: any[] = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].className.indexOf('bet-item') !== -1) {
          let arr = list[i].children
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].nodeName === 'INPUT') {
              if (arr[j].value > 0) {
                inputs.push(arr[j])
              }
            }
          }
        }
      }
      let flag = false
      betList = inputs.map((ipt, i) => {
        let val = Number(ipt.value)
        if (limit.maxAmt < val || limit.minAmt > val) {
          let msg = limit.maxAmt < val ? '投注超出限红' : '投注低于最低限红'
          flag = true
          message.warning(msg)
        }
        totMoney += val
        return {
          content: this.props.gamedata.pos ? this.props.gamedata.pos + '-' + types[i] : types[i],
          methodId: this.props.gamedata.methodId + '',
          projs: 1,
          money: val + ''
        }
      })
      if (flag) return
      totProjs = inputs.length
      if (!totMoney) return message.warning('请输入投注金额!')
      let params = {
        ...this.state.kqargses,
        betList,
        totMoney,
        totProjs,
        isFastBet: 1
      }
      params.limitLevel = this.getLimit(params.lotteryId).level
      APIs.bet({betData: JSON.stringify(params)})
        .then((res: any) => {
          if (res.success === 1) {
            message.success('投注成功')
            inputs.forEach(ipt => ipt.value = '')
          } else {
            message.warning(res.msg || '投注失败')
          }
        })
    }
    // for (let i=0; i<len; i++) {
    //   let val: any = 
    // }
  }

  // 获取限红
  getLimit = (gameId: any) => {
    let xh = this.props.store.game.getGameLimitLevelByGameId(gameId);
    let limitListItem = this.props.store.game.getLimitListItemById(gameId);
    // if(xh) {
    //   if (this.props.store.game.limitList && this.props.store.game.limitList[gameId]) {
    //     return this.props.store.game.limitList[gameId].kqPrizeLimit[xh.level - 1]
    //   }
    // } else {
    //   if (this.props.store.game.limitList && this.props.store.game.limitList[gameId]) {
    //     return this.props.store.game.limitList[gameId].kqPrizeLimit[0]
    //   }
    // }
    
    if (xh) {
      return this.props.store.game.getKqLimitLevelItemById(gameId, xh.level)
    } else {
      return limitListItem.kqPrizeLimit[0]
    }
  }

  render() {
    return (
      <div className="bet-remind">
        <div className="bet-remind-header flex jc-s-b">
          <Tooltip title={this.props.gamedata.lotteryName} >
            <span className="lottery-name">{ this.props.gamedata.lotteryName }</span>
          </Tooltip>
          <div className="right">
            { this.props.gamedata.pos }<span className="c-red">{ this.props.gamedata.notifyVal }</span>
              - 
            { this.notifyType() }<span className="c-red">{ this.props.gamedata.contCount }</span>{this.props.gamedata.unit}
          </div>
          <span 
            onClick={ this.changeOpen }
            className={ `tigger ${ this.state.isOpen ? 'open' : '' }` }
          >
            <Icon theme="filled" type="down-circle" />
          </span>
        </div>
        {
          this.getLuDan()
        }
        <div className="bet-remind-play">
          {this.state.showHeader ? <BetRemindTime gamedata={this.props.gamedata} remainTime={this.state.remainTime} removeItem={this.props.removeItem} curIssue={this.state.curIssue} /> : ''}
          
          <div className="bet-list clearfix" ref={this.inputParent}>
            {/* <div className="flex jc-s-b fw-w"> */}
            {this.props.gamedata.codeRange.split(',').map((item, index) => {
              return (
                <div key={index} className={`flex1 bet-item ${(index + 1) % 2 === 0 ? 'flt-r' : 'flt-l'}`}>
                  <span className="bet-ball">{item.slice(-1)}</span>
                  <span className="odd">{this.getOdd(item)}</span>
                  <input onChange={this.inputValChange} type="text"/>
                </div>
              )
            })}
            {/* </div> */}
            <div className="bet-now flt-r" onClick={this.__kqbooking}>立即购买</div>
          </div>
        </div>
      </div>
    )
  }
}

export default BetRemindItem