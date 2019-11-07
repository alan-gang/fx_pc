import React, { Component } from 'react'
import { methodsConfig } from '../../game/gameMethods'
import { getStyleTxtColor } from '../../utils/colorConfig'
import memoize from 'memoize-one'

import './recentOpen.styl'

interface Props {
  gameId: number;
  issueList: any[];
  gameType: string;
  curMenuIndex: number;
  curSubMenuIndex: number;
//   methodid: string;
//   type: any;
}

const DX = (props: any) => {
  return (
    <div className="letter-2">
      {props.issue.code.split(',').map((num: string, index: number) => {
        let text = Number(num) > props.type.min ? '大' : '小'
        return <span key={index} className={`${getStyleTxtColor(text)}`}>{text}</span>
      })}
    </div>
  )
}

const DS = (props: any) => {
  return (
    <div className="letter-2">
      {props.issue.code.split(',').map((num: string, index: number) => {
        let text = Number(num) % 2 === 0 ? '双' : '单'
        return <span key={index} className={`${getStyleTxtColor(text)}`}>{text}</span>
      })}
    </div>
  )
}

const HZ = (props: any) => {
  let tot = props.issue.code.split(',').reduce((curr: any, pre: any) => Number(curr) + Number(pre))
  let dx = tot > props.type.min ? '大' : '小'
  let ds = tot % 2 === 0 ? '双' : '单'
  return (
    <div>
      <span>{tot}</span>
      <span className={`m-l-10 ${getStyleTxtColor(dx)}`}>{dx}</span>
      <span className={`m-l-10 ${getStyleTxtColor(ds)}`}>{ds}</span>
    </div>
  )
}

class RecentOpen extends Component<Props, Object> {
  constructor(props: Props) {
    super(props)
  }

  getMethod = memoize((gameType ,curMenuIndex, curSubMenuIndex) => {
    return methodsConfig[gameType][curMenuIndex]
  })

  get method() {
    return this.getMethod(this.props.gameType, this.props.curMenuIndex, this.props.curSubMenuIndex)
  }

  render() {
    
    return (
      <div className="recent-open-comp">
        <div className="recent-open-header recent-item">
          <div>期号</div>
          <div>开奖号码</div>
          {this.method.recentType && this.method.recentType.map((tp: any, index: number) => {
            return (<div key={tp.title} className={tp.type}>{tp.title}</div>)
          })}
        </div>
        <div className="recent-list">
          {
            this.props.issueList.map(issue => {

              return (<div key={issue.issue} className="recent-item">
                <div>{issue.issue.slice(-4)}</div>
                <div className="code">
                  {issue.code.split(',').map((num: string, index: number) => <span key={index}>{num}</span>)}
                </div>
                {
                  this.method.recentType && this.method.recentType.map((tp: any, index: number) => {
                    switch(tp.type) {
                      case 'dx':
                        return <DX key={index} issue={issue} type={tp} />
                      case 'ds':
                        return <DS key={index} issue={issue} type={tp} />
                      case 'hz':
                        return <HZ key={index} issue={issue} type={tp} />
                      default: return ''
                    }
                  })
                }
              </div>)
            })
          }
        </div>
      </div>
    )
  }
}

export default RecentOpen