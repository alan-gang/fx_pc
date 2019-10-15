import { observable, action } from "mobx";

class User {
  @observable name?: string = '';
  @observable nickName?: string;
  @observable balance?: string;
  @observable specialBalance?: string;
  @observable freeAvaiable?: string;
  @observable rewardPoint?: string;
  @observable userId?: number;
  @observable userLevel?: number;

  @action
  setName(name: string) {
    this.name = name;
  }

  @action
  setBalance(balance: string) {
    this.balance = balance;
  }
  
}

export default new User();
