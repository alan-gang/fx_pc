import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom'

import './index.styl';
@inject("store")
@observer
class Header extends Component<Props, object> {
  menus: any[] = [
    {
      id: '1',
      name: '彩种大厅',
      route: '/',
      exact: true
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
    return (
      <section className="header-view flex ai-c">
        <div className="wrap">
          <div className="icon-logo"></div>
          <div className="inline-item">
            会员账号：<span className="username t-yellow f-14">{ this.props.store.user.name }</span>
          </div>
          <div className="inline-item bg-icon-money">
            <Icon className="m-r-10" type="pay-circle" />账户余额：{ this.props.store.user.balance }
          </div>
          <div className="navs flt-r">
            { this.getNavList() }
          </div>
        </div>
      </section>
    )
  }

  public getNavList() {
    return this.menus.map((nav) => {
      return (
        <NavLink 
          className="nav-item"
          key={nav.id}
          to={nav.route}
          exact={nav.exact ? true : false}
        >
          {nav.name}
        </NavLink>
      )
    })
  }
}

export default Header;

