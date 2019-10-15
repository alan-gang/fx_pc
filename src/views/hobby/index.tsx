import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from "react-router-dom";

interface IProps {
  store?: any;
  gameType?: string;
}
type Props = IProps & RouteComponentProps;
@inject("store")
@observer
class Lobby extends Component<Props, object> {
  // constructor(props: Props) {
  //   super(props);
  // }
  gotoHandler = () => {
    this.props.history.push('/game?id=1')
  }
  render() {
    console.log(this.props.store.user.name);
    return (
      <article className="lobby-view">
        lobby
        <button onClick={this.gotoHandler}>goto</button>
      </article>
    )
  }
}

export default Lobby;
