import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameHeader from 'comp/game-header';
import MethodMenu from 'comp/method-menu';
import SubMethodMenu from 'comp/sub-method-menu';
import Play from 'comp/play';
import OrderBar from 'comp/order-bar';
import { RouteComponentProps } from "react-router-dom";
import { getGameTypeByGameId } from '../../game/games';
import calc from '../../game/calc';
import { getMethodsConfigByType, getMethodPosByGameTypeAndId } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';
import methodItems from '../../game/methodItems';
import APIs from '../../http/APIs';
import { removeRepeat2DArray, countRepeat } from '../../utils/game';
import { GameCommonDataContext } from '../../context/gameContext';
import { Icon } from 'antd'
import RecentOpen from '../../components/recent-open/RecentOpen'
import BetRemind from '../../components/bet-remind/BetRemind'
import Ludan from 'comp/ludan';
import { getLunDanTabByName, getTabsByType } from '../../utils/ludan';
import LimitSetDialog from 'comp/limit-set-dialog';
import Socket from '../../socket';
import Bus from '../../utils/eventBus'

// import { methods } from 'src/utils/ludanMethods';

import './index.styl';


interface IProps {
  store?: any;
  gameType?: string;
}

interface State {
  id: number;
  // gameType: string;
  curIssue: string;
  lastIssue: string;
  curTime: number;
  remainTime: number;
  openNumbers: string[];
  curMenuIndex: number; // 玩法菜单选中玩法的index
  curMenuEname: string; // 玩法菜单选中玩法的英语名
  curSubMenuIndex: number;
  subMethods: GameSubMethodMenu[];
  curGameMethodItems: any[];
  odds: any;
  issueList: any[];
  defaultInitMethodItemAmount: number; // 默认初始投注金额
  totalBetCount: number;  // 总注数
  totalBetAmount: number; // 总投注金额
  tabIndex: number; //  
  maxColumns: number;
  maxRows: number;
  defaultMenu?: string;
  defaultSubMenu?: string;
  isShowLudan: boolean;
  isShowLimitSetDialog: boolean;
  limitLevelList: LimitLevelItem[];
}

interface DataMethodItem {
  id: string;
  rows: any[];
}

interface MatchParams {
  id: string;
}

type Props = IProps & RouteComponentProps<MatchParams>;

@inject("store")
@observer
class Game extends Component<Props, object> {
  id: number = 1;
  gameType: string = 'ssc';
  state: State;
  methodItems: any = methodItems;
  calc: any = calc;
  mysocket?: Socket;
  constructor(props: Props) {
    super(props);
    this.id = parseInt(this.props.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    let limitItem = props.store.game.getLimitListItemById(this.id);
    let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
    let ludanTab = getLunDanTabByName(this.gameType, bestLudan && bestLudan.codeStyle);
    let curMenuIndex = bestLudan && getMethodPosByGameTypeAndId(this.gameType, bestLudan.methodId) || 0;
    let curMenuEname = (menus && menus[curMenuIndex]).ename;
    let ludanMenus = getTabsByType(this.gameType, curMenuEname);
    let gameLimitLevel = this.props.store.game.getGameLimitLevelByGameId(this.id); // 设置的限红数据
    let limitListItem = this.props.store.game.getLimitListItemById(this.id); 
    this.state = {
      id: 1,
      curIssue: '',
      lastIssue: '',
      curTime: 0,
      remainTime: 0,
      openNumbers: [],
      curMenuIndex,
      curMenuEname,
      curSubMenuIndex: 0,
      subMethods: [],
      curGameMethodItems: this.getMethodItemsByIds((menus && menus[curMenuIndex].ids) || []),
      odds: {},
      issueList: [],
      defaultInitMethodItemAmount: 10,
      totalBetCount: 0,
      totalBetAmount: 0,
      tabIndex: 0,
      maxColumns: 30,
      maxRows: 6,
      defaultMenu: (ludanTab && ludanTab.name) || '',
      defaultSubMenu: (ludanTab && ludanTab.subM && ludanTab.subM.length > 0) ? bestLudan.codeStyle.split('_')[1] : '',
      isShowLudan: ludanMenus && ludanMenus.length > 0,
      isShowLimitSetDialog: !gameLimitLevel,
      limitLevelList: !gameLimitLevel ? (limitListItem ? limitListItem.kqPrizeLimit : []) : [],
    }
    this.init();
    Bus.emit('gameIdChanged', this.id);
  }
  init() {
    this.getCurIssue(this.id);
    this.getHistoryIssue(this.id);
    this.getBestLudanByGameId(this.id, () => {
      this.getUserPoint(this.id);
    });
  }
  initSocket() {
    this.mysocket = new Socket({
      url: this.props.store.common.broadcaseWSUrl,
      name: 'gameIndex',
      receive: (data) => {
        if (data.type === 'openWinCode') {
          this.openWinCode(parseInt(data.content[0].lottId, 10), data.content[0]);
        }
        if (data.type === 'betNotify') {
          // Bus.emit('__pushBetRemind', data.content);
        }
      },
      open: () => {
        if (this.mysocket) {
          let params: any = {action: 'noauth'};
          if (this.props.store.user.login) {
            params = {
              parameter: {
                userId: this.props.store.user.userId,
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
  componentDidMount() {
    this.initSocket();
  }
  componentWillReceiveProps(nextProps: Props) {
    this.id = parseInt(nextProps.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    Bus.emit('gameIdChanged', this.id);
    if (this.props.match.params.id !== nextProps.match.params.id) {
      // let limitItem = this.props.store.game.getLimitListItemById(this.id);
      // let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
      // let ludanTab = getLunDanTabByName(this.gameType, bestLudan && bestLudan.codeStyle);
      // let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
      // let curMenuIndex = bestLudan && getMethodPosByGameTypeAndId(this.gameType, bestLudan.methodId) || 0;
      // let curMenuEname = menus && menus[curMenuIndex].ename
      // let ludanMenus = getTabsByType(this.gameType, curMenuEname);
      let gameLimitLevel = this.props.store.game.getGameLimitLevelByGameId(this.id); // 设置的限红数据
      let limitListItem = this.props.store.game.getLimitListItemById(this.id); 
      this.setState({
        // curMenuIndex,
        // curMenuEname,
        // curGameMethodItems: this.getMethodItemsByIds((menus && menus[curMenuIndex].ids) || []),
        // subMethods: (menus && menus[curMenuIndex].subMethods) || [],
        // defaultMenu: (ludanTab && ludanTab.name) || '',
        // defaultSubMenu: (ludanTab && ludanTab.subM && ludanTab.subM.length > 0) ? bestLudan.codeStyle.split('_')[1] : '',
        // isShowLudan: ludanMenus && ludanMenus.length > 0,
        isShowLimitSetDialog: !gameLimitLevel,
        limitLevelList: !gameLimitLevel ? (limitListItem ? limitListItem.kqPrizeLimit : []) : []
      });
      this.init();
    }
  }
  openWinCode(id: number, openHistoryItem: any) {
    if (id === this.id) {
      let issueList = this.state.issueList;
      issueList.unshift(openHistoryItem);
      this.setState({
        lastIssue: issueList[0].issue,
        openNumbers: issueList[0].code.split(','),
        issueList: issueList
      });
      this.getCurIssue(this.id);
    }
  }
  // 获取当前玩法下面的子玩法列表
  getMethodItemsByIds(ids: string[]) {
    let mItems: any[] = [];
    ids.forEach((id: string) => {
      let items =  this.methodItems[id]();
      items.rows = items.rows.map((row: any) => {
        row.vs.map((vs: any) => {
          vs.val = '';
          return vs;
        });
        return row;
      })
      mItems.push(Object.assign({id}, items));
    });
    return mItems;
  }
  // 更新玩法菜单选中的index
  updateMethodMenuIndex = (index: number) => {
    this.setState({curMenuIndex: index});
  }
  // 更新玩法菜单选中的index
  updateSubMethodMenuIndex = (index: number) => {
    this.setState({curSubMenuIndex: index});
  }
  methodMenuChangedCB = (method: GameMethodMenu) => {
    let curGameMethodItems = this.getMethodItemsByIds(method.ids || []);
    let ludanMenus = getTabsByType(this.gameType, method.ename);
    const isShowLudan = ludanMenus && ludanMenus.length > 0;
    // 不需要路单需要触发事件重写一下数据
    if (!isShowLudan) Bus.emit('ludanSelectMenuChange', '')
    this.setState({
      subMethods: method.subMethods || [],
      curGameMethodItems,
      totalBetCount: 0,
      totalBetAmount: 0,
      curSubMenuIndex: 0,
      curMenuEname: method.ename,
      defaultMenu: '',
      defaultSubMenu: '',
      isShowLudan,
    }, this.updateOddsOfMethod);
  }
  updateSubMethods = (method: GameSubMethodMenu) => {
    this.setState({
      curGameMethodItems: this.getMethodItemsByIds(method.ids || [])
    });
  }

  // 更新选中的玩法项数据
  updateMethdItem = (i: number, j: number, k: number, selected?: boolean | undefined, value?: string | undefined) => {
    let methodItems = this.state.curGameMethodItems;
    if (selected !== undefined) {
      methodItems[i].rows[j].vs[k].s = selected;
    }
    if (value !== undefined) {
      methodItems[i].rows[j].vs[k].amt = value;
    }
    this.setState({
      curGameMethodItems: methodItems
    }, this.calcBet);
  }

  // 更新当前游戏当前玩法相关的odd
  updateOddsOfMethod(odds?: any) {
    if (!odds) {
      this.getUserPoint(this.id);
      return ;
    }
    let curGameMethodItems = this.state.curGameMethodItems;
    let methodId: string = '';
    let hasOdd: boolean = true;
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      // 检查共用位置title的玩法是否有odd
      if (methodItem.refShowMethodItems && methodItem.refShowMethodItems.length > 0) {
        hasOdd = methodItem.refShowMethodItems.some((item: string) => {
          methodId = item.split(':')[0];
          return odds[methodId] && odds[methodId].length > 0;
        });
      }
      methodItem.rows = methodItem.rows.map((row: any) => {
        // 更新是否隐藏位置title
        if (methodItem.refShowMethodItems && methodItem.refShowMethodItems.length > 0) {
          row.hidePos = hasOdd;
          row.class = (row.class || '').replace('no-t-b', '');
        }
        // 更新玩法odd
        row.vs = row.vs.map((vsItem: any) => {
          methodId = methodItem.id.split(':')[0];
          if (odds[methodId] && odds[methodId][vsItem.oddIndex || 0]) {
            vsItem.odd = odds[methodId][vsItem.oddIndex || 0].maxprize;
          }
          return vsItem;
        });
        return row;
      });
      return methodItem;
    });
    // 过滤没有奖级的玩法
    curGameMethodItems = curGameMethodItems.filter(item => {
      let methodId = item.id.split(':')[0];
      return odds[methodId];
    });
    this.setState({curGameMethodItems});
  }

  // 更新默认初始下注金额
  updateDefaultInitMethodItemAmount = (amount: number): void => {
    this.setState({defaultInitMethodItemAmount: amount}, this.calcBet);
  }
  calcBet() {
    let methodList: DataMethodItem[] = [];
    let method: any;
    let betCount: number = 0;
    let totalAmount: number = 0;
    let repeatCount = 0;

    // 构造选择的号码集合，金额集合
    let curGameMethodItems = this.state.curGameMethodItems;
    let methodTypeName: string = '';
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      methodTypeName = methodItem.methodTypeName;
      methodItem.rows = methodItem.rows.map((row: any) => {
        row.nc = [];
        row.amtc = [];
        row.tmc = 0;
        row.vs = row.vs.map((vsItem: any) => {
          if (vsItem.s) {
            row.nc.push(vsItem.n);
            row.amtc.push(vsItem.amt);
            row.tmc += parseInt(vsItem.amt || '0', 10);
          }
          return vsItem;
        });
        // 总金额
        totalAmount += row.tmc;
        return row;
      });
      return methodItem;
    });

    // 构造注数计算格式
    curGameMethodItems.forEach((methodItem: DataMethodItem) => {
      method = {id: methodItem.id, rows: []};
      methodItem.rows.forEach((row: any) => {
        method.rows.push(row.nc.slice(0));
      });
      methodList.push(method);
    });

    // 计算重复数
    if (['zx_q2', 'zx_q3'].includes(methodTypeName)) {
      repeatCount = countRepeat(methodList.map((methodItem: DataMethodItem) => methodItem.rows));
    }
    
    // 构造注数计算格式
    if (!['zx_q3'].includes(methodTypeName)) {
      methodList = methodList.map((methodItem: DataMethodItem) => {
        methodItem.rows = methodItem.rows.map((row: any) => {
          return row.length;
        })
        return methodItem;
      });
    }

    // 总注数
    methodList.forEach((methodItem: DataMethodItem) => {
      betCount += this.calc[methodItem.id]({nsl: methodItem.rows, ns: methodItem.rows, repeatCount});
    });

    // 任选，组选，直选金额计算
    if (['rx_nzn', 'zux_q2', 'zux_q3', 'zx_q2', 'zx_q3'].includes(methodTypeName)) {
      totalAmount = betCount * this.state.defaultInitMethodItemAmount;
    }

    this.setState({totalBetCount: betCount, totalBetAmount: totalAmount});
  }
  // 重置所有选中玩法项
  resetSelectedOfAllMethodItem = () => {
    let curGameMethodItems = this.state.curGameMethodItems;
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        row.vs = row.vs.map((vsItem: any) => { vsItem.s = false; vsItem.amt = ''; return vsItem; }); return row;
      });
      return methodItem;
    });
    this.setState({curGameMethodItems, totalBetCount: 0, totalBetAmount: 0});
  }
  orderFinishCB = (status: boolean) => {
    if (status) {
      this.resetSelectedOfAllMethodItem();
    }
  }
  getCurIssue = (gameid: number) => {
    APIs.curIssue({gameid}).then((data: any) => {
      if (data.success > 0) {
        this.setState({
          curIssue: data.issue,
          curTime: data.current,
          remainTime: Math.floor((data.saleend - data.current) / 1000) || (this.state.remainTime + 0.05)
        })
      } else {
        this.setState({curIssue: ''});
      }
    });
  }
  getHistoryIssue(gameid: number) {
    APIs.historyIssue({gameid}).then((data: any) => {
      if (data.success === 1) {
        if (data.items.length > 0) {
          this.setState({
            lastIssue: data.items[0].issue,
            openNumbers: data.items[0].code.split(','),
            issueList: data.items
          });
        }
      }
    });
  }
  getUserPoint(gameid: number) {
    APIs.myNewPoint({gameid}).then((data: any) => {
      if (data.success === 1) {
        this.setState({odds: data.items})
        this.updateOddsOfMethod(data.items);
      }
    });
  }
  changeTabIndex = (idx: number) => {
    this.setState({
      tabIndex: idx
    })
  }
  getLimitData(id: number) {
    APIs.lottSets({lotteryIds: id, v: 1}).then((data: any) => {
      if (data.success === 1) {
        this.props.store.game.setLimitList([Object.assign({id}, data.data[id])]);
        this.props.store.game.setLimitLevelList(data.data[id].kqPrizeLimit);
      }
    });
  }
  onLimitChoiceCB = (level: number) => {
    this.props.store.game.updateGamesLimitLevel({gameId: this.id, level});
    this.onCloseLimitChoiceHandler();
  }
  onCloseLimitChoiceHandler = () => {
    this.setState({isShowLimitSetDialog: false});
  }
  componentWillUnmount() {
    this.mysocket && this.mysocket.removeListen();
  }
  updateInfoWithBestLudan(bestLudan: BestLudanItem) {
    let ludanTab = getLunDanTabByName(this.gameType, bestLudan && bestLudan.codeStyle);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    let curMenuIndex = bestLudan && getMethodPosByGameTypeAndId(this.gameType, bestLudan.methodId) || 0;
    let curMenuEname = menus && menus[curMenuIndex] && menus[curMenuIndex].ename
    let ludanMenus = getTabsByType(this.gameType, curMenuEname);
    this.setState({
      curMenuIndex,
      curMenuEname,
      curGameMethodItems: this.getMethodItemsByIds((menus && menus[curMenuIndex] && menus[curMenuIndex].ids) || []),
      subMethods: (menus && menus[curMenuIndex] && menus[curMenuIndex].subMethods) || [],
      defaultMenu: (ludanTab && ludanTab.name) || '',
      defaultSubMenu: (ludanTab && ludanTab.subM && ludanTab.subM.length > 0) ? bestLudan.codeStyle.split('_')[1] : '',
      isShowLudan: ludanMenus && ludanMenus.length > 0
    });
  }
  getBestLudanByGameId(id: number, cb?: Function) {
    APIs.getBestLudan({lotteryId: id}).then((data: any) => {
      this.updateInfoWithBestLudan(data.bestLudan);
      cb && cb();
    });
  }
  render() {
    return (
      <article className="game-view">
        <GameCommonDataContext.Provider value={{gameId: this.id, gameType: this.gameType}} >
          <GameHeader 
            gameId={this.id}
            gameType={this.gameType}
            curIssue={this.state.curIssue}
            lastIssue={this.state.lastIssue}
            curTime={this.state.curTime}
            remainTime={this.state.remainTime}
            openNumbers={this.state.openNumbers}
            getNewestIssue={this.getCurIssue}
          />
          <section className="game-main">
            <MethodMenu odds={this.state.odds} gameType={this.gameType} curMenuIndex={this.state.curMenuIndex} methodMenuChangedCB={this.methodMenuChangedCB} updateMethodMenuIndex={this.updateMethodMenuIndex}/>
            {this.state.subMethods.length > 0 && 
              <SubMethodMenu 
                gameType={this.gameType} 
                curSubMenuIndex={this.state.curSubMenuIndex} 
                subMethods={this.state.subMethods} 
                odds={this.state.odds} 
                updateSubMethods={this.updateSubMethods} 
                updateSubMethodMenuIndex={this.updateSubMethodMenuIndex}
              />
            }
            <Play 
              curGameMethodItems={this.state.curGameMethodItems} 
              gameType={this.gameType} 
              defaultInitMethodItemAmount={this.state.defaultInitMethodItemAmount}
              updateMethdItem={this.updateMethdItem}
              odds={this.state.odds}
            />
            <OrderBar 
              gameId={this.id} 
              curIssue={this.state.curIssue} 
              betCount={this.state.totalBetCount} 
              amount={this.state.totalBetAmount} 
              curGameMethodItems={this.state.curGameMethodItems} 
              defaultInitMethodItemAmount={this.state.defaultInitMethodItemAmount}
              updateDefaultInitMethodItemAmount={this.updateDefaultInitMethodItemAmount} 
              orderFinishCB={this.orderFinishCB}
              resetSelectedOfAllMethodItem={this.resetSelectedOfAllMethodItem}
            />
            {this.state.isShowLudan &&
              <Ludan 
                gameId={this.id} 
                gameType={this.gameType} 
                maxColumns={this.state.maxColumns} 
                maxRows={this.state.maxRows} 
                issueList={this.state.issueList.slice(0).reverse()} 
                methodMenuName={this.state.curMenuEname} 
                defaultMenu={this.state.defaultMenu} 
                defaultSubMenu={this.state.defaultSubMenu}
              />
            }
          </section>
          <div className="recent-open">
            <div className="tabs">
              <span className={ `tab ${ this.state.tabIndex === 0 ? 'active' : '' }` } onClick={ () => this.changeTabIndex(0) }>近期开奖</span>
              {/* <span className={ `tab ${ this.state.tabIndex === 1 ? 'active' : '' }` } onClick={ () => this.changeTabIndex(1) }>投注提醒 <Icon theme="filled" type="setting" /></span> */}
              <span className={ `tab ${ this.state.tabIndex === 1 ? 'active' : '' }` } onClick={ () => this.changeTabIndex(1) }>投注提醒</span>
            </div>
            {
              this.state.tabIndex === 0 ? <RecentOpen curMenuIndex={this.state.curMenuIndex} curSubMenuIndex={this.state.curSubMenuIndex} gameId={this.id} issueList={this.state.issueList.slice(0)} gameType={this.gameType} /> : <BetRemind />
            }
          </div>
        </GameCommonDataContext.Provider>
        {this.state.isShowLimitSetDialog && this.props.store.game.limitList && this.props.store.game.limitList.length > 0 && <LimitSetDialog isShow={this.state.isShowLimitSetDialog} gameId={this.id} limitLevelList={this.state.limitLevelList} onLimitChoiceCB={this.onLimitChoiceCB} onCloseHandler={this.onCloseLimitChoiceHandler} />}
      </article>
    );
  }
}

export default Game;
