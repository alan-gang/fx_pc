import { any } from "prop-types";


// interface Messages {
//   [prop: string]: any;
// }

// interface Notify {
//   messages: Messages[];
// }

// interface MySocket {
//   url: string;
//   data: any;
//   notify: Notify;
//   time: number;
//   socket: any;
//   sockets: any;
//   closeType: any;
//   get(msg: string): void;
//   close(name: string): void;
//   connect (args: any, name: string, cb?: any): ()=>WebSocket;
// }

// let Socket: MySocket = {
//   url: '',
//   data: {},
//   notify: {
//     messages: []
//   },
//   time: 3000,
//   sockets: {},
//   closeType: {},
//   socket: any,
//   get(msg: string) {
//     return this.socket.send(JSON.stringify(msg));
//   },
//   close (name: string) {
//     Object.entries(this.sockets).forEach(([k, v]) => {
//       if (name === 'all' || name === k) v && v.close && (this.closeType[k] = true) && v.close(1000, 'close<-' + k);
//     })
//   },
//   connect(args: any, name: string, cb?: any): WebSocket {
//     let socket = new WebSocket(this.url + args);
//     if (socket) {
//       this.closeType[name] = false;
//       socket.binaryType = 'arraybuffer';
//       socket.onopen = (evt) => {
//         cb && cb();
//       }
//       socket.onmessage = (evt) => {
//         this.notify.messages.forEach((fn) => fn(JSON.parse(evt.data)));
//       }
//       socket.onerror = (evt) => {
//       }
//       socket.onclose = (evt) => {
//         this.sockets[name] = null;
//         if (!this.closeType[name]) {
//           setTimeout(() => {
//             this.connect(args, name);
//           }, this.time);
//         }
//       }
//       this.sockets[name] = socket;
//     } else {
//       setTimeout(() => {
//         this.connect(args, name);
//       }, this.time);
//     }
//     return socket;
//   }
// }

interface SocketParams {
  url?: string;
  name?: string;
  binaryType?: string;
  open?: () => void;
  message(data: any): void;
  close?: () => void;
  error?: () => void;
}

interface ISubscribeMessage {
  name: string;
  cb: Function;
}

interface ISubscribe {
  messsages: ISubscribeMessage[];
  has(name: string): boolean;
  add(name: string, cb: Function): void;
  remove(name: string): void;
}

let globalSocket: WebSocket | undefined;

let Subscriber: ISubscribe = {
  messsages: [],
  has(name: string): boolean {
    return !!this.messsages.find((message: any) => message.name === name);
  },
  add(name: string = '', cb: Function) {
    if (this.has(name)) {
      console.log(`${name} has already exist.`);
      return;
    }
    this.messsages.push({name, cb});
  },
  remove(name: string) {
    this.messsages.forEach((m: ISubscribeMessage, i: number) => {
      if (name === m.name) {
        this.messsages.splice(i, 1);
      }
    });
  }
}

let Notifier = {
  notify(msg: any) {
    Subscriber.messsages.forEach((message: ISubscribeMessage) => {
      message.cb && message.cb(msg);
    });
  }
}

class Socket {
  global: boolean;
  url: string;
  socket?: WebSocket;
  open: Function;
  message: Function;
  close: Function;
  error: Function;
  options: SocketParams;
  constructor (options: SocketParams, global: boolean = false) {
    this.global = global;
    this.url = options.url || '';
    this.options = options;
    this.open = options.open || this.noop;
    this.message = options.message || this.noop;
    this.close = options.close || this.noop;
    this.error = options.error || this.noop;
    this.create();
  }
  noop () {}
  create () {
    if (!this.global && !this.url) {
      console.log('error: the websocket url is null');
      return;
    }
    if (!this.socket && !globalSocket) {
      this.socket = new WebSocket(this.url);
      this.socket.binaryType = (this.options.binaryType || 'arraybuffer') as BinaryType;
    }
    if (this.global) {
      if (!globalSocket) {
        globalSocket = this.socket;
      } else {
        this.socket = globalSocket;
      }
      Subscriber.add(this.options.name || '', this.message);
    }
    if (this.socket) {
      this.socket.onopen = () => {
        this.open();
      }
      this.socket.onmessage = (msg) => {
        this.message(JSON.parse(msg.data));
        Notifier.notify(JSON.parse(msg.data));
      }
      this.socket.onclose = () => {
        this.close();
      }
      this.socket.onerror = () => {
        this.error();
      }
    }
  }
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this.socket && this.socket.send(data);
  }
  removeListen() {
    Subscriber.remove(this.options.name || '');
  }
}

export default Socket;
