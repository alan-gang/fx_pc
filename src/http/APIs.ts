import http from './core';

/*
 * 获取当前期号
 * @param params {
   gameid
  }
 */
export function curIssue(params: object = {}) {
  return http.get('/issue.do?method=current', { params });
}

/*
 * 获取历史奖期数据
 * @param params {
   gameid
   pageNum
   size
   v: 1  基诺专用
  }
 */
export function historyIssue(params: object = {}) {
  params = Object.assign({
    pageNum: 1,
    size: 30,
    v: 1
  }, params);
  return http.get('/issue.do?method=recentlyCode', { params });
}

// 获取游戏限红
export function lottSets(params: object = {}) {
  return http.get('/userpoint.do?method=getLottSets', { params })
}

export function historyIssueByDate(params: object = {}, cancelToken?: any) {
  if (cancelToken !== undefined) return http.get('/issuehistory.do?method=queryIssHistList', { params, cancelToken })
  return http.get('/issuehistory.do?method=queryIssHistList', { params })
}

export function myNewPoint(params: object = {}) {
  return http.get('/userpoint.do?method=myNewPoint', { params });
}
/**
 * 下注
 * @param params 
 */
export function kqbooking(params: object = {}) {
  return http.post('/game/fastBet.do?method=doBet', params);
}
export function getCfgInfo(args: object = {}) {
  return http.post('/login/login.do?method=getCfgInfo', args);
}

/*
  获取投注记录
  @param params {
    scope
    pageNum
    size
  }
*/
export function orderList(params: object = {}) {
  params = Object.assign({
    scope: 0,
    page: 1,
    pageSize: 20
  }, params);
  return http.get('/report/buyReport.do?method=list', { params });
}

/*
 登录
*/
export function login(params: object = {}) {
  return http.get('/login/login.do?method=validate', { params });
}

/*
 放线登录
*/
export function signIn(params: any = {}) {
  // return http.post('/ext/merAccApi.do?method=signIn', params);
  return http.post('/merAccApi.do?method=signIn', params);
}

/*
  获取用户帐户余额
  主账户
  特殊帐户
*/
export function getUserBalance(params: object = {}) {
  return http.get('/home/userInfo.do?method=getUserFund', { params });
}

/**
 * 系统公告
 */
export function sysNotices(params: object = {}) {
  params = Object.assign({
    isReleaseLine: 2
  }, params);
  return http.get('/home/notices.do?method=sysNotices', { params });
}

export function getUserPrefence() {
  return http.get('/home/userMenus.do?method=getUserPrefence');
}

export default {
  curIssue,
  historyIssue,
  orderList,
  login,
  signIn,
  getUserBalance,
  getCfgInfo,
  historyIssueByDate,
  sysNotices,
  getUserPrefence,
  lottSets
};
