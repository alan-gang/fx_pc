import React, { Component, createRef, RefObject } from 'react'
import { getBetRemind } from '../../http/APIs'
import BetRemindItem from './BetRemindItem'
import { getGameTypeByGameId, getGameById } from '../../game/games'
import * as _ from 'underscore'
import Bus from '../../utils/eventBus'
import inject_unmount from '../../components/inject_unmount'
import dayjs from 'dayjs'

import './betRemind.styl'

interface State {
  isOpen: boolean;
  list: any[];
  size: number;
}
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
      size: 10
    }
    this.listBox = createRef()
    this.listContainer = createRef()
    this.handleScrollThrottled = _.throttle(this.handleScroll, 500)
  }

  componentDidMount() {
    this.getBetRemind()
    Bus.addListener('__pushBetRemind', this.addBetRemind)
    this.startIntervalResetOrder()
  }

  componentWillUnmount() {
    Bus.removeListener('__pushBetRemind', this.addBetRemind)
    if (this.timeoutTimer) clearTimeout(this.timeoutTimer)
    if (this.timer) clearInterval(this.timer)
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
          this.setState({
            list: this.filterBetRemindList(res.data)
          })
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
      return <BetRemindItem removeItem={this.removeItem} key={item.codeStyle + item.lotteryId + item.pos + item.notifyType + item.issue} open={index === 0} gamedata={item} gameType={gameType} />
    })
  }

  removeItem = (game: any) => {
    let idx: any = ''
    this.state.list.some((item, index) => {
      if (item.lotteryId === game.lotteryId && item.codeStyle === game.codeStyle && item.pos === game.pos && item.issue === game.issue && item.notifyType === game.notifyType) {
        idx = index
        return true
      }
    })
    if (typeof idx === 'number') {
      let temp = [...this.state.list]
      temp.splice(idx, 1)
      this.setState({
        list: temp
      });
      if (temp.length <= 0) {
        this.getBetRemind();
      }
    }
  }

  handleScroll = (e: any) => {
    if (this.listContainer.current && this.listBox.current && e.target) {
      if (this.listContainer.current.offsetHeight - this.listBox.current.offsetHeight - e.target.scrollTop) {
        this.setState({
          size: this.state.size + 5
        })
      }
    }
  } 

  render() {
    return (
      <div className="bet-remind-list" ref={this.listBox} onScroll={this.handleScrollThrottled}>
        <div ref={this.listContainer} className="list-container">
          {this.getShowList()}
        </div>
      </div>
    )
  }
}

export default BetRemind