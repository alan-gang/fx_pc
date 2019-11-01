import Colors from './colorConfig';
import { methods } from './ludanMethods';

const subM: object[] = [{name: 'dx', title: '大小'}, {name: 'ds', title: '单双'}];
export const methodTabs: any = {
  ssc: {
    zhenghe: [
      {title: '总和', name: 'zh', subM},
      {title: '万位', name: 'ww', subM},
      {title: '千位', name: 'qw', subM},
      {title: '百位', name: 'bw', subM},
      {title: '十位', name: 'sw', subM},
      {title: '个位', name: 'gw', subM}
    ],
    dw: [
      {title: '万位', name: 'ww', subM},
      {title: '千位', name: 'qw', subM},
      {title: '百位', name: 'bw', subM},
      {title: '十位', name: 'sw', subM},
      {title: '个位', name: 'gw', subM}
    ],
    lhh: [
      {title: '万千', name: 'wq_lhh', subM: []},
      {title: '万百', name: 'wb_lhh', subM: []},
      {title: '万十', name: 'ws_lhh', subM: []},
      {title: '万个', name: 'wg_lhh', subM: []},
      {title: '千百', name: 'qb_lhh', subM: []},
      {title: '千十', name: 'qs_lhh', subM: []},
      {title: '千个', name: 'qg_lhh', subM: []},
      {title: '百十', name: 'bs_lhh', subM: []},
      {title: '百个', name: 'bg_lhh', subM: []},
      {title: '个位', name: 'gw_lhh', subM: []}
    ],
    yzzh: []
  },
  '11x5': {
    zhenghe: [
      {title: '总和', name: 'zh', subM},
      {title: '总和尾', name: 'zhw', subM},
      {title: '第一位', name: 'ww', subM},
      {title: '第二位', name: 'qw', subM},
      {title: '第三位', name: 'bw', subM},
      {title: '第四位', name: 'sw', subM},
      {title: '第五位', name: 'gw', subM},
      {title: '龙虎', name: 'lh_1v2', subM: []}
    ],
    dw: [
      {title: '总和', name: 'zh', subM},
      {title: '总和尾', name: 'zhw', subM},
      {title: '第一位', name: 'ww', subM},
      {title: '第二位', name: 'qw', subM},
      {title: '第三位', name: 'bw', subM},
      {title: '第四位', name: 'sw', subM},
      {title: '第五位', name: 'gw', subM},
      {title: '龙虎', name: 'lh_1v2', subM: []}
    ],
    lh: [
      {title: '一位VS二位', name: 'lh_1v2', subM: []},
      {title: '一位VS三位', name: 'lh_1v3', subM: []},
      {title: '一位VS四位', name: 'lh_1v4', subM: []},
      {title: '一位VS五位', name: 'lh_1v5', subM: []},
      {title: '二位VS三位', name: 'lh_2v3', subM: []},
      {title: '二位VS四位', name: 'lh_2v4', subM: []},
      {title: '二位VS五位', name: 'lh_2v5', subM: []},
      {title: '三位VS四位', name: 'lh_3v4', subM: []},
      {title: '三位VS五位', name: 'lh_3v5', subM: []},
      {title: '四位VS五位', name: 'lh_4v5', subM: []}
    ],
    rx: [],
    zux: [],
    zx: []
  },
  pk10: {
    zhenghe: [
      {title: '冠亚和值', name: 'zh', subM},
      {title: '冠军', name: 'd1w', subM},
      {title: '亚军', name: 'd2w', subM},
      {title: '季军', name: 'd3w', subM},
      {title: '第四位', name: 'd4w', subM},
      {title: '第五位', name: 'd5w', subM},
      {title: '第六位', name: 'd6w', subM},
      {title: '第七位', name: 'd7w', subM},
      {title: '第八位', name: 'd8w', subM},
      {title: '第九位', name: 'd9w', subM},
      {title: '第十位', name: 'd10w', subM}
    ],
    lh: [
      {title: '冠军VS第十名', name: 'hl_1v10', subM: []},
      {title: '亚军VS第九名', name: 'hl_2v9', subM: []},
      {title: '季军VS第八名', name: 'hl_3v8', subM: []},
      {title: '第四名VS第七名', name: 'hl_4v7', subM: []},
      {title: '第五名VS第六名', name: 'h1_5v6', subM: []}
    ],
    dwgy: [],
    gyhz: [
      {title: '冠亚和大小', name: 'gy_dx', subM: []},
      {title: '冠亚和单双', name: 'gy_ds', subM: []}
    ]
  },
  k3: {
    diansu: [
      {title: '总和大小', name: 'zh_dx', subM: []},
      {title: '总和单双', name: 'zh_ds', subM: []}
    ],
    shanjun: [],
    wqshai: [],
    changpai: [],
    duanpai: [],
    yskd: []
  }
}

export function getTabsByType(type: string, methodName: string): any[] {
  return methodTabs[type][methodName];
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
export const MAX_COLUMNS: number = 30;

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
  let temp: any;
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

          case 'd1w_dx':
          case 'd1w_ds':
          case 'd2w_dx':
          case 'd2w_ds':
          case 'd3w_dx':
          case 'd3w_ds':
          case 'd4w_dx':
          case 'd4w_ds':  
          case 'd5w_dx':
          case 'd5w_ds':
          case 'd6w_dx':
          case 'd6w_ds':
          case 'd7w_dx':  
          case 'd7w_ds':  
          case 'd8w_dx':  
          case 'd8w_ds':  
          case 'd9w_dx':  
          case 'd9w_ds':  
          case 'd10w_dx':  
          case 'd10w_ds':  
            item = cs.value[mObj.pos][mObj.method.split('_')[1]];
            break;
          case '1v2':
          case '1v3':
          case '1v4':
          case '1v5':
          case '1v10':  
          case '2v3':
          case '2v4':
          case '2v5':
          case '2v9':  
          case '3v4':
          case '3v5':
          case '3v8':
          case '4v5':
          case '4v7':
          case '5v6':
            temp = cs.data && cs.data.find((item: any) => mObj.method === item.pos);
            item = temp && temp.val || '';
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
