import React, { PureComponent } from 'react';
import { getUrlParams } from '../../utils/common';
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
  { id: 1, title: '官方玩法' , name: 'offical', icon: '', url: '/', active: false, show: true },
  { id: 2, title: '快钱玩法' , name: 'fast', icon: '', url: '', active: true, show: true },
  { id: 3, title: '基诺玩法' , name: 'keno', icon: '', url: '/keno/', active: false, show: true }
]

interface Props {
  offsetLeft: number,
  playTypeIds?: number[]
}

interface State {
  playTypes: IPlayType[];
  offsetLeft: number;
}

// const DEFAULT_PLAY_TYPES = [2];
const DEFAULT_PLAY_TYPES = [1,2,3];

/**
 * 玩法切换
 */
class StickyPlayTypeChange extends PureComponent<Props, {}>{
  state: State;
  constructor(props: Props) {
    super(props);
    let pTypes = this.filter(props.playTypeIds);
    pTypes = this.updateUrls(pTypes)
    this.state = {
      playTypes: pTypes,
      offsetLeft: 0
    }
    this.goto = this.goto.bind(this);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.playTypeIds && nextProps.playTypeIds && this.props.playTypeIds.length !== nextProps.playTypeIds.length) {
      this.setState({playTypes: this.filter(nextProps.playTypeIds)});
    }
  }
  getParams() {
    const sessionData: any = sessionStorage.getItem('sessionData');
    let hash = window.location.hash;
    hash = hash.substring(hash.indexOf('?'));
    const agentCode = getUrlParams('agentCode',  hash);
    const param = getUrlParams('param',  hash);
    const gameid = getUrlParams('gameid');
    let data: any = {
      agentCode,
      param
    };
    if (!agentCode || !param && sessionData) {
      data = JSON.parse(sessionData);
    }
    if (gameid) {
      data.gameid = gameid;
    }
    return data;
  }
  objToUrl(params: any) {
    let ps = [];
    for (let p in params) {
      ps.push(`${p}=${params[p]}`);
    }
    return ps.join('&');
  }
  updateUrls(pTypes: IPlayType[]) {
    let params = this.getParams();
    let paramsUrl = this.objToUrl(params);
    let from: string = getUrlParams('from');
    let decodeUrl = '';
    if (from) {
      decodeUrl = decodeURIComponent(from);
    }
    pTypes.forEach((item) => {
      switch(item.name) {
        case 'offical':
          item.url = decodeUrl || `/?from=${from}#/?out=1&${paramsUrl}`;
          break;
        case 'keno':
          item.url = `/keno/?from=${from}#/?${paramsUrl}`;
          break;
        default:
          break;
      }
    });
    return pTypes;
  }
  filter(playTypeIds: number[] = DEFAULT_PLAY_TYPES) {
    return playTypes.filter((p) => playTypeIds.includes(p.id));
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
