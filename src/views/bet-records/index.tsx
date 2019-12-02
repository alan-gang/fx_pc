import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { orderList } from '../../http/APIs'
import { numberWithCommas } from '../../utils/num'
import { Table, Select, Input } from 'antd'
import { getAllGames } from '../../game/games'

import Colors from '../../utils/colorConfig'

import './index.styl'

interface State {
  orderList: object[];
  totalSize: number;
  pageSize: number;
  currentPage: number;
  issueRangeButtons: string[];
  quickIssueRangeIdx: number;
  games: object[];
  date: any;
  statusCls: string[];
  status: number;
  id: string;
  issue: string;
  stEt: string[];
  gameId: string;
  gameName: string;
  isShowChangeLottery: boolean;
  searchDateIndex: number;
}

const timeGroup = ['今天', '昨天', '前天', '最近一周']
const dateMappingConfig: any = { d0: [0, 0], d1: [1, 1], d2: [2, 2], d3: [6, 0] }
const statusList = ['未开奖', '已中奖', '未中奖', '已撤单', '平局']

@inject("store")
@observer
class BetRecords extends Component<Props, object> {
  state: State
  constructor(props: Props) {
    super(props);
    this.state = {
      orderList: [],
      totalSize: 0,
      pageSize: 20,
      currentPage: 1,
      issueRangeButtons: ['最近30期', '最近50期', '最近100期', '最近200期'],
      quickIssueRangeIdx: -1,
      games: [],
      date: null,
      statusCls: ['', 'text-green', 'text-r', 'text-gray', 'bgc-gray', 'bgc-gray'],
      status: -1,
      id: '',
      issue: '',
      stEt: [],
      gameId: '',
      gameName: '全部',
      isShowChangeLottery: false,
      searchDateIndex: 0
    }
  }

  componentWillMount() {
    this.toDate()
    this.getOrderList()
  }

  getOrderList = (params: object = {}) => {
    params = Object.assign({
      projectId: this.state.id,
      beginDate: this.state.stEt[0],
      endDate: this.state.stEt[1],
      stat: this.state.status,
      // scope: '',
      lotteryId: this.state.gameId,
      issue: this.state.issue,
      // modes: this.mode !== '' ? this.mode + 1 : '',
      page: this.state.currentPage,
      pageSize: this.state.pageSize,
      isfast: 1
    })
    orderList(params)
      .then((data: any) => {
        if (data.success === 1) {
          this.setState({
            orderList: data.recordList,
            totalSize: data.totalSize
          })
        }
      })
  }

  choicedSearchCondition = (dates: { startDate: any; endDate: any; }) => {
    this.setState({
      stEt: [dates.startDate, dates.endDate]
    })
  }

  pageChanged = (page: any) => {
    this.setState({
      currentPage: page
    }, () => {
      this.getOrderList()
    })
  }

  query = () => {
    this.setState({
      currentPage: 1
    }, () => {
      this.getOrderList()
    })
  }

  getSummaries = (param: any) => {
    const { columns, data } = param
    const sums: any = []
    let N = [1, 2, 3, 4, 5, 8]
    columns.forEach((column: { property: string | number; }, index: number) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      const values = data.map((item: { [x: string]: any; }) => Number(item[column.property]));
      if (values.every((value: number) => !isNaN(value)) && index !== N[0] && index !== N[1] && index !== N[2] && index !== N[3] && index !== N[4] && index !== N[5]) {
        sums[index] = values.reduce((prev: string | number, curr: string | number) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return Number(prev) + Number(curr)
          } else {
            return prev
          }
        }, 0)
        // sums[index] += ' 元'
        sums[index] = ((index === 6 ? '-' : '+') + numberWithCommas(sums[index].toFixed(4)))
      } else {
        sums[index] = ''
      }
    })
    return sums
  }

  getStyle = (data: string) => {
    if (/\d/.test(data)) return '';
    let datas = data.split('-');
    data = datas.length > 1 ? datas[1] : datas[0]
    return Colors.getStyle(data);
  }

  closeChangeLottery = () => {
    this.setState({
      isShowChangeLottery: false
    })
  }

  choicedGame = (g: any) => {
    this.setState({
      gameId: g.id,
      gameName: g.n
    }, () => {
      this.closeChangeLottery()
    })
  }

  changeSearchDateIndex = (idx: number) => {
    this.setState({
      searchDateIndex: idx
    }, () => {
      this.toDate()
    })
  }

  public toDate() {
    const sDate = new Date();
    sDate.setDate(sDate.getDate() - dateMappingConfig['d' + this.state.searchDateIndex][0]);
    sDate.setHours(0);
    sDate.setMinutes(0);
    sDate.setSeconds(0);
    let days: any = sDate.getDate();
    let month: any = sDate.getMonth() + 1;
    days = String(days).padStart(2, '0');
    month = String(month).padStart(2, '0');
    const startDateStr = `${sDate.getFullYear()}${month}${days}000000`;

    const eDate = new Date();
    eDate.setDate(eDate.getDate() - dateMappingConfig['d' + this.state.searchDateIndex][1]);
    eDate.setHours(23);
    eDate.setMinutes(59);
    eDate.setSeconds(59);
    let edays: any = eDate.getDate();
    let emonth: any = eDate.getMonth() + 1;
    edays = String(edays).padStart(2, '0');
    emonth = String(emonth).padStart(2, '0');
    const endDateStr = `${eDate.getFullYear()}${emonth}${edays}235959`;
    this.choicedSearchCondition({startDate: startDateStr, endDate: endDateStr})
  }

  handleLotteryChange = (value: any) => {
    this.setState({
      gameId: value
    })
  }

  handleStatusChange = (value: any) => {
    this.setState({
      status: value
    })
  }

  getcols = () => {
    
      return [
        {
          title: '注单编号',
          dataIndex: 'projectId'
        },
        {
          title: '投注时间',
          dataIndex: 'writeTime',
          width: 160
        },
        {
          title: '游戏',
          dataIndex: 'lotteryName',
        },
        {
          title: '玩法',
          dataIndex: 'methodName',
        },
        {
          title: '投注内容',
          dataIndex: 'code',
          width: 180,
          render: (code: string, record: any) => <div><span className={`inlb txt-c code-bg ${ this.getStyle(code) }`}>{code}</span><span className="odd text-orange">{ (parseFloat(record.dyPointDec.split('-')[0]) / 10).toFixed(3) }</span></div>
        },
        {
          title: '期号',
          dataIndex: 'issue'
        },
        {
          title: '金额',
          dataIndex: 'totalPrice',
          render: (price: any) => ('-' + price)
        },
        {
          title: '奖金',
          dataIndex: 'bonus',
          render: (bonus: any, record: any) => {
            let temp = Number(bonus).toFixed(2)
            if (record.stat === 0) {
              return '--'
            }
            if (bonus > 0) {
              return <span className="text-r">+{ temp }</span>
            }
            return temp
          }
        },
        {
          title: '状态',
          dataIndex: 'stat',
          render: (stat: number) => <span className={`inlb status-b txt-c ${ this.state.statusCls.slice(1)[stat] }`}>{ statusList[stat] }</span>
        }
      ]
  }

  // 每页显示条数变化
  onShowSizeChange = (current:any , pageSize: any) => {
    this.setState({
      currentPage: 1,
      pageSize: Number(pageSize)
    }, () => {
      this.getOrderList()
    })
  }

  onCurrentPageChange = (page: any) => {
    this.setState({
      currentPage: page
    }, () => {
      this.getOrderList()
    })
  }

  getRowKey = (record: any) => {
    return record.projectId
  }

  goSearch = () => {
    this.setState({
      currentPage: 1
    }, () => {
      this.getOrderList()
    })
  }

  handleInputChange = (e: any) => {
    this.setState({
      id: e.target.value
    })
  }

  render() {
    return (
      <article className="bet-records-view">
        <div className="page-title active">投注记录</div>
        <div className="container">
          <div className="search">
            <div className="time-group">
              <span>时间</span>
              { timeGroup.map((time, index) => <span key={index} onClick={() => this.changeSearchDateIndex(index)} className={`${index === this.state.searchDateIndex ? 'active item' : 'item'}`} >{ time }</span>) }
            </div>
            <label>
              <span>彩种</span>
              <Select defaultValue="" className="lottery-select" onChange={this.handleLotteryChange} >
                <Select.Option value="">全部</Select.Option>
                { getAllGames().map((game: any) => <Select.Option key={game.id} value={game.id}>{game.name}</Select.Option>) }
              </Select>
            </label>
            <label>
              <span>状态</span>
              <Select defaultValue={-1} className="lottery-select" onChange={this.handleStatusChange} >
                <Select.Option value={-1}>全部</Select.Option>
                { statusList.map((stat, index) => <Select.Option key={index} value={index}>{stat}</Select.Option>) }
              </Select>
            </label>
            <label>
              <span>编号</span>
              <Input className="number-input" onChange={this.handleInputChange} value={this.state.id} type="text" placeholder="请输入编号" />
            </label>
            <label>
              <span className="self-btn bg-orange" onClick={this.goSearch}>查询</span>
            </label>
          </div>
          <Table rowKey={this.getRowKey} pagination={{onChange: this.onCurrentPageChange, onShowSizeChange: this.onShowSizeChange,showSizeChanger: true, pageSizeOptions: ['20', '50', '100'], defaultPageSize: this.state.pageSize, current: this.state.currentPage, total: this.state.totalSize}} columns={this.getcols()} dataSource={this.state.orderList} />
        </div>
      </article>
    )
  }
}

export default BetRecords;
