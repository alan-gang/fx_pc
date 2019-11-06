import React, { Component } from 'react'
import { getBetRemind } from '../../http/APIs'
import BetRemindItem from './BetRemindItem'
import { getGameTypeByGameId, getGameById } from '../../game/games'


import './betRemind.styl'

interface State {
  isOpen: boolean,
  list: Array<any>
}

class BetRemind extends Component<Props, {}> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
      list: []
    }
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
    return this.state.list.slice(0, 10).map((item, index) => {
      let gameType = getGameTypeByGameId(item.lotteryId)
      return <BetRemindItem key={item.codeStyle + item.lotteryId + item.pos + item.notifyType + item.issue} open={index === 0} gamedata={item} gameType={gameType} />
    })
  }

  componentDidMount() {
    this.getBetRemind()
  }

  render() {
    return (
      <div className="bet-remind-list">
        {this.getShowList()}
      </div>
    )
  }
}

export default BetRemind