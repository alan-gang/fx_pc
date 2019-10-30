import React, { Component, createContext } from 'react';
import { inject, observer } from 'mobx-react';
import GameHeader from 'comp/game-header';
import MethodMenu from 'comp/method-menu';
import SubMethodMenu from 'comp/sub-method-menu';
import Play from 'comp/play';
import OrderBar from 'comp/order-bar';
import { RouteComponentProps } from "react-router-dom";
import { getGameTypeByGameId } from '../../game/games';
import calc from '../../game/calc';
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';
import methodItems from '../../game/methodItems';
import APIs from '../../http/APIs';
import { removeRepeat2DArray } from '../../utils/game';
import { GameCommonDataContext } from '../../context/gameContext';
// import { methods } from 'src/utils/ludanMethods';

import './index.styl';


interface IProps {
  store?: any;
  gameType?: string;
}

interface State {
  id: number;
  gameType: string;
  curIssue: string;
  lastIssue: string;
  curTime: number;
  remainTime: number;
  openNumbers: string[];
  curMenuIndex: number;
  curSubMenuIndex: number;
  subMethods: GameSubMethodMenu[];
  curGameMethodItems: any[];
  odds: any;
  // methodItems: any;
  issueList: any[];
  defaultInitMethodItemAmount: number; // 默认初始投注金额
  totalBetCount: number;  // 总注数
  totalBetAmount: number; // 总投注金额
}

interface DataMethodItem {
  id: string;
  rows: any[];
}

interface MatchParams {
  id: string;
}

type Props = IProps & RouteComponentProps<MatchParams>;

// interface GameCommonDataType {
//   gameId: number;
//   gameType: string;
// }

// const GameCommonDataContext = createContext<GameCommonDataType | null>(null);

@inject("store")
@observer
class Game extends Component<Props, object> {
  id: number = 1;
  gameType: string = 'ssc';
  state: State;
  methodItems: any = methodItems;
  // odds: any;
  calc: any = calc;
  constructor(props: Props) {
    super(props);
    this.id = parseInt(this.props.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    this.state = {
      id: 1,
      gameType: 'ssc',
      curIssue: '',
      lastIssue: '',
      curTime: 0,
      remainTime: 0,
      openNumbers: [],
      curMenuIndex: 0,
      curSubMenuIndex: 0,
      subMethods: [],
      curGameMethodItems: this.getMethodItemsByIds((menus && menus[0].ids) || []),
      odds: {},
      // methodItems: {},
      issueList: [],
      defaultInitMethodItemAmount: 2,
      totalBetCount: 0,
      totalBetAmount: 0
    }
    this.init();
    console.log('game constructor id=', this.id, this.gameType);
  }
  init() {
    this.getCurIssue(this.id);
    this.getUserPoint(this.id);
    this.getHistoryIssue(this.id);
  }
  componentWillReceiveProps(nextProps: Props, nextState: State) {
    this.id = parseInt(nextProps.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    console.log('game componentWillReceiveProps id=', this.id, this.gameType);
    // console.log('game componentWillReceiveProps', nextProps, nextState);
    if (this.props.match.params.id !== nextProps.match.params.id) {
      let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
      this.setState({
        curMenuIndex: 0, 
        curGameMethodItems: this.getMethodItemsByIds((menus && menus[0].ids) || []),
        subMethods: (menus && menus[0].subMethods) || []
      });
      this.init();
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
    let curGameMethodItems = this.getMethodItemsByIds(method.ids || [])
    this.setState({
      subMethods: method.subMethods || [],
      curGameMethodItems,
      totalBetCount: 0,
      totalBetAmount: 0,
      curSubMenuIndex: 0,
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
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
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
    this.setState({curGameMethodItems});
  }

  // 更新默认初始下注金额
  updateDefaultInitMethodItemAmount = (amount: number): void => {
    this.setState({defaultInitMethodItemAmount: amount});
  }
  calcBet() {
    let methodList: DataMethodItem[] = [];
    let method: any;
    let betCount: number = 0;
    let totalAmount: number = 0;

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

    // 去重
    if (['zx_q2', 'zx_q3'].includes(methodTypeName)) {
      methodList = methodList.map((methodItem: DataMethodItem) => {
        methodItem.rows = removeRepeat2DArray(methodItem.rows.slice(0));
        return methodItem;
      });
    }
    
    // 构造注数计算格式
    methodList = methodList.map((methodItem: DataMethodItem) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        return row.length;
      })
      return methodItem;
    });

    // 总注数
    methodList.forEach((methodItem: DataMethodItem) => {
      betCount += this.calc[methodItem.id]({nsl: methodItem.rows});
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
  getCurIssue(gameid: number) {
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
  render() {
    console.log('game render id=', this.id);
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
          />
          <section className="game-main">
            <MethodMenu gameType={this.gameType} curMenuIndex={this.state.curMenuIndex} methodMenuChangedCB={this.methodMenuChangedCB} updateMethodMenuIndex={this.updateMethodMenuIndex}/>
            {this.state.subMethods.length > 0 && <SubMethodMenu gameType={this.gameType} curSubMenuIndex={this.state.curSubMenuIndex} subMethods={this.state.subMethods} odds={this.state.odds} updateSubMethods={this.updateSubMethods} updateSubMethodMenuIndex={this.updateSubMethodMenuIndex} />}
            <Play 
              curGameMethodItems={this.state.curGameMethodItems} 
              gameType={this.gameType} 
              defaultInitMethodItemAmount={this.state.defaultInitMethodItemAmount}
              updateMethdItem={this.updateMethdItem} 
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
          </section>
          <section className="recent-open"></section>
        </GameCommonDataContext.Provider>
      </article>
    );
  }
}

export default Game;
