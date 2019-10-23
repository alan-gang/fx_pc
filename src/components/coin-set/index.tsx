import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './index.styl';

interface Props {
  store?: any;
  coinChooiced(value: number): void;
}

interface Coin {
  name: string;
  value: number;
  class: string;
}

interface State {
  coins: Coin[]
}

@inject('store')
@observer
class CoinSet extends Component<Props, object> {
  state = {
    coins: [
      {name: '50', value: 50, class: 'coin-green'},
      {name: '100', value: 100, class: 'coin-yellow'},
      {name: '500', value: 500, class: 'coin-gray'},
      {name: '1千', value: 1000, class: 'coin-red'},
      {name: '5千', value: 5000, class: 'coin-blue'},
      {name: '1万', value: 10000, class: 'coin-grape'}
    ]
  }
  onCoinHandler = (coin: Coin) => {
    this.props.coinChooiced(coin.value);
  }
  render() {
    return (
      <section className="coin-set-view">
        <ul className="flex ai-c">
          {this.state.coins.map((coin: Coin, i: number) => (<li key={i} className={`coin-item ${coin.class}`} onClick={this.onCoinHandler.bind(this, coin)}>{coin.name}</li>)) }
        </ul>
      </section>
    )
  }
}

export default CoinSet;
