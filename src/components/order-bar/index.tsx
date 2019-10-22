import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Input, Button } from 'antd';
import CoinSet from '../coin-set';

import './index.styl';

@inject('store')
@observer
class OrderBar extends Component<Props, object> {
  state = {
    amount: 2
  }
  coinChooiced = (value: number) => {
    this.setState({amount: value})
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
            已选 <span className="txt-red">1</span> 注 共 <span className="txt-red"> 2.000 </span>元
          </Col>
          <Col span={5} className="flex ai-c jc-e btns-wp">
            <Button type="primary" className="btn-reset">重置</Button>
            <Button type="danger" className="btn-order">一键下单</Button>
          </Col>
        </Row>
      </section>
    )
  }
}

export default OrderBar;
