import React, { Component, Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import Header from './components/header';
import { GameMenu, Loading } from './components';
import RouterConfig  from './router/index';
import { Provider } from 'mobx-react';
import store from './store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import APIs from './http/APIs';
import { getUrlParams } from './utils/common';
import { getAllGameIds } from './game/games';
import StickyPlayTypeChange from './components/sticky-play-type-change';

import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import './assets/style/common/common.styl';
import './App.css';
import Socket from './socket';

moment.locale('zh-cn');

interface State {
  offsetLeft: number;
  playTypeIds: number[];
  invokedLogin: boolean;
}

@observer
class App extends Component<Props, object> {
  pageContainerRef: React.RefObject<HTMLElement>;
  state: State;
  mysocket?: Socket;
  constructor(props: Props) {
    super(props);
    this.init();
    this.pageContainerRef = React.createRef();
    this.state = {
      offsetLeft: 0,
      playTypeIds: [],
      invokedLogin: false
    }
  }
  init() {
    let sessionData: any = sessionStorage.getItem('sessionData');
    let hash = window.location.hash;
    hash = hash.substring(hash.indexOf('?'));
    let agentCode = getUrlParams('agentCode', hash);
    let param = decodeURIComponent(getUrlParams('param', hash));
    let data = {
      agentCode,
      param
    };
    if (!agentCode || !param && sessionData) {
      data = JSON.parse(sessionData);
    }
    this.autoLogin(data);
  }
  componentWillMount() {
    // this.getCfgInfo();
  }
  componentDidMount() {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition, false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePosition, false);
  }
  autoLogin(params: object) {
    APIs.signIn(params).then((data: any) => {
      this.setState({invokedLogin: true});
      this.getLimitData(getAllGameIds());
      if (data.success > 0) {  
        store.common.setBroadcaseWSUrl(data.broadcaseWSUrl);
        store.user.setName(data.userName);
        store.user.setUserId(data.userId);
        store.user.setLogin(true);
        // this.getUserPrefence();
        this.updateBalance();
        store.game.updateAvailableGames();
        this.initSocket();
        this.setState({playTypeIds: data.playTypes});
      } else {
        this.getCfgInfo();
      }
    });
  }
  initSocket() {
    this.mysocket = new Socket({
      url: store.common.broadcaseWSUrl,
      name: 'appIndex',
      receive: (data: any) => {
        if (data.type === 'prizeNotice') {
          this.updateBalance();
        }
      },
      open: () => {
        if (this.mysocket) {
          let params: any = {action: 'noauth'};
          if (store.user.login) {
            params = {
              parameter: {
                userId: store.user.userId,
                app: 'web'
              },
              action: 'auth'
            };
          }
          this.mysocket.send(JSON.stringify(params));
        }
      }
    }, true);
  }
  getCfgInfo() {
    APIs.getCfgInfo({}).then(({broadcaseWSUrl}: any) => {
      store.common.setBroadcaseWSUrl(broadcaseWSUrl);
      this.initSocket();
    });
  }
  updateBalance() {
    store.user.updateBalance();
  }
  // getUserPrefence() {
  //   APIs.getUserPrefence().then((data: any) => {
  //     if (data.success === 1) {
        // this.setMenuList(data.menuList);
  //     }
  //   });
  // }
  getLimitData(ids: number[]) {
    APIs.lottSets({lotteryIds: ids.join(','), v: 1}).then((data: any) => {
      if (data.success === 1) {
        let limitList: LimitListItem[] = [];
        Object.keys(data.data).forEach((key: string) => {
          limitList.push(Object.assign({id: parseInt(key, 10)}, data.data[key]));
          // store.game.setLimitList([Object.assign({id: parseInt(key, 10)}, data.data[key])]);
        });
        store.game.setLimitList(limitList);
      }
    });
  }
  updatePosition = () => {
    if (this.pageContainerRef && this.pageContainerRef.current) {
      let { offsetWidth, offsetLeft } = this.pageContainerRef.current;
      this.setState({offsetLeft: offsetWidth + offsetLeft})
    }
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router>
            { this.state.invokedLogin && 
              <article className="pg-c">
                <Header />
                <Suspense fallback={<Loading />}>
                  <GameMenu />
                </Suspense>
                <article className="page-view" ref={this.pageContainerRef}>
                  <RouterConfig />
                </article>
                { this.state.playTypeIds && this.state.playTypeIds.length > 0 && <StickyPlayTypeChange offsetLeft={this.state.offsetLeft} playTypeIds={this.state.playTypeIds} /> }
              </article>
            }
          </Router>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
