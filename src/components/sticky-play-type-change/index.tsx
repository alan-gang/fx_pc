import React, { PureComponent } from 'react';
import './index.styl';

interface IPlayType {
  id: number;
  title: string;
  name: string;
  icon?: string;
  url: string;
  active: boolean;
  show: boolean;
}

let playTypes: IPlayType[] = [
  { id: 1, title: '官方玩法' , name: 'offical', icon: '', url: '/?from=JN', active: false, show: true },
  { id: 2, title: '快钱玩法' , name: 'fast', icon: '', url: '', active: true, show: true },
  { id: 3, title: '基诺玩法' , name: 'keno', icon: '', url: '/keno/?from=JN', active: false, show: false }
]

interface Props {
  offsetLeft: number,
  playTypes?: number[]
}

interface State {
  playTypes: IPlayType[];
  offsetLeft: number;
}

const DEFAULT_PLAY_TYPES = [1, 2];

/**
 * 玩法切换
 */
class StickyPlayTypeChange extends PureComponent<Props, {}>{
  state: State;
  constructor(props: Props) {
    super(props);
    let pTypes = this.filter(props.playTypes)
    this.state = {
      playTypes: pTypes,
      offsetLeft: 0
    }
    this.goto = this.goto.bind(this);
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.playTypes && nextProps.playTypes && this.props.playTypes.length !== nextProps.playTypes.length) {
      this.setState({playTypes: this.filter(nextProps.playTypes)});
    }
  }
  filter(pTypes: number[] = DEFAULT_PLAY_TYPES) {
    return playTypes.filter((p) => pTypes.includes(p.id));
  }
  goto(item: IPlayType) {
    if (item.url && item.url.length > 0) {
      window.location.href = item.url;
    }
  }
  render() {
    return (
      <section className={`sticky-play-type-change-view`} style={{left: this.props.offsetLeft}}>
        <header></header>
        <ul className="play-type-item-ls">
          {this.state.playTypes.map((p: IPlayType, i: number) => {
            return p.show ? <li key={i} className={`ai-c jc-c flex crs-p play-type-item ${p.active ? 'active' : ''}`} onClick={() => this.goto(p)}>{p.title}</li> : ''
          })}
        </ul>
      </section>
    )
  }
}

export default StickyPlayTypeChange;
