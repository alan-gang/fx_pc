import Colors from './colorConfig';
import { methods } from './ludanMethods';

const subM: object[] = [{name: 'dx', title: '大小'}, {name: 'ds', title: '单双'}];
export const methodTabs: any = {
  ssc: [
    {title: '总和', name: 'zh', subM},
    {title: '万个龙', name: 'wg_lhh', subM: []},
    {title: '万位', name: 'ww', subM},
    {title: '千位', name: 'qw', subM},
    {title: '百位', name: 'bw', subM},
    {title: '十位', name: 'sw', subM},
    {title: '个位', name: 'gw', subM}
  ],
  '11x5': [
    {title: '总和', name: 'zh', subM},
    {title: '总和尾', name: 'zhw', subM: [{name: 'wsdx', title: '大小'}, {name: 'wsds', title: '单双'}]},
    {title: '龙虎', name: 'wg_lhh', subM: []},
    {title: '第一位', name: 'ww', subM},
    {title: '第二位', name: 'qw', subM},
    {title: '第三位', name: 'bw', subM},
    {title: '第四位', name: 'sw', subM},
    {title: '第五位', name: 'gw', subM}
  ],
  pk10: [
    {title: '冠亚和', name: 'zh', subM},
    {title: '冠军', name: 'ww', subM},
    {title: '亚军', name: 'qw', subM},
    {title: '季军', name: 'bw', subM},
    {title: '第四位', name: 'sw', subM},
    {title: '第五位', name: 'gw', subM}
  ],
  k3: [
    {title: '大小', name: 'zh_dx', subM: []},
    {title: '单双', name: 'zh_ds', subM: []}
  ]
}

export function getTabsByType(type: string): any[] {
  return methodTabs[type];
}

export function getSubTabByType(type: string, tabName: string): any {
  let tabs = methodTabs[type];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].name === tabName) {
      return tabs[i];
    }
  }
  return null;
}


/**
 * 根据游戏类型获取玩法列表
 * @param type 游戏类型
 */
export function getMethodListByType(type: string): LudanMethod[] {
  let mls: LudanMethod[] = [];
  methods.forEach((v: LudanMethod, k) => {
    if (v.type === type) {
      mls.push(v);
    }
  });
  return mls;
}

export function getMethodById(id: string): LudanMethod | null {
  for (let [key, value] of methods) {
    if (value.id === id) {
      return value;
    }
  }
  return null;
}

export function getMethodDataByName(name: string): LudanMethod | undefined {
  return methods.get(name);
}

export const MAX_ROWS: number = 6;
export const MAX_COLUMNS: number = 24;

/**
 * 根据玩法获取对应的路单
 * @param issueList 开奖历史期数
 * @param name 玩法名取值参考methods配置列表的method字段
 * @param maxRows 路单最大展示的行数，默认为6行
 * @param maxColumns 路单最大展示的列数，默认为18列
 */
export function getLuDanListByMethod(issueList: any[], type: string, name: string, maxRows: number = MAX_ROWS, maxColumns: number = MAX_COLUMNS): object[] | null {
  if (!issueList || issueList.length < 1 || !name) {
    return null;
  }
  const mObj: any = getMethodDataByName(type + '_' + name);
  if (!mObj) {
    return [];
  }
  let ludanItems: string[] = [];
  let item: string = '';
  let ludanList: any = [];
  let codeStyles: any[];
  issueList.forEach((issue: any, i: number) => {
    codeStyles = JSON.parse(issue.codeStyle || '[]');
    codeStyles.forEach((cs: any, j: number) => {
      if (cs.methodId.indexOf(mObj.methodId) !== -1) {
        switch (mObj.method) {
          case 'zh_dx':
          case 'zh_ds':
          case 'zhw_wsdx':
          case 'zhw_wsds':
            item = cs.value[0][mObj.method.split('_')[1]];
            break;
          case 'wg_lhh':
            item = cs.value[0];
            break;
          case 'ww_dx':
          case 'ww_ds':
          case 'qw_dx':
          case 'qw_ds':
          case 'bw_dx':
          case 'bw_ds':
          case 'sw_dx':
          case 'sw_ds':
          case 'gw_dx':
          case 'gw_ds':
            item = cs.value[mObj.pos][mObj.method.split('_')[1]];
            break;
          default:
            break;
        }
        if (ludanItems.indexOf(item) !== -1) {
          ludanItems.push(item);
        } else {
          if (ludanItems.length > 0) {
            ludanList.push(ludanItems);
            ludanItems = [];
          }
          ludanItems.push(item);
        }
        // 最个一个
        if (issueList.length - 1 === i) {
          if (ludanItems.length < maxRows) {
            ludanItems.push('icon-cur');
            ludanList.push(ludanItems);
            ludanItems = [];
          } else {
            ludanList.push(ludanItems);
            ludanItems = [];
            ludanItems.push('icon-cur');
            ludanList.push(ludanItems);
          }
        }
      }
    });
  });
  return ludanList.slice(ludanList.length >= maxColumns ? Math.abs(ludanList.length - maxColumns + 1) : 0);
}

export function getCellData(ludanList: any[], c: number, r: number, maxRows: number = MAX_ROWS): string {
  if (!ludanList) return '';
  if (ludanList[c] && ludanList[c][r]) {
    if (['icon-cur', 'icon-qs'].indexOf(ludanList[c][r]) !== -1) {
      return ludanList[c][r];
    }
    if (r === maxRows - 1 && ludanList[c].length > maxRows) {
      return String(ludanList[c].length);
    } else {
      return ludanList[c][r];
    }
  } else {
    return '';
  }
}

/**
 * 单个路单样式
 * @param ludanList
 * @param col
 * @param row
 */
export function getCellStyle(ludanList: any[], col: number, row: number, maxRows: number = MAX_ROWS) {
  if (getCellData(ludanList, col, row, maxRows) === 'icon-cur') return 'icon-cur';
  if (getCellData(ludanList, col, row, maxRows) === 'icon-qs') return 'icon-qs';
  return Colors.getStyle(getCellData(ludanList, col, row, maxRows));
}
