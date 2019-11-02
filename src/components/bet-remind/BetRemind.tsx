import React, { Component } from 'react'
import { getBetRemind } from '../../http/APIs'
import BetRemindItem from './BetRemindItem'
import { getGameTypeByGameId } from '../../game/games'
import InfiniteScroll from 'react-infinite-scroll-component'

import './betRemind.styl'

interface State {
  isOpen: boolean,
  list: Array<any>
}

class BetRemind extends Component {
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
            list: res.data
          })
        }
      })
  }

  getShowList = () => {
    return this.state.list.splice(0, 10).map((game, index) => {
      let gameType = getGameTypeByGameId(game.lotteryId)
      return (<BetRemindItem key={game.lotteryId + 'lId' + game.issue + game.pos + game.codeStyle + game.methodId + game.notifyType} open={index === 0} gamedata={game} gameType={gameType} />)
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