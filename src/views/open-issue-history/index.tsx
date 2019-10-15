import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class OpenIssueHistory extends Component<Props, object> {
  render() {
    console.log(this.props.store.user.name);
    return (
      <article className="open-issue-history-view">
        open-issue-history-view
      </article>
    )
  }
}

export default OpenIssueHistory;
