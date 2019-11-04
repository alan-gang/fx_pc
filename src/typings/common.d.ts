
interface LimitLevelItem {
  level: number;
  minAmt: number;
  maxAmt: number;
}

interface LimitListItem {
  id: number;
  bestLudan: any;
  dtMaxPrize: string;
  dzMaxPrize: string;
  kqPrizeLimit: LimitLevelItem[];
  [prop: string]: any;
}