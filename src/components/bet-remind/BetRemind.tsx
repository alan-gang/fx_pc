import React, { Component, createRef, RefObject } from 'react'
import APIs, { getBetRemind } from '../../http/APIs'
import BetRemindItem from './BetRemindItem'
import { getGameTypeByGameId, getGameById } from '../../game/games'
import * as _ from 'underscore'
import Bus from '../../utils/eventBus'
import inject_unmount from '../../components/inject_unmount'
import dayjs from 'dayjs'
import RefreshBar from './RefreshBar';

import './betRemind.styl'

interface State {
  isOpen: boolean;
  list: any[];
  size: number;
  isAutoRefresh: boolean;
  autoRefreshRemainTime: number;
  autoRefreshRemainTimeFmt: string;
  issueList: any[];
  recentCodeList: any[];
  curServerTime: number;
}

const AUTO_REFRESH_SECONDS = 20;
const DEFAULT_SIZE = 10;

let lastScrollTop: number = 0;
@inject_unmount
class BetRemind extends Component {
  state: State
  timeoutTimer: any
  timer: any
  private listBox: RefObject<HTMLDivElement>
  private listContainer: RefObject<HTMLDivElement>
  private handleScrollThrottled: any
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
      list: [],
      size: DEFAULT_SIZE,
      isAutoRefresh: true,
      autoRefreshRemainTime: AUTO_REFRESH_SECONDS,
      autoRefreshRemainTimeFmt: '20',
      issueList: [],
      recentCodeList: [],
      curServerTime: 0
    }
    this.listBox = createRef()
    this.listContainer = createRef()
    this.handleScrollThrottled = _.throttle(this.handleScroll, 500)
  }

  componentDidMount() {
    this.getBetRemind()
    Bus.addListener('__pushBetRemind', this.addBetRemind)
    // this.startIntervalResetOrder()
    this.startRefreshCount();
  }

  componentWillUnmount() {
    Bus.removeListener('__pushBetRemind', this.addBetRemind)
    if (this.timeoutTimer) clearTimeout(this.timeoutTimer)
    if (this.timer) clearInterval(this.timer)
  }

  switchAutoRefresh = () => {
    this.setState({isAutoRefresh: !this.state.isAutoRefresh});
    if (this.state.isAutoRefresh) {
      if (this.timer) clearInterval(this.timer);
    } else {
      this.startRefreshCount();
    }
  }

  startRefreshCount() {
    this.timer = setInterval(() => {
      this.setState({autoRefreshRemainTime: this.state.autoRefreshRemainTime - 1, autoRefreshRemainTimeFmt: String(this.state.autoRefreshRemainTime - 1).padStart(2, '0')}, () => {
        if (this.state.autoRefreshRemainTime <= 0) {
          this.getBetRemind()
          this.setState({autoRefreshRemainTime: AUTO_REFRESH_SECONDS});
        }
      })
    }, 1000);
  }

  startIntervalResetOrder() {
    let now: any = dayjs().format('mm')
    // 每个 5 15 25 35 45 55 分钟时重新排序
    let timerTime = 10
    if (now > 5 && now < 15) {
      timerTime = 15 - now
    } else if (now > 15 && now < 25 ) {
      timerTime = 25 - now
    } else if (now > 25 && now < 35 ) {
      timerTime = 35 - now
    } else if (now > 35 && now < 45 ) {
      timerTime = 45 - now
    } else if (now > 45 && now < 55 ) {
      timerTime = 55 - now
    }
    this.timeoutTimer = setTimeout(() => {
      this.getBetRemind()
      this.timer = setInterval(() => {
        this.getBetRemind()
      }, 10 * 60 * 1000)
    }, timerTime * 60 * 1000)
  }

  addBetRemind = (arr: any) => {
    arr = arr.filter((item: any) => {
      return !this.state.list.find((sitem) => {
        return item.lotteryId === sitem.lotteryId && item.codeStyle === sitem.codeStyle && item.pos === sitem.pos && item.issue === sitem.issue && item.notifyType === sitem.notifyType
      });
    });
    this.setState({
      list: this.state.list.concat(arr)
    })
  }

  changeOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getBetRemind = () => {
    getBetRemind()
      .then((res: any) => {
        if (res.success === 1) {
          let list = this.filterBetRemindList(res.data);
          this.getData(list);
          this.setState({list});
        }
      })
  }

  filterBetRemindList = (arr: any[]) => {
    let val = arr.filter(item => {
      let game = getGameById(item.lotteryId)
      if (game) {
        return true
      }
      return false
    })
    return val
  }

  getShowList = (): any[] => {
    return this.state.list.slice(0, this.state.size).map((item, index) => {
      let gameType = getGameTypeByGameId(item.lotteryId)
      return <BetRemindItem removeItem={this.removeItem} key={item.codeStyle + item.lotteryId + item.pos + item.notifyType + item.contCount + item.issue} open={index === 0} gamedata={item} gameType={gameType} issueList={this.state.issueList} recentCodeList={this.state.recentCodeList} curServerTime={this.state.curServerTime} />
    })
  }

  removeItem = (game: any) => {
    // let idx: any = ''
    // this.state.list.some((item, index) => {
    //   if (item.lotteryId === game.lotteryId && item.codeStyle === game.codeStyle && item.pos === game.pos && item.issue === game.issue && item.notifyType === game.notifyType) {
    //     idx = index
    //     return true
    //   }
    // })
    // if (typeof idx === 'number') {
    //   let temp = [...this.state.list]
    //   temp.splice(idx, 1)
    //   this.setState({
    //     list: temp,
    //     size: this.state.size + 1
    //   });
    //   if (temp.length <= 0) {
    //     this.getBetRemind();
    //   }
    // }
    let count: number = 0;
    let list = this.state.list.slice(0);
    let pos: number = -1;
    this.state.list.forEach(() => {
      pos = list.findIndex((item, i) => (item.lotteryId === game.lotteryId && item.codeStyle === game.codeStyle && item.pos === game.pos && item.issue === game.issue && item.notifyType === game.notifyType));
      if (pos >= 0) {
        count++;
        list.splice(pos, 1);
      }
    });
    this.setState({
      list,
      size: this.state.size + count
    });
    if (list.length <= 0) {
      this.getBetRemind();
    }
  }

  handleScroll = (e: any) => {
    if (this.listContainer.current && this.listBox.current && e.target) {
      if (this.listContainer.current.offsetHeight - this.listBox.current.offsetHeight - e.target.scrollTop) {
        // console.log('e.target.scrollTop', e.target.scrollTop, this.state.size, this.state.list.length)
        if (e.target.scrollTop > lastScrollTop && this.state.size < this.state.list.length) {
          this.getData();
          this.setState({
            size: this.state.size + 5
          });
        }
        lastScrollTop = e.target.scrollTop;
      }
    }
  }

  // 批量获取奖期列表，历史开奖列表
  getData(list?: any[]) {
    let ids = this.getGameIdsFromList(list || this.state.list, 'lotteryId');
    const joinIds = ids.join(',');
    this.getIssuesByGameIds(joinIds);
    this.getBatchRecentCodesByGameIds(joinIds);
  }

  /**
   * 从任何一个列表提取给定属性组成的列表，已去重
   * @param list 
   * @param prop 想要提取的属性
   */
  getGameIdsFromList(list: any[] = [], prop: string = 'lotteryid') {
    let ids = list.map((item) => item[prop]);
    return [...new Set(ids)];
  }

  // 批量获取期号
  getIssuesByGameIds(ids: string) {
    APIs.getIssuesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        this.setState({issueList: data.items, curServerTime: data.current});
      }
    });
  }

  // 批量获取历史开奖
  getBatchRecentCodesByGameIds(ids: string) {
    APIs.getBatchRecentCodesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        this.setState({recentCodeList: data.data});
      }
    });
  }

  render() {
    return (
      <div className="bet-remind-list" ref={this.listBox} onScroll={this.handleScrollThrottled}>
        <RefreshBar isAutoRefresh={this.state.isAutoRefresh} remainTime={this.state.autoRefreshRemainTimeFmt} switchAutoRefresh={this.switchAutoRefresh} refresh={this.getBetRemind}/>
        <div ref={this.listContainer} className="list-container">
          {this.getShowList()}
        </div>
      </div>
    )
  }
}

export default BetRemind