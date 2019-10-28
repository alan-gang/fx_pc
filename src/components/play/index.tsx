import React, { Component, ChangeEvent, FocusEvent } from 'react';
import { inject, observer } from 'mobx-react';
import methodItems from '../../game/methodItems';
import { Row, Col, Input } from 'antd';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  curGameMethodItems: any[];
  defaultInitMethodItemAmount: number;
  updateMethdItem(i: number, j: number, k: number, selected?: boolean | undefined, value?: string | undefined): void;
}

@inject('store')
@observer
class Play extends Component<Props, object> {
  methodItems: any = methodItems;
  onMethodItemHandler = (i: number, j: number, k: number, selected: boolean, methodTypeName: string) => {
    console.log(i, j, k, selected);
    let amount = selected ? '' : String(this.props.defaultInitMethodItemAmount);
    amount = ['rx_nzn', 'zux_q2', 'zux_q3', 'zx_q2', 'zx_q3'].includes(methodTypeName) ? '0' : amount;
    this.props.updateMethdItem(i, j, k, !selected, amount);
  }
  onFocusMethodItem = (i: number, j: number, k: number, event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('onFocusMethodItem');
    let { value } = event.target;
    let selected = this.props.curGameMethodItems[i].rows[j].vs[k].s;
    if (selected && !value.trim()) {
      this.props.updateMethdItem(i, j, k, this.props.curGameMethodItems[i].rows[j].vs[k].s, String(this.props.defaultInitMethodItemAmount));
    }
  }

  onMethodItemValueChanged = (i: number, j: number, k: number, event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    let { value } = event.target;
    if (!/^\d*$/g.test(value)) {
      value = this.props.curGameMethodItems[i].rows[j].vs[k].amt;
    }
    console.log(i, j, k, event, value, this.props.curGameMethodItems[i].rows[j].vs[k].amt);
    this.props.updateMethdItem(i, j, k, undefined, value); // 
  }
  componentWillReceiveProps(nextProps: Props) {
    // console.log('play componentWillReceiveProps=', nextProps, this.props); , methodItem.methodTypeName
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
                    <Col span={vsItem.col} key={k} className={`method-item ${row.class || ''} ${vsItem.class || ''} ${vsItem.s ? 'selected' : ''}`} onClick={() => this.onMethodItemHandler(i, j, k, vsItem.s, methodItem.methodTypeName)}>
                      <span className={`method-item-name`} n={vsItem.n}>
                        {vsItem.class === 'icon' && vsItem.icons && vsItem.icons.map((iconNum: number, m: number) => (<span className={`icon-item icon-item-${iconNum}`} key={m}></span>))}
                        {vsItem.class !== 'icon' && vsItem.n}
                      </span>
                      {row.noodd !== true && <span className={`odd`}>{vsItem.odd || ''}</span>}
                      {row.noInput !== true && 
                        <span className={`bet-amount`}>
                          <Input value={vsItem.amt} onFocus={(e: FocusEvent<HTMLInputElement>) => this.onFocusMethodItem(i, j, k, e)} onBlur={(e: FocusEvent<HTMLInputElement>) => this.onFocusMethodItem(i, j, k, e)} onChange={(e: ChangeEvent<HTMLInputElement>) => this.onMethodItemValueChanged(i, j, k, e)} />
                        </span>}
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
