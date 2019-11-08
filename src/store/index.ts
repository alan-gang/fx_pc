import { spy } from "mobx";   
import common from './common';
import user from './user';
import game from './game';

spy((event) => {
  if (event.type === 'action') {
    // console.log(`${event.name} with args: ${event.arguments}`);
  }
});

let store = {
  user,
  common,
  game
}

export default store;
