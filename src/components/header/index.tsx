import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';
import './index.styl';
@inject("store")
@observer
class Header extends Component<Props, object> {
  menus: any[] = [
    {
      id: '1',
      name: '彩种大厅',
      route: '/'
    },
    {
      id: '2',
      name: '投注记录',
      route: '/betRecords'
    },
    {
      id: '3',
      name: '历史开奖',
      route: '/openIssueHistory'
    },
    {
      id: '4',
      name: '玩法规则',
      route: '/playMethodRule'
    }
  ];
  activeIndex: string = '/';
  content: string[] = [];
  imgSrc: string = '';
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log(this.props.store.user.name);
    return (
      <section className="header-view flex ai-c">
        <div className="icon-logo"></div>
        <div></div>
        <Row className="flex ai-c">
          <Col className="username-wp flex ai-c r-cir jc-e pos-r mgr-30">
            <i className="icon-avatar pos-r">
              <img src={this.imgSrc} />
            </i>
            <i className="txt-c"></i>
          </Col>
          <Col className="flex ai-c r-cir jc-e balance-wp pos-r">
            <i className="inlb icon-money"></i>
            <span>
              <i className="inlb fs-18">{}</i>
              <i className="inlb">元</i>
            </span>
          </Col>
        </Row>
      </section>
    )
  }
}

export default Header;

