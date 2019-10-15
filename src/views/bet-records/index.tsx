import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class BetRecords extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log(this.props.store.user.name);
    return (
      <article className="bet-records-view">
        bet-records-view
      </article>
    )
  }
}

export default BetRecords;
