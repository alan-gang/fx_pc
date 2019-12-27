import React, { PureComponent } from 'react';
import { Switch, Icon } from 'antd';
import './refreshBar.styl';

interface Props {
  remainTime: string;
  isAutoRefresh: boolean;
  switchAutoRefresh: Function;
  refresh: Function;
}

class RefreshBar extends PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="flex jc-s-b ai-c fresh-bar-view">
        <span className="c-red">{this.props.remainTime}S</span>
        <span className="flex ai-c auto-refresh"><span className="pdr-4">自动刷新</span><Switch checkedChildren="开" unCheckedChildren="关" checked={this.props.isAutoRefresh} onClick={() => this.props.switchAutoRefresh()}/></span>
        <span className="crs-p btn-fresh" onClick={() => this.props.refresh()}><span className="pdr-4">刷新</span><Icon type="sync"/></span>
      </div>
    )
  }
}

export default RefreshBar;
