import React, { Component } from 'react'
import Timer from '../../utils/timer'
import { timeFormat } from '../../utils/date'
import inject_unmount from '../inject_unmount'

interface Props {
  remainTime: number;
  gamedata: any;
  removeItem: Function;
}

interface State {
  timer: any;
  time: string;
}

@inject_unmount
class BetRemindTime extends Component<Props, {}> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      timer: '',
      time: '00:00:00'
    }
  }

  componentDidMount() {
    this.initTime()
  }

  componentWillUnmount() {
    if (this.state.timer) {
      this.state.timer.close()
    }
  }

  initTime = () => {
    if (this.state.timer) {
      this.state.timer.close()
    }
    let timer = new Timer(this.props.remainTime, (t: number) => {
      if (t < 10 && t > 0) {
        this.setState({
          timeCls: 'c-red'
        })
      } else {
        this.setState({
          timeCls: ''
        })
      }
      if (t <= 0) {
        this.state.timer.close()
        this.props.removeItem(this.props.gamedata)
      }
      this.setState({
        time: timeFormat(t * 1000)
      })
    })
    this.setState({
      timer: timer
    })
  }

  render() {
    return (
      <div className="lottery">
        <span className="issue">{ this.props.gamedata.issue }期</span>
        <span className="time">{this.state.time}</span>
      </div>
    )
  }
}

export default BetRemindTime