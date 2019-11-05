import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Select, DatePicker } from 'antd'
import { getAllGames, getGameTypeByGameId } from '../../game/games'
import dayjs from 'dayjs'
import { historyIssueByDate } from '../../http/APIs'
import Colors from '../../utils/colorConfig'
import { COLUMN_TYPES, getTypeValue } from '../../utils/report'
import { LOTTERY_TYPES } from '../../utils/config'


interface State {
  gameId: number;
  pageSizeIndex: number | string;
  searchDate: number | string;
  id: string;
  picker: any;
  pageSize: number;
  currentPage: number;
  totalSize: number;
  list: any[];
  gameType: string;
}

const totalGroup = [30, 50, 100, 200]
const timeGroup = ['今天', '昨天', '前天']
const games = getAllGames()

@inject("store")
@observer
class OpenIssueHistory extends Component<Props, object> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      gameId: games[0].id,
      pageSizeIndex: 0,
      searchDate: '',
      id: '',
      picker: null,
      pageSize: 20,
      currentPage: 1,
      totalSize: 1,
      list: [],
      gameType: ''
    }
  }
  
  componentDidMount() {
    this.getDataList()
  }

  getDataList = () => {
    let temp: any = ''
    if (this.state.searchDate !== '') {
      temp = dayjs()
      if (typeof this.state.searchDate === 'number') {
        switch (this.state.searchDate) {
          case 0:
            temp = temp.format('YYYY-MM-DD')
            break
          case 1:
            temp = temp.subtract(1, 'day').format('YYYY-MM-DD')
            break
          case 2:
            temp = temp.subtract(2, 'day').format('YYYY-MM-DD')
            break
          default:
            temp = temp.format('YYYY-MM-DD')
        }
      } else {
        temp = this.state.searchDate
      }
    }
    let params:any = {
      lotteryId: this.state.gameId,
    }
    if (temp) {
      params.date = temp
      params.page = this.state.currentPage
    } else {
      params.size = totalGroup[Number(this.state.pageSizeIndex)]
    }
    historyIssueByDate(params)
      .then((res: any) => {
        if (res.success === 1) {
          let type = getGameTypeByGameId(this.state.gameId)
          this.setState({
            list: res.data,
            gameType: type,
            currentPage: 1
          })
        }
      })

  }

  handleLotteryChange = (value: any) => {
    this.setState({
      gameId: value
    })
  }

  handleInputChange = (e: any) => {
    this.setState({
      id: e.target.value
    })
  }

  changeSearchDateIndex = (idx: number) => {
    this.setState({
      searchDate: idx,
      pageSizeIndex: '',
      picker: null
    })
  }

  goSearch = () => {
    this.setState({
      currentPage: 1
    }, () => {
      this.getDataList()
    })
  }

  dateChange = (date: any, dateString: string) => {
    this.setState({
      picker: date,
      searchDate: dateString,
      pageSizeIndex: ''
    })
  }

  disabledDate = (currentDate: any) => {
    let now = new Date().getTime()
    let current = currentDate.valueOf()
    let temp = dayjs().subtract(7, 'day').toDate().getTime()
    return now <= current || current <= temp
  }

  
  changePageSizeIndex = (idx: number) => {
    this.setState({
      searchDate: '',
      pageSizeIndex: idx,
      picker: null
    })
  }
  
  getRowKey = (record: any) => {
    return record.issue
  }

  // 
  getCols = () => {
    let baseArr = [
      {
        title: '日期',
        dataIndex: 'belongDate'
      },
      {
        title: '期号',
        dataIndex: 'issue',
        key: 'issue'
      },
      {
        title: '开奖号码',
        dataIndex: 'code',
        width: '1.9rem',
        render: (code: string, record: any) => {
          return code.split(',').map((num, index) => {
            return <span key={record.issue + 'code' + index} className="ball bg-orange">{ num }</span>
          })
        }
      }
    ]
    switch(this.state.gameType) {
      case LOTTERY_TYPES.SSC:
        return [
          ...baseArr,
          {
            title: '总和',
            width: '1.8rem',
            render: (code: string, record: any) => {
              return this.getTotal(record)
            }
          },
          {
            title: '龙虎(万个)',
            render: (code: string, record: any) => {
              return this.getlh(record)
            }
          },
          {
            title: '万位',
            render: (code: string, record: any) => {
              return this.getw(record)
            }
          },
          {
            title: '千位',
            render: (code: string, record: any) => {
              return this.getq(record)
            }
          },
          {
            title: '百位',
            render: (code: string, record: any) => {
              return this.getb(record)
            }
          },
          {
            title: '十位',
            render: (code: string, record: any) => {
              return this.gets(record)
            }
          },
          {
            title: '个位',
            render: (code: string, record: any) => {
              return this.getg(record)
            }
          }
        ]
      case LOTTERY_TYPES.G11X5:
        return [
          ...baseArr,
          {
            title: '总和',
            width: '1.8rem',
            render: (temp: string, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_ZH)
            }
          },
          {
            title: '总和尾',
            render: (temp: string, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_ZHW)
            }
          },
          {
            title: '龙虎',
            render: (temp: string, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_LH)
            }
          },
          {
            title: '第一位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_DYW)
            }
          },
          {
            title: '第二位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_DRW)
            }
          },
          {
            title: '第三位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_DSW)
            }
          },
          {
            title: '第四位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_DSIW)
            }
          },
          {
            title: '第五位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.G11X5_DWW)
            }
          }
        ]
      case LOTTERY_TYPES.PK10:
        return [
          ...baseArr,
          {
            title: '冠亚和',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.PK10_WIN_SUM)
            }
          },
          {
            title: '冠军',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.PK10_WIN_FIRST)
            }
          },
          {
            title: '亚军',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.PK10_WIN_SECOND)
            }
          },
          {
            title: '季军',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.PK10_WIN_THIRD)
            }
          },
          {
            title: '第四位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.PK10_WIN_FOURTH)
            }
          },
          {
            title: '第五位',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.PK10_WIN_FIFTH)
            }
          }
        ]
      case LOTTERY_TYPES.K3:
        return [
          ...baseArr,
          {
            title: '总和',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.K3_ZH)
            }
          },
          {
            title: '颜色',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.K3_COLOR)
            }
          },
          {
            title: '跨度',
            render: (temp: any, record: any) => {
              return this.getColumnData(record, this.state.gameType, COLUMN_TYPES.k3_SPAN)
            }
          }
        ]
      default:
        return baseArr
    }
  }

  getColumnData(row: any, lotteryType?: string, ctype?: string): any {
    if (!row) return;
    let codes: number[] = row.code.split(',').map((n: any) => parseInt(n, 10));
    let { dx, ds, lhh, total, color, span} = getTypeValue(codes, lotteryType, ctype);
    if (lotteryType === LOTTERY_TYPES.G11X5) {
      switch(ctype) {
        case COLUMN_TYPES.G11X5_ZH:
          return <div><span>{total}</span><span className={`rec ${ Colors.getStyle(dx) } mark-b`} >总{ dx }</span><span className={`rec mark ${ Colors.getStyle(ds) }`}>总{ ds }</span></div>;
        break;
        case COLUMN_TYPES.G11X5_ZHW:
          return <span className={`ball ${ Colors.getStyle(dx) }`} >{ dx }</span>;
        break;
        case COLUMN_TYPES.G11X5_LH:
          return <span className={`ball ${ Colors.getStyle(lhh) }`} >{ lhh }</span>;
        break;
        case COLUMN_TYPES.G11X5_DYW:
        case COLUMN_TYPES.G11X5_DRW:
        case COLUMN_TYPES.G11X5_DSW:
        case COLUMN_TYPES.G11X5_DSIW:
        case COLUMN_TYPES.G11X5_DWW:
          return <div><span className={`ball ${ Colors.getStyle(dx) }`} >{ dx }</span><span className={`ball ${ Colors.getStyle(ds) }`}>{ ds }</span></div>;
        break;
        default:
        break;
      }
    } else if (lotteryType === LOTTERY_TYPES.PK10) {
      switch(ctype) {
        case COLUMN_TYPES.PK10_WIN_SUM:
          return <div><span className={`ball ${ Colors.getStyle(dx) } mark-b`} >{ dx }</span><span className={`ball mark ${ Colors.getStyle(ds) }`}>{ ds }</span></div>;
        break;
        case COLUMN_TYPES.PK10_WIN_FIRST:
        case COLUMN_TYPES.PK10_WIN_SECOND:
        case COLUMN_TYPES.PK10_WIN_THIRD:
        case COLUMN_TYPES.PK10_WIN_FOURTH:
        case COLUMN_TYPES.PK10_WIN_FIFTH:
          return <div><span className={`ball ${ Colors.getStyle(dx) }`} >{ dx }</span><span className={`ball ${ Colors.getStyle(ds) }`}>{ ds }</span></div>;
        break;
        default:
        break;
      }
    } else if (lotteryType === LOTTERY_TYPES.K3) {
      switch(ctype) {
        case COLUMN_TYPES.K3_ZH:
          return <div><span className="cell-total">{ total }</span><span className={`rec ${ Colors.getStyle(dx) } mark-b`} >总{ dx }</span><span className={`rec mark ${ Colors.getStyle(ds) }`}>总{ ds }</span></div>;
        break;
        case COLUMN_TYPES.K3_COLOR:
          return <span>{ color }</span>;
        break;
        case COLUMN_TYPES.k3_SPAN:
          return <span>{ span }</span>;
        break;
        default:
        break;
      }
    }
  }

  getlh = (row: any) => {
    let temp: any = this.getMark(row.code, 1, '龙虎')
    return <span className={`ball ${ Colors.getStyle(temp[0]) }`}>{ temp[0] }</span>
  }

  getTotal = (row: any) => {
    let temp: any = this.getMark(row.code, 1, '总和')
    return <div><span>{ temp[0] }</span><span className={`rec ${ Colors.getStyle(temp[1]) } mark-b`} >{ temp[1] }</span><span className={`rec rec ${ Colors.getStyle(temp[2]) }`}>{ temp[2] }</span></div>
  }

  getw = (row: any) => {
    let temp: any = this.getMark(row.code, 1)
    return <div><span className={`ball ${ Colors.getStyle(temp[0]) }`} >{ temp[0] }</span><span className={`ball ${ Colors.getStyle(temp[1]) }`}>{ temp[1] }</span></div>
  }

  getq = (row: any) => {
    let temp: any =  this.getMark(row.code, 2)
    return <div><span className={`ball ${ Colors.getStyle(temp[0]) }`} >{ temp[0] }</span><span className={`ball ${ Colors.getStyle(temp[1]) }`}>{ temp[1] }</span></div>
  }

  getb = (row: any) => {
    let temp: any = this.getMark(row.code, 3)
    return <div><span className={`ball ${ Colors.getStyle(temp[0]) }`} >{ temp[0] }</span><span className={`ball ${ Colors.getStyle(temp[1]) }`}>{ temp[1] }</span></div>
  }

  gets = (row: any) => {
    let temp: any = this.getMark(row.code, 4)
    return <div><span className={`ball ${ Colors.getStyle(temp[0]) }`} >{ temp[0] }</span><span className={`ball ${ Colors.getStyle(temp[1]) }`}>{ temp[1] }</span></div>
  }

  getg = (row: any) => {
    let temp: any = this.getMark(row.code, 5)
    return <div><span className={`ball ${ Colors.getStyle(temp[0]) }`} >{ temp[0] }</span><span className={`ball ${ Colors.getStyle(temp[1]) }`}>{ temp[1] }</span></div>
  }

  getMark = (code: string, index: number, type?: string) => {
    let min = 4
    let tmin = 22
    let count = 0
    let nums = code.split(',')
    if (type === '总和') {
      nums.forEach(item => {
        count += parseInt(item)
      })
      return [count, count <= tmin ? '总小' : '总大', count % 2 ? '总单' : '总双']
    } else if (type === '龙虎') {
      let f = nums[0]
      let l = nums[4]
      if (f === l) {
        return '和'
      } else if (f < l) {
        return '虎' 
      } else {
        return '龙'
      }
    } else {
      let temp: number = Number(nums.slice(index - 1, index))
      return [temp <= min ? '小' : '大', temp % 2 ? '单' : '双']
    }
  }

  onCurrentPageChange = (page: any) => {
    this.setState({
      currentPage: page
    })
  }

  render() {
    return (
      <article className="open-issue-history-view">
        <div className="page-title active">历史开奖</div>
        <div className="search m-t-10">
          <label className="m-l-0">
            <span>彩种</span>
            <Select defaultValue={this.state.gameId} className="lottery-select" onChange={this.handleLotteryChange} >
              { games.map((game: any) => <Select.Option key={game.id} value={game.id}>{game.name}</Select.Option>) }
            </Select>
          </label>
          <div className="total-group">
            { totalGroup.map((num, index) => <span key={'size' + num} className={`${ index === this.state.pageSizeIndex ? 'active' : '' }`} onClick={() => this.changePageSizeIndex(index)}>最近{num}期</span>) }
          </div>
          <div className="time-group">
            { timeGroup.map((time, index) => <span key={index} onClick={() => this.changeSearchDateIndex(index)} className={`${index === this.state.searchDate ? 'active item' : 'item'}`} >{ time }</span>) }
          </div>
          <label>
            <DatePicker value={this.state.picker} disabledDate={this.disabledDate} className="w-1" onChange={this.dateChange} />
          </label>
          <label>
            <span className="self-btn bg-orange" onClick={this.goSearch}>查询</span>
          </label>
        </div>
        <Table pagination={{onChange: this.onCurrentPageChange, showSizeChanger: true, pageSizeOptions: ['20', '50', '100'], defaultPageSize: 20, current: this.state.currentPage}} rowKey={this.getRowKey} columns={this.getCols()} dataSource={this.state.list} />
      </article>
    )
  }
}

export default OpenIssueHistory;
