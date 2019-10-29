import { observable, action } from "mobx";
import APIs from '../http/APIs';
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

  @action
  updateBalance() {
    APIs.getUserBalance().then((data: any) => {
      if (data.success === 1) {
        this.balance = data.availableBalance;
        this.freeAvaiable = data.freeAvaiable;
        this.rewardPoint = data.rewardPoint;
        this.specialBalance = data.specialBalance;
      }
    });
  }
  
}

export default new User();
