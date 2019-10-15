
export interface GameSubMethodMenu {
  s: boolean;
  name: string;
  v?: string;
  oddIndex: number;
  col?: number;
  class?: string;
  mid?: string;
  odd?: string;
  ids: string[];
}
export interface GameMethodMenu {
  name: string;
  ename: string;
  ids: string[];
  subMethods?: GameSubMethodMenu[];
}
export interface Game {
  id: number;
  name: string;
  checked?: boolean;
  mid?: string;
  hot?: boolean;
  new?: boolean;
  favourite?: boolean;
  methods?: GameMethodMenu[];
}

export interface GameCategory {
  name?: string;
  type: string;
  class?: string;
  checked?: boolean;
  items: Game[];
}

// export interface Games {
//   [prop: string]: GameCategory;
// }

