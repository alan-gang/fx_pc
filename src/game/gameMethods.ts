
import { LOTTERY_TYPES } from '../utils/config';
import { MethodsConfig } from '../typings/game-methods';
import { GameMethodMenu } from '../typings/games';

// 近期开奖配置
const hz = (params = {}) => {
  return Object.assign({
    title: '和值',
    type: 'hz'
  }, params)
}

const dx = (params = {}) => {
  return Object.assign({
    title: '大小',
    type: 'dx'
  }, params)
}

const ds = {
  title: '单双',
  type: 'ds'
}

const kd = {
  title: '跨度',
  type: 'kd'
}

const color = {
  title: '颜色',
  type: 'ys'
}

const lh = (params: any) => {
  return Object.assign({
    title: '龙虎',
    type: 'lh'
  }, params)
}

// 玩法配置
export let methodsConfig: MethodsConfig = {
  [LOTTERY_TYPES.SSC]: [
    {
      name: '整合',
      ename: 'zhenghe',
      recentType: [hz({min: 22})],
      ids: ['1251:1', '1250:1','1252:1', '1274:1', '1275:1', '1276:1']
    },
    {
      name: '定位',
      ename: 'dw',
      recentType: [dx({min: 4}), ds],
      ids: ['1253:1']
    },
    {
      name: '龙虎',
      ename: 'lhh',
      recentType: [lh({title: '万千', range: {start: 0, end: 2}})],
      ids: ['1273:1']
    },
    {
      name: '一字组合',
      ename: 'yzzh',
      recentType: [dx({min: 4}), ds],
      ids: ['1256:1', '1257:1', '1258:1', '1259:1']
    }
  ],
  [LOTTERY_TYPES.G11X5]: [
    {
      name: '整合',
      ename: 'zhenghe',
      recentType: [hz({min: 22})],
      ids: ['2050:1', '2050:2', '2053:2', '2051:1']
    },
    {
      name: '定位',
      ename: 'dw',
      recentType: [dx({min: 4})],
      ids: ['2052:1']
    },
    {
      name: '龙虎',
      ename: 'lh',
      recentType: [lh({name: '一位VS二位', range: {start: 0, end: 2}})],
      ids: ['2053:1']
    },
    {
      name: '任选',
      ename: 'rx',
      recentType: [dx({min: 4})],
      ids: ['2054:1:1'],
      subMethods: [
        {s: true, name: '一中一', v: '1z1', oddIndex: 7, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:1']},
        {s: false, name: '二中二', v: '2z2', oddIndex: 6, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:2']},
        {s: false, name: '三中三', v: '3z3', oddIndex: 4, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:3']},
        {s: false, name: '四中四', v: '4z4', oddIndex: 2, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:4']},
        {s: false, name: '五中五', v: '5z5', oddIndex: 0, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:5']},
        {s: false, name: '六中五', v: '6z5', oddIndex: 1, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:6']},
        {s: false, name: '七中五', v: '7z5', oddIndex: 3, class: 'layout-ud w110 h60  pd-t-12', mid: '2054', odd: '', ids: ['2054:1:7']},
        {s: false, name: '八中五', v: '8z5', oddIndex: 5, class: 'layout-ud w110 h60  pd-t-12 no-bd-r', mid: '2054', odd: '', ids: ['2054:1:8']}
      ]
    },
    {
      name: '组选',
      ename: 'zux',
      ids: ['2055:1'],
      recentChild: true,
      subMethods: [
        {s: true, name: '前二组选', recentType: [hz({title: '前二和值', nForm: true, range: {start: 0, end: 2}})], oddIndex: 0, class: 'layout-lr w180 h40 flex ai-c jc-c odd-pd-l-5', mid: '2055', odd: '', ids: ['2055:1']},
        {s: false, name: '前三组选', recentType: [hz({title: '前三和值', nForm: true,range: {start: 0, end: 3}})], oddIndex: 0, class: 'layout-lr  w180 h40 flex ai-c jc-c odd-pd-l-5', mid: '2056', odd: '', ids: ['2056:1']}
      ]
    },
    {
      name: '直选',
      ename: 'zx',
      ids: ['2057:1'],
      recentChild: true,
      subMethods: [
        {s: true, name: '前二直选', recentType: [hz({title: '前二和值', nForm: true, range: {start: 0, end: 2}})], oddIndex: 0, class: 'layout-lr w180 h40 flex ai-c jc-c odd-pd-l-5', mid: '2057', odd: '', ids: ['2057:1']},
        {s: false, name: '前三直选', recentType: [hz({title: '前三和值', nForm: true, range: {start: 0, end: 3}})], oddIndex: 0, class: 'layout-lr  w180 h40 flex ai-c jc-c odd-pd-l-5', mid: '2058', odd: '', ids: ['2058:1']}
      ]
    }
  ],
  [LOTTERY_TYPES.PK10]: [
    {
      name: '整合',
      ename: 'zhenghe',
      recentType: [hz({range: [{start: 0, end: 1}, {start: 1, end: 2}], changeTitle: ['冠亚开奖号码'], min: 11})],
      ids: ['4050:1', '4053:1', '4053:2']
    },
    {
      name: '龙虎',
      ename: 'lh',
      recentType: [lh({name: '龙虎', changeTitle: ['冠军', '第十名'], range: [{start: 0, end: 1}, {start: 1, end: 2}]})],
      ids: ['4054:1']
    },
    {
      name: '定位01-10',
      ename: 'dwgy',
      ids: ['4055:1:1', '4055:1:2']
    },
    {
      name: '冠亚组合',
      ename: 'gyhz',
      recentType: [hz({range: [{start: 0, end: 1}, {start: 1, end: 2}], changeTitle: ['冠亚', ['亚军']], min: 11})],
      ids: ['4050:1', '4051:1', '4052:1']
    }
  ],
  [LOTTERY_TYPES.K3]: [
    {
      name: '点数',
      ename: 'diansu',
      recentType: [hz({min: 10})],
      ids: ['5050:1', '5051:1']
    },
    {
      name: '三军',
      ename: 'shanjun',
      recentType: [hz({min: 10})],
      ids: ['5052:1']
    },
    {
      name: '围骰/全骰',
      ename: 'wqshai',
      recentType: [hz({min: 10})],
      ids: ['5053:1']
    },
    {
      name: '长牌',
      ename: 'changpai',
      recentType: [hz({min: 10})],
      ids: ['5054:1']
    },
    {
      name: '短牌',
      ename: 'duanpai',
      recentType: [hz({min: 10})],
      ids: ['5055:1']
    },
    {
      name: '颜色',
      ename: 'yskd',
      recentType: [color],
      ids: ['5056:1']
    },
    {
      name: '跨度',
      ename: 'yskd',
      recentType: [kd],
      ids: ['5057:1']
    }
  ]
};

// 匹配玩法对象
export function getMethodByIds(ids: string[], gameType: string) {
  let curGameTypeMethods = methodsConfig[gameType] || [];
  for (let i = 0; i < curGameTypeMethods.length; i++) {
    if (curGameTypeMethods[i].ids.join('') === ids.join('')) {
      return curGameTypeMethods[i];
    }
  }
  return null;
}

/**
 * 获取子玩法列表
 * @param {*} gameType 游戏类型（必须）
 */
export function getMethodsConfigByType(gameType: string): GameMethodMenu[] {
  return methodsConfig[gameType];
}

/**
 * 根据游戏类型和玩法ID获取当前玩法在当前游戏类型玩法菜单中的位置
 * @param gameType 游戏类型
 * @param methodId 玩法ID
 */
export function getMethodPosByGameTypeAndId(gameType: string, methodId: number): number {
  return (methodsConfig[gameType] || []).findIndex((m: GameMethodMenu) => {
    return m.ids.find((id: string) => parseInt(id.split(':')[0], 10) === methodId)
  })
}
