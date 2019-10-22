import React, { Component, Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/header';
import { GameMenu, Loading } from './components';
import RouterConfig  from './router/index';
import { Provider } from 'mobx-react';
import store from './store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import APIs from './http/APIs';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import './assets/style/common/common.styl';
import './App.css';

moment.locale('zh-cn');

class App extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }
  componentWillMount() {
    // let sessionData: any = sessionStorage.getItem('sessionData');
    // let agentCode = this.$route.query.agentCode;
    // let param = this.$route.query.param;
    // let data = {
    //   agentCode,
    //   param
    // };
    // if (!agentCode && !param && sessionData) {
    //   data = JSON.parse(sessionData);
    // }
    this.autoLogin({});
    this.getCfgInfo();
  }
  autoLogin(params: object) {
    APIs.signIn(params).then((data: any) => {
      this.getUserPrefence();
    })
  }
  getCfgInfo() {
    APIs.getCfgInfo({}).then(({broadcaseWSUrl}: any) => {
      // if (!Socket.sockets.user) {
      //   Socket.connect(broadcaseWSUrl, 'user', this.connected);
      // }
      // Socket.notify.messages.push(this.message);
    });
  }
  updateBalance() {

  }
  getUserPrefence() {
    APIs.getUserPrefence().then((data: any) => {
      if (data.success === 1) {
        // this.setMenuList(data.menuList);
      }
    });
  }
  getLimitData() {
    // APIs.lottSets({lotteryIds: ids.join(',')})
    //   .then((data: any) => {
    //     if (data.success === 1) {
        
    //     }
    // });
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
