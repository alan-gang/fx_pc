import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Input, Button, message, Modal } from 'antd';
import CoinSet from '../coin-set';
import APIs from '../../http/APIs';
import calc from '../../game/calc';

import './index.styl';

interface Props {
  store?: any;
  gameId: number;
  curIssue?: string;
  betCount: number;
  amount: number;
  curGameMethodItems: any[];
  defaultInitMethodItemAmount: number;
  updateDefaultInitMethodItemAmount(amount: number): void;
  orderFinishCB(status: boolean): void;
  resetSelectedOfAllMethodItem(): void;
}

interface DataMethodItem {
  id: string;
  rows: any[];
}

interface State {
  amount: number;
}

@inject('store')
@observer
class OrderBar extends Component<Props, object> {
  showLoading: boolean = false;
  state: State;
  calc: any = calc;
  constructor(props: Props) {
    super(props);
    this.state = {
      amount: this.props.defaultInitMethodItemAmount
    }
  }
  coinChoosed = (value: number) => {
    this.setState({amount: value});
    this.props.updateDefaultInitMethodItemAmount(value);
  }
  onResetHandler = () => {
    Modal.confirm({
      centered: true,
      title: '您确定要重置选中的投注？',
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.resetSelectedOfAllMethodItem();
      }
    });
  }
  onOrderHandler = () => {
    this.order();
  }
  validate(params: any): boolean {
    if (!params.issue) {
      message.warning('获取游戏期号失败，请刷新后重试！');
      return false;
    } else if(!params.betList || params.betList.length <= 0) {
      return false;
    }
    return true;
  }
  getParams(): object {
    // betData: {"lotteryId":1,"issue":"191024036","totProjs":4,"totMoney":80,"isusefree":0,"betList":[{"methodId":"1251","projs":1,"money":"20","content":"总大"},{"methodId":"1251","projs":1,"money":"20","content":"总小"},{"methodId":"1251","projs":1,"money":"20","content":"总单"},{"methodId":"1251","projs":1,"money":"20","content":"总双"}],"isFastBet":2,"limitLevel":2}
    // betData: {"lotteryId":29,"issue":"","totProjs":4,"totMoney":200,"isusefree":0,"betList":[{"methodId":"1251","projs":1,"money":"50","content":"总大"},{"methodId":"1251","projs":1,"money":"50","content":"总小"},{"methodId":"1251","projs":1,"money":"50","content":"总单"},{"methodId":"1251","projs":1,"money":"50","content":"总双"}],"isFastBet":1,"limitLevel":2}
    let props = this.props;
    let curGameMethodItems = props.curGameMethodItems;
    let params: any = {
      lotteryId: props.gameId,
      issue: props.curIssue,
      totProjs: 0,
      totMoney: 0,
      isusefree: 0,
      betList: [],
      isFastBet: 1,
      limitLevel: 2
    };
    let pos: string = '';
    let val: string = '';
    let content: string = '';
    let betCount: number = 0;
    curGameMethodItems.forEach((methodItem: any) => {
      if (['rx_nzn'].includes(methodItem.methodTypeName)) {
        betCount = this.calcBet();
        params.totMoney = this.state.amount * betCount;
        content = methodItem.rows[0].nc.join(',');
        params.betList.push({methodId: methodItem.id.split(':')[0], projs: 1, money: params.totMoney, content});
        params.totProjs = params.betList.length;
      } else if (['zux_q2', 'zux_q3'].includes(methodItem.methodTypeName)) {
        // 组选
        betCount = this.calcBet();
        params.totMoney = this.state.amount * betCount;
        content = methodItem.rows[0].nc.join(',');
        params.betList.push({methodId: methodItem.id.split(':')[0], projs: 1, money: params.totMoney, content});
        params.totProjs = params.betList.length;
      } else if (['zx_q2', 'zx_q3'].includes(methodItem.methodTypeName)) {
        // 直选 前二、三
        let nc = methodItem.rows.map((row: any) => {
          return row.nc;
        });
        let contents: any[] = [];
        let param = {
          methodId: methodItem.id.split(':')[0],
          projs: 1,
          money: this.state.amount
        }
        for (let i = 0; i < nc.length; i++) {
          for (let j = 0; j < nc[i].length; j++) {
            if (!nc[i + 1]) { continue; }
            for (let k = 0; k < nc[i + 1].length; k++) {
              if (nc.length >= 3) {
                if (!nc[i + 2]) { continue; }
                for (let m = 0; m < nc[i + 2].length; m++) {
                  contents.push(Object.assign({
                    content: `${nc[i][j]},${nc[i + 1][k]},${nc[i + 2][m]}`
                  }, param));
                }
              } else {
                contents.push(Object.assign({
                  content: `${nc[i][j]},${nc[i + 1][k]}`
                }, param));
              }
            }
          }
        }
        betCount = this.calcBet();
        params.totMoney = this.state.amount * betCount;
        params.betList = contents;
        params.totProjs = params.betList.length;
      } else {
        methodItem.rows.forEach((row: any) => {
          row.vs.forEach((vsItem: any) => {
            if (vsItem.s) {
              params.totMoney += parseInt(vsItem.amt, 10);
              params.totProjs++;
              pos = row.nonasv ? '' : row.p || row.n;
              val = vsItem.p ? (vsItem.p + '-' + (vsItem.pv || vsItem.n)) : (vsItem.pv || vsItem.n)
              content = pos ? pos + '-' + val : val;
              params.betList.push({methodId: methodItem.id.split(':')[0], projs: 1, money: vsItem.amt, content});
            }
          });
        });
      }
    });
    return params;
  }
  calcBet() {
    let curGameMethodItems = this.props.curGameMethodItems;
    let methodList: DataMethodItem[] = [];
    let method: any;
    let betCount: number = 0;

    // 构造注数计算格式
    curGameMethodItems.forEach((methodItem: DataMethodItem) => {
      method = {id: methodItem.id, rows: []};
      methodItem.rows.forEach((row: any) => {
        method.rows.push(row.nc);
      });
      methodList.push(method);
    });
    
    methodList = methodList.map((methodItem: DataMethodItem) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        return row.length;
      })
      return methodItem;
    });

    // 总注数
    methodList.forEach((methodItem: DataMethodItem) => {
      betCount += this.calc[methodItem.id]({nsl: methodItem.rows});
    });

    return betCount;
  }
  order() {
    let params = this.getParams();
    if (!this.validate(params)) {
      return null;
    }
    APIs.bet({betData: JSON.stringify(params)}).then(({success, msg}: any) => {
      this.showLoading = false;
      if (success === 1) {
        // this.updateBalance();
        Modal.success({
          centered: true,
          title: '投注成功',
          content: ''
        });
        this.props.orderFinishCB(true);
      } else {
        Modal.error({
          centered: true,
          title: msg || '投注失败',
          content: ''
        });
        this.props.orderFinishCB(false);
      }
    });
  }
  render() {
    return (
      <section className="order-bar-view">
        <Row className="flex ai-c ">
          <Col span={4}>
            <div className="flex ai-c fast-amount-wp">
              <span className="flex ai-c jc-c">快速金额</span>
              <Input className="fast-amount" value={this.state.amount} />
            </div>  
          </Col>
          <Col span={10}><CoinSet coinChoosed={this.coinChoosed} /></Col>
          <Col span={5} className="txt-r">
            已选 <span className="txt-red">{this.props.betCount}</span> 注 共 <span className="txt-red"> {this.props.amount} </span>元
          </Col>
          <Col span={5} className="flex ai-c jc-e btns-wp">
            <Button type="primary" className="btn-reset" onClick={this.onResetHandler}>重置</Button>
            <Button type="danger" className="btn-order" disabled={this.props.betCount <= 0} onClick={this.onOrderHandler}>一键下单</Button>
          </Col>
        </Row>
      </section>
    )
  }
}

export default OrderBar;
