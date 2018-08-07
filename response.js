class Response {
  constructor(payload) {
    this.instance = payload
    this.headers = payload.headers
    this.statusCode = payload.statusCode || 200
  }

  setStatus(status) {
    this.statusCode = status
    this.instance.statusCode = status
    return this
  }

  json(payload) {
    this.instance.setHeader('Content-Type', 'application/json')
    this.instance.write(JSON.stringify(payload))
    this.instance.end()
  }
}


module.exports = Response