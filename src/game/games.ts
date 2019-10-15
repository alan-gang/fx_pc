
import { GameCategory, Game } from '../typings/games';
import { LOTTERY_TYPES } from '../utils/config';
import { getMethodsConfigByType as getMethods} from './gameMethods';

let games: GameCategory[] = [
  {
    type: 'ssc',
    name: '时时彩',
    items: [
      {id: 1, mid: '11', name: '重庆欢乐生肖', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 29, mid: '96', name: '腾讯分分彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 150, mid: '75', name: '微博5分彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 17, mid: '79', name: '欢乐分分彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 21, mid: '80', name: '幸福三分彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 3, mid: '12', name: '新疆时时彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 35, mid: '101', name: '黑龙江时时彩', checked: true, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 161, mid: '122', name: '阿里云分分彩', checked: true, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 155, mid: '116', name: '重庆怀旧时时彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 157, mid: '118', name: '重庆怀旧分分彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 156, mid: '117', name: '新疆怀旧时时彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 4, mid: '9', name: '天津时时彩', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 152, mid: '113', name: '腾讯2分彩奇数', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)},
      {id: 153, mid: '114', name: '腾讯2分彩偶数', checked: false, methods: getMethods(LOTTERY_TYPES.SSC)}
    ]
  },
  {
    type: '11x5',
    name: '11选5',
    items: [
      {id: 6, mid: '16', name:'11运夺金', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 11, mid: '14', name:'夺金120秒', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 7, mid: '62', name:'多乐彩', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 8, mid: '15', name:'广东11选5', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 22, mid: '81', name:'湖北11选5', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 36, mid: '102', name:'江苏11选5', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 37, mid: '103', name:'上海11选5', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 38, mid: '104', name:'安徽11选5', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)},
      {id: 46, mid: '124', name:'山西11选5', checked: false, methods: getMethods(LOTTERY_TYPES.G11X5)}
    ]
  },
  {
    type: 'pk10',
    name: 'PK10',
    items: [
      {id: 39, mid: '105', name:'幸运飞艇', checked: false, methods: getMethods(LOTTERY_TYPES.PK10)},
      {id: 13, mid: '18', name:'北京PK10', checked: false, methods: getMethods(LOTTERY_TYPES.PK10)},
      {id: 43, mid: '109', name:'幸运赛车', checked: false, methods: getMethods(LOTTERY_TYPES.PK10)},
      {id: 151, mid: '74', name:'腾讯赛车', checked: false, methods: getMethods(LOTTERY_TYPES.PK10)},
      {id: 162, mid: '123', name:'阿里云赛车', checked: false, methods: getMethods(LOTTERY_TYPES.PK10)}
    ]
  },
  {
    type: 'k3',
    name: '快三',
    items: [
      {id: 23, mid: '82', name:'安徽快三', checked: false, methods: getMethods(LOTTERY_TYPES.K3)},
      {id: 24, mid: '83', name:'江苏快三', checked: false, methods: getMethods(LOTTERY_TYPES.K3)},
      {id: 25, mid: '84', name:'吉林快三', checked: false, methods: getMethods(LOTTERY_TYPES.K3)},
      {id: 26, mid: '85', name:'北京快三', checked: false, methods: getMethods(LOTTERY_TYPES.K3)},
      {id: 33, mid: '19', name:'幸福快三', checked: false, methods: getMethods(LOTTERY_TYPES.K3)}
    ]
  }
];

export function getGameById(id: number): Game | null {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].items.length; j++) {
      if (id === games[i].items[j].id) {
        return games[i].items[j];
      }
    }
  }
  return null;
}

export default games;
