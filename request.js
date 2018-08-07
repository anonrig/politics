const urlpattern = require('url-pattern')
const querystring = require('querystring')


class Request {
  constructor(payload) {
    this.headers = payload.headers
    this.statusCode = payload.statusCode
    this.statusMessage = payload.statusMessage
    this.url = payload.url.split('?')[0]
    this.query = this.setQueryString(payload.url)
    this.method = payload.method
    this.params = {}
  }

  getHeaders() {
    return this.headers
  }

  getPath() {
    return this.url
  }

  getMethod() {
    return this.method
  }

  getQueryString() {
    return this.query
  }

  setParams(params) {
    this.params = params
  }

  setQueryString(url) {
    const query = url.split('?')[1]
    return query ? querystring.parse(query) : {}
  }
}


module.exports = Request