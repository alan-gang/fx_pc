import React, { Suspense, lazy } from 'react';
import { Route, RouteProps } from "react-router-dom";
import Loading from '../components/router-loading/index';
import { inject } from 'mobx-react';

interface ExtendRouteProps extends RouteProps {
  routes?: RouteProps[]
}

export const routes = [
    {
      title: '大厅',
      exact: true,
      path: '/',
      component: lazy(() => import('../views/hobby'))
    },
    {
      title: '游戏',
      path: '/game/:id',
      component: lazy(() => import('../views/game'))
    },
    {
      title: '投注记录',
      path: '/betRecords',
      component: lazy(() => import('../views/bet-records'))
    },
    {
      title: '开奖历史',
      path: '/openIssueHistory',
      component: lazy(() => import('../views/open-issue-history'))
    },
    {
      title: '玩法',
      path: '/playMethodRule',
      component: lazy(() => import('../views/play-method-rule'))
    },
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route: ExtendRouteProps) => (
  <Route 
    exact={route.exact}
    strict={route.strict}
    path={route.path}
    component={route.component}
    // render={
    //   props => (
    //     // pass the sub-routes down to keep nesting
    //     <route.component {...props} routes={route.routes} />
    //   )
    // }
  />
);


@inject("store")
class RouterConfig extends React.Component<Props, object> {
  componentWillMount() {
  }
  render() {
    return (
      <>
        <Suspense fallback={<Loading />}>
          {routes.map((route, i) => {
            return (
              <RouteWithSubRoutes key={i} {...route} />
            )}
          )}
        </Suspense>
      </>
    )
  }
}

export default RouterConfig;
