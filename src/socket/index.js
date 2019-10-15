let Socket = {
  url: '',
  data: {},
  notify: {
    messages: []
  },
  time: 3000,
  sockets: {},
  closeType: {},
  get (msg) {
    return this.socket.send(JSON.stringify(msg))
  },
  close (name) {
    Object.entries(this.sockets).forEach(([k, v]) => {
      if (name === 'all' || name === k) v && v.close && (this.closeType[k] = true) && v.close(1000, 'close<-' + k)
    })
  },
  connect (args, name, cb) {
    let socket = new WebSocket(this.url + args)
    if (socket) {
      this.closeType[name] = false
      socket.binaryType = 'arraybuffer'
      socket.onopen = (evt) => {
        cb && cb()
      }
      socket.onmessage = (evt) => {
        this.notify.messages.forEach(fn => fn(JSON.parse(evt.data)))
      }
      socket.onerror = (evt) => {
      }
      socket.onclose = (evt) => {
        this.sockets[name] = null
        if (!this.closeType[name]) {
          setTimeout(() => {
            this.connect(args, name)
          }, this.time)
        }
      }
      this.sockets[name] = socket
    } else {
      setTimeout(() => {
        this.connect(args, name)
      }, this.time)
    }
    return socket
  }
}
export default Socket
