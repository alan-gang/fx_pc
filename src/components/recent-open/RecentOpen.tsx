import React, { Component, Fragment } from 'react'
import { methodsConfig } from '../../game/gameMethods'
import { getStyleTxtColor } from '../../utils/colorConfig'
import memoize from 'memoize-one'
import { GameMethodMenu } from '../../typings/games'

import './recentOpen.styl'
import { spawn } from 'child_process'
import { timingSafeEqual } from 'crypto'

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
  let tot: number = 0
  let range = props.type.range
  let nums = props.issue.code.split(',')
  if (Array.isArray(range)) {
    tot = range.reduce((curr, pre) => Number(nums.slice(curr.start, curr.end)[0]) + Number(nums.slice(pre.start, pre.end)[0]))
  } else {
    if (range) {
      tot = nums.slice(range.start, range.end).reduce((curr: any, pre: any) => Number(curr) + Number(pre))
    } else {
      tot = nums.reduce((curr: any, pre: any) => Number(curr) + Number(pre))
    }
  }
  let dx = tot > props.type.min ? '大' : '小'
  let ds = tot % 2 === 0 ? '双' : '单'
  return (
    <div>
      <span className="sum">{tot}</span>
      {
        props.type.nForm ? '' : <Fragment>
          <span className={`m-l-10 ${getStyleTxtColor(dx)}`}>{dx}</span>
          <span className={`m-l-10 ${getStyleTxtColor(ds)}`}>{ds}</span>
        </Fragment>
      }
      
    </div>
  )
}

const KD = (props: any) => {
  let nums = props.issue.code.split(',').sort((a: any, b: any) => Number(a) - Number(b))
  return <span className="sum">{nums[nums.length - 1] - nums[0]}</span>
}

const Color = (props: any) => {
  let red = 0
  let black = 0
  let nums = props.issue.code.split(',')
  nums.forEach((num: number) => {
    if (Number(num) === 1 || Number(num) === 4) {
      red += 1
    } else {
      black += 1
    }
  })
  if (!red) return <span className="color-text-span">全黑</span>
  if (!black) return <span className="color-text-span">全红</span>
  return <span className="color-text-span">{`${red}红${black}黑`}</span>
}

const LH = (props: any) => {
  let nums = props.issue.code.split(',')
  let range = props.type.range
  let num1 = 0
  let num2 = 0
  if (Array.isArray(range)) {
    num1 = Number(nums.slice(range[0].start, range[0].end))
    num2 = Number(nums.slice(range[1].start, range[1].end))
  } else {
    num1 = Number(nums.slice(range.start, range.start + 1))
    num2 = Number(nums.slice(range.start + 1, range.start + 2))
  }
  if (num1 === num2) {
    return <span className="text-green">和</span>
  }
  return num1 > num2 ? <span className="text-r">龙</span> : <span className="txt-b">虎</span>
  
}

class RecentOpen extends Component<Props, Object> {
  constructor(props: Props) {
    super(props)
  }

  getMethod = memoize((gameType ,curMenuIndex, curSubMenuIndex) => {
    return methodsConfig[gameType][curMenuIndex]
  })

  get method() {
    let temp: GameMethodMenu = this.getMethod(this.props.gameType, this.props.curMenuIndex, this.props.curSubMenuIndex)
    if (temp.recentChild && temp.subMethods) {
      return temp.subMethods[this.props.curSubMenuIndex].recentType
    }
    return temp.recentType
  }

  getOpenCode = (issue: any) => {
    let range = this.method && this.method[0].range
    let nums = issue.code.split(',')
    let arr: any[] = []
    if (Array.isArray(range)) {
      nums.forEach((num: string, index: number) => {
        if ((index >= range[0].start && index < range[0].end) || (index >= range[1].start && index < range[1].end)) {
          arr.push(<span key={index} className="text-orange">{num}</span>)
        }
      })
      return arr
    }
    let temp = nums.map((num: string, index: number) => {
      let cn = ''
      if (range && (index >= range.start && index < range.end)) {
        cn = 'text-orange'
      }
      return <span key={index} className={cn}>{num}</span>
    })
    return (<div className='code'>{temp}</div>)
  }

  render() {
    
    return (
      <div className="recent-open-comp">
        <div className="recent-open-header recent-item">
          <div>期号</div>
          {((this.method && this.method[0].changeTitle) || ['开奖号码']).map((title: string, index: number, arr: any[]) => <div className={arr.length > 1 ? 'other-title' : ''} key={title}>{title}</div>)}
          {this.method && this.method.map((tp: any, index: number) => {
            return (<div key={tp.title} className={tp.type + ' other-title'}>{tp.title}</div>)
          })}
        </div>
        <div className="recent-list">
          {
            this.props.issueList.map(issue => {

              return (<div key={issue.issue} className="recent-item">
                <div>{issue.issue.slice(-4)}</div>
                {this.getOpenCode(issue)}
                {
                  this.method && this.method.map((tp: any, index: number) => {
                    switch(tp.type) {
                      case 'dx':
                        return <DX key={index} issue={issue} type={tp} />
                      case 'ds':
                        return <DS key={index} issue={issue} type={tp} />
                      case 'hz':
                        return <HZ key={index} issue={issue} type={tp} />
                      case 'kd':
                        return <KD key={index} issue={issue} />
                      case 'ys':
                        return <Color key={index} issue={issue} />
                      case 'lh':
                        return <LH key={index} issue={issue} type={tp} />
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