import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameHeader from 'comp/game-header';
import MethodMenu from 'comp/method-menu';
import SubMethodMenu from 'comp/sub-method-menu';
import Play from 'comp/play';
import OrderBar from 'comp/order-bar';
import { RouteComponentProps } from "react-router-dom";
import { getGameTypeByGameId } from '../../game/games';
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';
import methodItems from '../../game/methodItems';

import './index.styl';

interface IProps {
  store?: any;
  gameType?: string;
}

interface State {
  id: number;
  gameType: string;
  curIssue: number;
  lastIssue: number;
  curTime: number;
  openNumbers: string[];
  numCss: string;
  curMenuIndex: number;
  subMethods: GameSubMethodMenu[];
  curGameMethodItems: any[]
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
  constructor(props: Props) {
    super(props);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    this.state = {
      id: 1,
      gameType: 'ssc',
      curIssue: 1231242121,
      lastIssue: 123124120,
      curTime: 1571212837157,
      openNumbers: ['0', '5', '7', '2', '2'],
      numCss: '',
      curMenuIndex: 0,
      subMethods: [],
      curGameMethodItems: this.getMethodItemsByIds((menus && menus[0].ids) || [])
    }
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
  updateMethodMenuIndex = (index: number) => {
    this.setState({curMenuIndex: index});
  }
  updateMethodIds = (method: GameMethodMenu) => {
    this.setState({
      subMethods: method.subMethods || [],
      curGameMethodItems: this.getMethodItemsByIds(method.ids || [])
    });
  }
  updateSubMethods = (method: GameSubMethodMenu) => {
    this.setState({
      curGameMethodItems: this.getMethodItemsByIds(method.ids || [])
    });
  }
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
          <Play curGameMethodItems={this.state.curGameMethodItems} gameType={this.gameType} updateMethdItem={this.updateMethdItem} />
          <OrderBar />
        </section>
        <section className="recent-open"></section>
      </article>
    );
  }
}

export default Game;
