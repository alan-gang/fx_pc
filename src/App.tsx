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
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import './assets/style/common/common.styl';
import './App.css';

moment.locale('zh-cn');

class App extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
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
