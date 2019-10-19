import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  updateMethodIds(methodIds: string[]): void;
}

interface State {
  menus: GameMethodMenu[];
  curMenuIndex: number;
  subMenus: GameSubMethodMenu[];
  curSubMenusIndex: number;
}

@inject('store')
@observer
class MethodMenu extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      menus: getMethodsConfigByType(this.props.gameType),
      subMenus: [],
      curMenuIndex: 0,
      curSubMenusIndex: 0
    }
  }
  onMenuHandler = (menu: GameMethodMenu, index: number) => {
    this.setState({curMenuIndex: index});
    this.props.updateMethodIds(menu.ids);
  }
  render() {
    console.log('method-menu', this.props.gameType)
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.props.gameType);
    return (
      <section className="method-menu-view">
        <section className="menu-wp">
          <nav className="flex ai-c">
            {menus.map((menu, i) => (
              <div key={i} className={`menu-item ${i === this.state.curMenuIndex ? 'selected' : ''}`} onClick={() => {this.onMenuHandler(menu, i)}}>{menu.name}</div>
            ))}
          </nav>
        </section>
        <section className="sub-menu-wp">
          <nav></nav>
        </section>
      </section>
    )
  }
}

export default MethodMenu;
