import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Input, Button, message, Modal } from 'antd';
import CoinSet from '../coin-set';
import APIs from '../../http/APIs';

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

interface State {
  amount: number;
}

@inject('store')
@observer
class OrderBar extends Component<Props, object> {
  showLoading: boolean = false;
  state: State;
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
    props.curGameMethodItems.forEach((methodItem: any) => {
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
      })
    });
    return params;
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
