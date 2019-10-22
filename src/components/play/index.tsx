import React, { Component, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import methodItems from '../../game/methodItems';
import { Row, Col, Input } from 'antd';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  curGameMethodItems: any[];
  updateMethdItem(i: number, j: number, k: number, selected?: boolean | undefined, value?: string | undefined): void;
}

@inject('store')
@observer
class Play extends Component<Props, object> {
  methodItems: any = methodItems;
  onMethodItemHandler = (i: number, j: number, k: number, selected: boolean) => {
    console.log(i, j, k, selected);
    this.props.updateMethdItem(i, j, k, !selected);
  }
  onMethodItemValueChanged = (i: number, j: number, k: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log(i, j, k, event, value);
    this.props.updateMethdItem(i, j, k, undefined, value); // 
  }
  componentWillReceiveProps(nextProps: Props) {
    console.log('play componentWillReceiveProps=', nextProps, this.props);
    this.forceUpdate();
  }
  render() {
    let curGameMethodItems = this.props.curGameMethodItems;
    console.log('paly render');
    return (
      <article className={`play-view ${this.props.gameType}`}>
        {curGameMethodItems.map((methodItem: any, i: number) => (
          <div className={`method ${methodItem.layout} ${methodItem.class || ''}`} key={i} >
            {methodItem.rows.map((row: any, j: number) => (
              <Row key={j}>
                  <Col span={row.col} className={`pos-lebel ${row.hidePos ? 'hide' : ''}`} >{row.n}</Col>
                  {row.vs.map((vsItem: any, k: number) => (
                    <Col span={vsItem.col} key={k} className={`method-item ${row.class || ''} ${vsItem.class || ''} ${vsItem.s ? 'selected' : ''}`} onClick={this.onMethodItemHandler.bind(this, i, j, k, vsItem.s)}>
                      <span className={`method-item-name`} n={vsItem.n}>
                        {vsItem.class === 'icon' && vsItem.icons && vsItem.icons.map((iconNum: number, m: number) => (<span className={`icon-item icon-item-${iconNum}`} key={m}></span>))}
                        {vsItem.class !== 'icon' && vsItem.n}
                      </span>
                      {row.noodd !== true && <span className={`odd`}>1.98</span>}
                      {row.noInput !== true && <span className={`bet-amount`}><Input value={vsItem.val} onChange={(e: any) => this.onMethodItemValueChanged(i, j, k, e)} /></span>}
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
