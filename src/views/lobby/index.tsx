import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from "react-router-dom";
import LobbyMenu from './LobbyMenu';
import LobbyGame from './LobbyGame';
import { getGamesByType, getAllGames } from '../../game/games';
import { Game } from '../../typings/games';
import APIs from '../../http/APIs';
import InfiniteScroll from 'react-infinite-scroller';
import inject_unmount from '../../components/inject_unmount';
import './index.styl';

interface IProps {
  store?: any;
  gameType?: string;
}

type Props = IProps & RouteComponentProps;

interface State {
  curGameType: string;
  curGames: Game[];
  issueList: any[];
  bestLudanList: any[];
  recentCodeList: any[];
  curServerTime: number;
  isLoading: boolean;
  gameIds: string[];
  hasMore: boolean;
}

const PAGE_SIZE = 6;
let curPageNo = 1;
let totalPage = 1;

@inject("store")
@observer
@inject_unmount
class Lobby extends Component<Props, object> {
  DEFAULT_GAME_TYPE: string = 'hot';
  state: State;
  constructor(props: Props) {
    super(props);
    let curGames = this.filterAvailableGames(getAllGames()); 
    this.state = {
      curGameType: this.DEFAULT_GAME_TYPE,
      curGames,
      issueList: [],
      bestLudanList: [],
      recentCodeList: [],
      curServerTime: 0,
      isLoading: false,
      gameIds: [],
      hasMore: true
    }
  }
  init = () => {
    const gameIds = this.getGameIds(this.state.curGames);
    totalPage = Math.ceil(gameIds.length / PAGE_SIZE);
    this.setState({gameIds}, this.loadMore);
  }
  componentWillMount() {
    curPageNo = 1;
    totalPage = 1;
    if (this.state.curGames.length <= 0) {
      this.props.store.game.getAvailableGames((availableGames: number[]) => {
        this.setState({
          curGames: this.filterAvailableGames(getAllGames())
        }, this.init);
      });
    } else {
      this.init();
    }
  }
  goto = (path: string) => {
    this.props.history.push(path)
  }
  onMenuChanged = (type: string) => {
    this.setState({curGames: type === this.DEFAULT_GAME_TYPE ? getAllGames() : getGamesByType(type)})
  }
  filterAvailableGames(games: Game[]) {
    if (this.props.store.game.availableGames.length <= 0) return [];
    let tempGames: Game[] = [];
    games.forEach((game: Game) => {
      if (this.props.store.game.hasAvailableGame(game.id)) {
        tempGames.push(game);
      }
    });
    return tempGames;
  }
  getGameIds(games: Game[] = []) {
    return games.map((game: Game) => game.id) || [];
  }
  /**
   * 批量获取奖期数据
   * @param ids 游戏ID列表字符串
   */
  getIssuesByGameIds(ids: string) {
    APIs.getIssuesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        this.updateIssues(data.items, data.current);
      }
    });
  }
  /**
   * 批量获取最优路单
   * @param ids 游戏ID列表字符串
   */
  getBatchBestLudanByGameIds(ids: string) {
    APIs.getBatchBestLudanByGameIds({lotteryId: ids}).then((data: any) => {
      if (data.success > 0) {
        this.updateBestLudans(data.bestLudan);
      }
    });
  }
  /**
   * 批量获取历史开奖
   * @param ids 游戏ID列表字符串
   */
  getBatchRecentCodesByGameIds(ids: string) {
    return APIs.getBatchRecentCodesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        this.updateRecentCodes(data.data);
      }
    });
  }
  /**
   * 更新奖期数据
   * @param datas 奖期 
   * @param curServerTime 当前服务器时间
   */
  updateIssues(datas: any[], curServerTime: number) {
    let issueList = this.state.issueList;
    let found: number = -1;
    datas.forEach((issue: any) => {
      found = issueList.findIndex((item: any) => item.lotteryid === issue.lotteryid);
      if (found !== -1) {
        issueList.splice(found, 1, issue);
      } else {
        issueList.push(issue);
      }
    });
    this.setState({issueList, curServerTime});
  }
  /**
   * 更新最优路单路数
   * @param datas 最优路单路数列表
   */
  updateBestLudans(datas: any[]) {
    let bestLudanList = this.state.bestLudanList;
    let found: number = -1;
    datas.forEach((bestLudan: any) => {
      found = bestLudanList.findIndex((item: any) => item.lotteryId === bestLudan.lotteryId);
      if (found !== -1) {
        bestLudanList.splice(found, 1, bestLudan);
      } else {
        bestLudanList.push(bestLudan);
      }
    });
    this.setState({bestLudanList});
  }
  /**
   * 更新近期开奖数据
   * @param datas 近期开奖数据列表
   */
  updateRecentCodes(datas: any[]) {
    let recentCodeList = this.state.recentCodeList;
    let found: number = -1;
    datas.forEach((recentCode: any) => {
      found = recentCodeList.findIndex((item: any) => item[recentCode.lotteryid] && item[recentCode.lotteryid].length > 0);
      if (found !== -1) {
        recentCodeList.splice(found, 1, recentCode);
      } else {
        recentCodeList.push(recentCode);
      }
    });
    this.setState({recentCodeList});
  }
  loadMore = () => {
    this.loadData();
    
  }
  /**
   * 获取奖项、最优路单、近期开奖数据
   */
  loadData = () => {
    if (curPageNo > totalPage || !this.state.gameIds || this.state.gameIds.length < 1) return;
    this.setState({isLoading: true});
    const gameIds = this.state.gameIds.slice((curPageNo - 1) * PAGE_SIZE, curPageNo * PAGE_SIZE).join(',');
    this.getIssuesByGameIds(gameIds);
    this.getBatchBestLudanByGameIds(gameIds);
    this.getBatchRecentCodesByGameIds(gameIds).then(() => {
      this.setState({isLoading: false});
    });
    curPageNo++;
  }
  render() {
    return (
      <article className="lobby-view">
        <LobbyMenu onMenuChanged={this.onMenuChanged} />
        <section className="flex lobby-game-ls">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={<div className="loader" key={0}>{this.state.isLoading ? '加载中...' : ''}</div>}
          >
            {this.state.curGames.slice(0, curPageNo * PAGE_SIZE).map((game: Game) => (
              <LobbyGame key={game.id} gameType={this.state.curGameType} gameId={game.id} goto={this.goto} issueList={this.state.issueList} bestLudanList={this.state.bestLudanList} recentCodeList={this.state.recentCodeList} curServerTime={this.state.curServerTime} />
            ))}
          </InfiniteScroll>
        </section>
      </article>
    )
  }
}

export default Lobby;
