import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GameSubMethodMenu } from '../../typings/games';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  subMethods?: GameSubMethodMenu[];
  updateSubMethods(method: GameSubMethodMenu): void;
}

@inject('store')
@observer
class SubMethodMenu extends Component<Props, object> {
  onSubMethodHandler = (subMethod: GameSubMethodMenu) => {
    console.log(JSON.stringify(subMethod));
    this.props.updateSubMethods(subMethod);
  }
  render() {
    let subMethods = this.props.subMethods;
    return (
      <section className={`sub-method-menu-view`}>
        <ul className={`flex sub-method-item-ls`}>
          {subMethods && subMethods.map((sm: GameSubMethodMenu, i: number) => (
            <li className={`sub-method-item ${sm.class}`} key={i} onClick={this.onSubMethodHandler.bind(this, sm)}>
              <div className="method-name">{sm.name}</div>
              <div className="odd">150</div>
            </li>  
          ))}
        </ul>
      </section>
    )
  }
}

export default SubMethodMenu;
