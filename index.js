const Request = require('./request')
const Response = require('./response')
const Router = require('./router')

const http = require('http')


class Server {
  constructor({port} = {}) {
    this.port = port
    this.router = null
    this.server = null
  }

  setRouter(router) {
    this.router = router
  }

  listen() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        return reject(new Error(`Server is already initialized`))
      }

      this.server = http.createServer((req, res) => {
        const request = new Request(req)
        const response = new Response(res)

        this.router.matchAll(request, response)
      })

      this.server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
      })

      this.server.listen({port: this.port}, resolve)
    })
  }
}


Server.Router = require('./router')
Server.Request = require('./request')
Server.Response = require('./response')


module.exports = Server