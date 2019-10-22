import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import methodItems from '../../game/methodItems';
import { Row, Col, Input } from 'antd';

import './index.styl';

interface Props {
  store?: any;
  methodIds: string[];
  gameType: string;
}

@inject('store')
@observer
class Play extends Component<Props, object> {
  methodItems: any = methodItems;
  render() {
    let methodIds = this.props.methodIds;
    return (
      <article className={`play-view ${this.props.gameType}`}>
        {methodIds.map((mid: string, i: number) => (
          <div className={`method ${this.methodItems[mid]().layout} ${this.methodItems[mid]().class || ''}`} key={i} >
            {this.methodItems[mid]().rows.map((row: any, j: number) => (
              <Row key={j}>
                  <Col span={row.col} className={`pos-lebel ${row.hidePos ? 'hide':''}`} >{row.n}</Col>
                  {row.vs.map((vsItem: any, k: number) => (
                    <Col span={vsItem.col} key={k} className={`method-item ${row.class || ''} ${vsItem.class}`}>
                      <span className={`method-item-name`} n={vsItem.n}>
                        {vsItem.class === 'icon' && vsItem.icons && vsItem.icons.map((iconNum: number, m: number) => (<span className={`icon-item icon-item-${iconNum}`} key={m}></span>))}
                        {vsItem.class !== 'icon' && vsItem.n}
                      </span>
                      {row.noodd !== true && <span className={`odd`}>1.98</span>}
                      {row.noInput !== true && <span className={`bet-amount`}><Input /></span>}
                    </Col>
                  ))}
              </Row>
            ))}
          </div>
        ))}
      </article>
    )
  }
}

export default Play;
