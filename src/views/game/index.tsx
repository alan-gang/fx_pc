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
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';
import methodItems from '../../game/methodItems';
import APIs from '../../http/APIs';

import './index.styl';
import { methods } from 'src/utils/ludanMethods';

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
  numCss: string;
  curMenuIndex: number;
  subMethods: GameSubMethodMenu[];
  curGameMethodItems: any[];
  issueList: any[];
  defaultInitMethodItemAmount: number; // 默认初始投注金额
  totalBetCount: number;  // 总注数
  totalBetAmount: number; // 总投注金额
}

interface DataMethodList {
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
  curGameOdds: any;
  constructor(props: Props) {
    super(props);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    this.state = {
      id: 1,
      gameType: 'ssc',
      curIssue: '',
      lastIssue: '',
      curTime: 0,
      remainTime: 60 * 10 * 1000,
      openNumbers: [],
      numCss: '',
      curMenuIndex: 0,
      subMethods: [],
      curGameMethodItems: this.getMethodItemsByIds((menus && menus[0].ids) || []),
      issueList: [],
      defaultInitMethodItemAmount: 2,
      totalBetCount: 0,
      totalBetAmount: 0
    }
    this.updateOddsOfMethod();
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps: Props, nextState: State) {
    this.id = parseInt(nextProps.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    console.log('render id=', this.id, this.gameType);
    console.log('game componentWillReceiveProps', nextProps, nextState);
    if (this.props.match.params.id !== nextProps.match.params.id) {
      let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
      this.setState({
        curMenuIndex: 0, 
        curGameMethodItems: this.getMethodItemsByIds((menus && menus[0].ids) || [])
      });
      this.getCurIssue(this.id);
      this.getUserPoint(this.id);
      this.getHistoryIssue(this.id);
    }
  }
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
  updateMethodIds = (method: GameMethodMenu) => {
    let curGameMethodItems = this.getMethodItemsByIds(method.ids || [])
    this.setState({
      subMethods: method.subMethods || [],
      curGameMethodItems
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
      methodItems[i].rows[j].vs[k].val = value;
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
    let methodList: DataMethodList[] = [];
    let method: any;
    let rowItems: any[];
    this.state.curGameMethodItems.forEach((methodItem: any) => {
      method = {id: methodItem.id, rows: []};
      methodItem.rows.forEach((row: any) => {
        rowItems = [];
        row.vs.forEach((vsItem: any) => {
          if (vsItem.s) {
            rowItems.push(vsItem.val);
            // amountList.push(vsItem.val);
          }
        });
        method.rows.push(rowItems);
      })
      methodList.push(method);
    });
    let betCount: number = 0;

    methodList = methodList.map((methodItem: any) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        return row.length;
      })
      return methodItem;
    })
    
    // let id: string = '';
    methodList.forEach((methodItem: DataMethodList) => {
      // id = String(methodItem.id);
      // betCount += calc[methodItem.id]({nsl: methodItem.rows});
    })
    // this.setState({totalBetCount: amountList.length})
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
        this.curGameOdds = data.items;
        this.updateOddsOfMethod(this.curGameOdds);
      }
    });
  }
  render() {
    this.id = parseInt(this.props.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    console.log('render id=', this.id);
    return (
      <article className="game-view">
        <GameHeader 
          gameId={this.id}
          gameType={this.gameType}
          curIssue={this.state.curIssue}
          lastIssue={this.state.lastIssue}
          curTime={this.state.curTime}
          openNumbers={this.state.openNumbers}
          numCss={this.state.numCss}
        />
        <section className="game-main">
          <MethodMenu gameType={this.gameType} curMenuIndex={this.state.curMenuIndex} updateMethodIds={this.updateMethodIds} updateMethodMenuIndex={this.updateMethodMenuIndex}/>
          {this.state.subMethods.length > 0 && <SubMethodMenu gameType={this.gameType} subMethods={this.state.subMethods} updateSubMethods={this.updateSubMethods} />}
          <Play 
            curGameMethodItems={this.state.curGameMethodItems} 
            gameType={this.gameType} 
            defaultInitMethodItemAmount={this.state.defaultInitMethodItemAmount}
            updateMethdItem={this.updateMethdItem} 
          />
          <OrderBar betCount={this.state.totalBetCount} amount={2} updateDefaultInitMethodItemAmount={this.updateDefaultInitMethodItemAmount}/>
        </section>
        <section className="recent-open"></section>
      </article>
    );
  }
}

export default Game;
