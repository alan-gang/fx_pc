
import { GameCategory, Game } from '../typings/games';

let games: GameCategory[] = [
  {
    type: 'ssc',
    name: '时时彩',
    items: [
      {id: 1, mid: '11', name: '重庆欢乐生肖', checked: false},
      {id: 171, mid: '116', name: '重庆怀旧时时彩', checked: false},
      {id: 173, mid: '118', name: '重庆怀旧分分彩', checked: false},
      {id: 168, mid: '96', name: '腾讯分分彩', checked: false},
      {id: 176, mid: '79', name: '欢乐分分彩', checked: false},
      {id: 167, mid: '80', name: '幸福三分彩', checked: false},
      {id: 150, mid: '75', name: '微博5分彩', checked: false},
      {id: 3, mid: '12', name: '新疆时时彩', checked: false},
      {id: 172, mid: '117', name: '新疆怀旧时时彩', checked: false},
      {id: 4, mid: '9', name: '天津时时彩', checked: false},
      {id: 35, mid: '101', name: '黑龙江时时彩', checked: false},
      {id: 161, mid: '122', name: '阿里云分分彩', checked: false},
      {id: 158, mid: '119', name: '河内5分彩', checked: false},
      {id: 163, mid: '126', name: '河内1分彩', checked: false},
      {id: 164, mid: '127', name: '奇趣腾讯分分彩', checked: false},
      {id: 152, mid: '113', name: '腾讯2分彩奇数', checked: false},
      {id: 153, mid: '114', name: '腾讯2分彩偶数', checked: false},
      // {id: 18, mid: '128', name: '韩国1.5分彩', checked: false},
      // {id: 19, mid: '129', name: '东京1.5分彩', checked: false},
      // {id: 34, mid: '130', name: '激情30秒', checked: false},
      {id: 165, mid: '132', name: '奇趣腾讯5分彩', checked: false},
      {id: 166, mid: '133', name: '奇趣腾讯10分彩', checked: false}
    ]
  },
  {
    type: '11x5',
    name: '11选5',
    items: [
      {id: 6, mid: '16', name: '11运夺金', checked: false},
      {id: 175, mid: '14', name: '夺金120秒', checked: false},
      {id: 7, mid: '62', name: '多乐彩', checked: false},
      {id: 8, mid: '15', name: '广东11选5', checked: false},
      {id: 40, mid: '131', name: '辽宁11选5', checked: false},
      {id: 22, mid: '81', name: '湖北11选5', checked: false},
      {id: 36, mid: '102', name: '江苏11选5', checked: false},
      {id: 37, mid: '103', name: '上海11选5', checked: false},
      {id: 38, mid: '104', name: '安徽11选5', checked: false},
      {id: 159, mid: '120', name: '福建11选5', checked: false},
      {id: 46, mid: '124', name: '山西11选5', checked: false}
    ]
  },
  {
    type: 'pk10',
    name: 'PK10',
    items: [
      {id: 39, mid: '105', name: '幸运飞艇', checked: false},
      {id: 13, mid: '18', name: '北京PK10', checked: false},
      {id: 170, mid: '109', name: '幸运赛车', checked: false},
      {id: 151, mid: '74', name: '腾讯赛车', checked: false},
      {id: 162, mid: '123', name: '阿里云赛车', checked: false}
    ]
  },
  {
    type: 'k3',
    name: '快三',
    items: [
      {id: 23, mid: '82', name: '安徽快三', checked: false},
      {id: 24, mid: '83', name: '江苏快三', checked: false},
      {id: 25, mid: '84', name: '吉林快三', checked: false},
      {id: 26, mid: '85', name: '北京快三', checked: false},
      {id: 169, mid: '19', name: '幸福快三', checked: false},
      {id: 160, mid: '121', name: '福建快三', checked: false}
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

export function getGameTypeByGameId(id: number): string {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].items.length; j++) {
      if (id === games[i].items[j].id) {
        return games[i].type;
      }
    }
  }
  return '';
}

export function getGamesByType(type: string): Game[] {
  let gameCategory = games.find((gameCategory: GameCategory) => gameCategory.type === type);
  return (gameCategory && gameCategory.items) || [];
}

export function getAllGames() {
  let allGames: Game[] = [];
  games.forEach((gameCategory: GameCategory) => {
    allGames = allGames.concat(gameCategory.items);
  });
  return allGames;
}

export function getAllGameIds(): number[] {
  return getAllGames().map((game: Game) => game.id) || [];
}

export default games;
