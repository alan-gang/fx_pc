import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class Dice extends Component<Props, object> {
  render() {
    return (
      <div></div>
    )
  }
}

export default Dice;
