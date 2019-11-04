import React, { Component } from 'react'

import './recentOpen.styl'

interface Props {
  gameId: number
}

class RecentOpen extends Component<Props, Object> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div className="recent-open-comp">
        <div className="recent-open-header recent-item">
          <div>期号</div>
          <div>开奖号码</div>
          <div>和值</div>
        </div>
        <div className="recent-list">
          <div className="recent-item">
            <div>0053</div>
            <div className="code">
              <span className="open">579</span>
              23
            </div>
            <div className="sum">
              31
              <span>小</span>
              <span>单</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecentOpen