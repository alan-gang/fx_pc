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

import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import './assets/style/common/common.styl';
import './App.css';
import Socket from './socket';

moment.locale('zh-cn');

@observer
class App extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
    this.init();
  }
  init() {
    let sessionData: any = sessionStorage.getItem('sessionData');
    let agentCode = getUrlParams('agentCode');
    let param = getUrlParams('param');
    let data = {
      agentCode,
      param
    };
    if (!agentCode && !param && sessionData) {
      data = JSON.parse(sessionData);
    }
    this.autoLogin(data);
    this.getLimitData(getAllGameIds());
  }
  componentWillMount() {
    // this.getCfgInfo();
  }
  autoLogin(params: object) {
    APIs.signIn(params).then((data: any) => {
      if (data.success > 0) {
        store.common.setBroadcaseWSUrl(data.broadcaseWSUrl);
        store.user.setName(data.userName);
        store.user.setUserId(data.userId);
        store.user.setLogin(true);
        this.getUserPrefence();
        this.updateBalance();
        store.game.updateAvailableGames();
        // this.initSocket();
      }
    });
  }
  initSocket() {
    let mysocket = new Socket({
      url: store.common.broadcaseWSUrl,
      name: 'appIndex',
      receive: (data: any) => {
        console.log('App Socket=', data);
      },
      open: () => {
        mysocket.send(JSON.stringify(Object.assign({action: 'noauth'}, {})));
      }
    }, true);
  }
  getCfgInfo() {
    // APIs.getCfgInfo({}).then(({broadcaseWSUrl}: any) => {
      // if (!Socket.sockets.user) {
      //   Socket.connect(broadcaseWSUrl, 'user', this.connected);
      // }
      // Socket.notify.messages.push(this.message);
    // });
  }
  updateBalance() {
    store.user.updateBalance();
  }
  getUserPrefence() {
    APIs.getUserPrefence().then((data: any) => {
      if (data.success === 1) {
        // this.setMenuList(data.menuList);
      }
    });
  }
  getLimitData(ids: number[]) {
    APIs.lottSets({lotteryIds: ids.join(','), v: 1}).then((data: any) => {
      if (data.success === 1) {
        Object.keys(data.data).forEach((key: string) => {
          store.game.setLimitList([Object.assign({id: parseInt(key, 10)}, data.data[key])]);
        });
      }
    });
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router>
            <article className="pg-c">
              <Header />
              <Suspense fallback={<Loading />}>
                <GameMenu />
              </Suspense>
              <article className="page-view">
                <RouterConfig />
              </article>
            </article>
          </Router>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
