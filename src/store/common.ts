
import { observable, action } from "mobx";

class Common {
  @observable login?: boolean;

  @action
  setLogin(login: boolean) {
    this.login = login;
  }
}

export default new Common();
