import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Input, Button, message } from 'antd';
import CoinSet from '../coin-set';
import APIs from '../../http/APIs';

import './index.styl';

interface Props {
  store?: any;
  betCount: number;
  amount: number;
  updateDefaultInitMethodItemAmount(amount: number): void;
}

@inject('store')
@observer
class OrderBar extends Component<Props, object> {
  state = {
    amount: 2
  }
  showLoading: boolean = false;
  coinChooiced = (value: number) => {
    this.setState({amount: value});
    this.props.updateDefaultInitMethodItemAmount(value);
  }
  onResetHandler = () => {

  }
  onOrderHandler = () => {

  }
  validate(): boolean {
    return true;
  }
  getParams(): object {
    return {}
  }
  order() {
    if (!this.validate()) {
      return null;
    }
    let params = this.getParams();
    APIs.bet({betData: JSON.stringify(params)}).then(({success, msg}: any) => {
      this.showLoading = false;
      if (success === 1) {
        // this.updateBalance();
        message.success('投注成功');
        // this.betFinish(true);
      } else {
        message.warning(msg || '投注失败');
        // this.betFinish(false);
      }
    })
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
          <Col span={10}><CoinSet coinChooiced={this.coinChooiced} /></Col>
          <Col span={5} className="txt-r">
            已选 <span className="txt-red">{this.props.betCount}</span> 注 共 <span className="txt-red"> {this.props.amount} </span>元
          </Col>
          <Col span={5} className="flex ai-c jc-e btns-wp">
            <Button type="primary" className="btn-reset" onClick={this.onResetHandler}>重置</Button>
            <Button type="danger" className="btn-order" onClick={this.onOrderHandler}>一键下单</Button>
          </Col>
        </Row>
      </section>
    )
  }
}

export default OrderBar;
