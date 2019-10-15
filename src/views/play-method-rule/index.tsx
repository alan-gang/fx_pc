import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class PlayMethodRule extends Component<Props, {}> {
  render() {
    console.log(this.props.store.user.name);
    return (
      <article className="play-method-rule-view">
        PlayMethodRule
      </article>
    )
  }
}

export default PlayMethodRule;
