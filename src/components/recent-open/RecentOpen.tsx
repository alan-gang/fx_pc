import React, { Component, Fragment } from 'react'
import { methodsConfig } from '../../game/gameMethods'
import { getStyleTxtColor } from '../../utils/colorConfig'
import memoize from 'memoize-one'
import { GameMethodMenu } from '../../typings/games'
import { LOTTERY_TYPES } from '../../utils/config'
import './recentOpen.styl'
import Bus from 'src/utils/eventBus'
import { isTriple } from '../../utils/game';

interface Props {
  gameId: number;
  issueList: any[];
  gameType: string;
  curMenuIndex: number;
  curSubMenuIndex: number;
//   methodid: string;
//   type: any;
}

interface State {
  selectMenu: string;
}

const DX = (props: any) => {
  return (
    <div className="letter-2">
      {props.issue.code.split(',').map((num: string, index: number) => {
        let text = Number(num) > props.type.min ? '大' : '小'
        if (props.type.sum) text = Number(num) === props.type.sum ? '和' : text
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
  if (props.gameType === LOTTERY_TYPES.K3 && isTriple(nums)) {
    ds = dx = '豹';
  }
  if (props.gameType === LOTTERY_TYPES.G11X5 && tot === props.type.min) {
    dx = '和';
  }
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

const getSsc_syxw = () => ({
  'wq_lhh': {
    title: '万千',
    type: 'lh',
    range: {start: 0, end: 2}
  },
  'wb_lhh': {
    title: '万百',
    type: 'lh',
    range: [{start: 0, end: 1}, {start: 2, end: 3}]
  },
  'ws_lhh': {
    title: '万十',
    type: 'lh',
    range: [{start: 0, end: 1}, {start: 3, end: 4}]
  },
  'wg_lhh': {
    title: '万个',
    type: 'lh',
    range: [{start: 0, end: 1}, {start: 4, end: 5}]
  },
  'qb_lhh': {
    title: '千百',
    type: 'lh',
    range: [{start: 1, end: 2}, {start: 2, end: 3}]
  },
  'qs_lhh': {
    title: '千十',
    type: 'lh',
    range: [{start: 1, end: 2}, {start: 3, end: 4}]
  },
  'qg_lhh': {
    title: '千个',
    type: 'lh',
    range: [{start: 1, end: 2}, {start: 4, end: 5}]
  },
  'bs_lhh': {
    title: '百十',
    type: 'lh',
    range: [{start: 2, end: 3}, {start: 3, end: 4}]
  },
  'bg_lhh': {
    title: '百个',
    type: 'lh',
    range: [{start: 2, end: 3}, {start: 4, end: 5}]
  },
  'gw_lhh': {
    title: '个位',
    type: 'lh',
    range: [{start: 3, end: 4}, {start: 4, end: 5}]
  },
  'sg_lhh': {
    title: '个位',
    type: 'lh',
    range: [{start: 3, end: 4}, {start: 4, end: 5}]
  }
})
const changeT = (titles: any, obj: any) => {
  let keys = Object.keys(obj)
  titles.forEach((title: string, index: number) => {
    obj[keys[index]].title = title
  })
  return obj
}
let lhMap: any = {
  'ssc': getSsc_syxw(),
  '11x5': changeT(['一vs二', '一vs三', '一vs四', '一vs五', '二vs三', '二vs四', '二vs五', '三vs四', '三vs五', '四vs五', '四vs五'], getSsc_syxw()),
  'pk10': {
    '1vs10_lhh': {
      title: '一vs十',
      changeTitle: ['冠军', '第十名'],
      type: 'lh',
      range: [{start: 0, end: 1}, {start: 9, end: 10}]
    },
    '2vs9_lhh': {
      title: '二vs九',
      changeTitle: ['亚军', '第九名'],
      type: 'lh',
      range: [{start: 1, end: 2}, {start: 8, end: 9}]
    },
    '3vs8_lhh': {
      title: '三vs八',
      changeTitle: ['季军', '第八名'],
      type: 'lh',
      range: [{start: 2, end: 3}, {start: 7, end: 8}]
    },
    '4vs7_lhh': {
      title: '四vs七',
      changeTitle: ['第四名', '第七名'],
      type: 'lh',
      range: [{start: 3, end: 4}, {start: 6, end: 7}]
    },
    '5vs6_lhh': {
      title: '五vs六',
      changeTitle: ['第五名', '第六名'],
      type: 'lh',
      range: [{start: 4, end: 5}, {start: 5, end: 6}]
    }
  }
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
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      selectMenu: ''
    }
  }

  getMethod = memoize((gameType ,curMenuIndex, curSubMenuIndex) => {
    return methodsConfig[gameType][curMenuIndex]
  })

  get method() {
    // console.log('info method 0=', this.props.gameType, this.props.curMenuIndex, this.props.curSubMenuIndex, this.state.selectMenu)
    let temp: GameMethodMenu = this.getMethod(this.props.gameType, this.props.curMenuIndex, this.props.curSubMenuIndex)
    if (this.state.selectMenu.indexOf('_lhh') !== -1 && lhMap[this.props.gameType]) {
      return [lhMap[this.props.gameType][this.state.selectMenu]]
    }
    if (temp && temp.recentChild && temp.subMethods) {
      return temp.subMethods[this.props.curSubMenuIndex].recentType
    }
    if (temp) {
      return temp.recentType
    }
  }

  componentWillMount() {
    Bus.addListener('ludanSelectMenuChange', this.listenLudanSelectChange)
  }

  componentWillUnmount() {
    Bus.removeListener('ludanSelectMenuChange', this.listenLudanSelectChange)
  }

  listenLudanSelectChange = (menuName: string) => {
    this.setState({
      selectMenu: menuName
    })
  } 

  getOpenCode = (issue: any) => {
    let range = this.method && this.method[0] && this.method[0].range
    let changeTitle = this.method && this.method[0] && this.method[0].changeTitle
    let nums = issue.code.split(',')
    let arr: any[] = []
    if (Array.isArray(changeTitle) && Array.isArray(range)) {
      nums.forEach((num: string, index: number) => {
        if ((index >= range[0].start && index < range[0].end) || (index >= range[1].start && index < range[1].end)) {
          arr.push(<span key={index} className="text-orange min-w-36">{num}</span>)
        }
      })
      if (changeTitle && changeTitle.length < 2) return (<div className='code'>{arr}</div>)
      return arr
    }
    let temp = nums.map((num: string, index: number) => {
      let cn = ''
      if (Array.isArray(range)) {
        range.some((r: any) => {
          if (index >= r.start && index < r.end) {
            cn = 'text-orange'
            return true
          }
        })
      } else {
        if (range && (index >= range.start && index < range.end)) {
          cn = 'text-orange'
        }
      }
      return <span key={index} className={`${cn} open-num n-${num}`}>{this.props.gameType === LOTTERY_TYPES.K3 ? '' : num }</span>
    })
    return (<div className='code'>{temp}</div>)
  }

  render() {
    return (
      <div className={`recent-open-comp ${this.props.gameType}`}>
        <div className="recent-open-header recent-item">
          <div>期号</div>
          {((this.method && this.method[0] && this.method[0].changeTitle) || ['开奖号码']).map((title: string, index: number, arr: any[]) => <div className={arr.length > 1 ? 'other-title' : ''} key={title}>{title}</div>)}
          {this.method && this.method.map((tp: any = {}, index: number) => {
            return (<div key={tp.title} className={tp.type + ' other-title'}>{tp.title}</div>)
          })}
        </div>
        <div className="recent-list">
          {
            this.props.issueList.map(issue => {
              return (<div key={issue.lottId + 'ltId' + issue.issue + this.state.selectMenu} className="recent-item">
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
                          return <HZ key={index} issue={issue} type={tp} gameType={this.props.gameType} />
                        case 'kd':
                          return <KD key={index} issue={issue} />
                        case 'ys':
                          return <Color key={index} issue={issue} />
                        case 'lh':
                          return <LH key={index} selectMenu={this.state.selectMenu} issue={issue} type={tp} />
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