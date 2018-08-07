const UrlPattern = require('url-pattern')
const _ = require('lodash')


class Router {
  constructor() {
    this.urls = []
    this.notFound = async (req, res) => ({status: 404})
  }

  setUrl(url, cb, method) {
    this.urls.push({url: new UrlPattern(url), cb, method})
  }

  get(url, cb) {this.setUrl(url, cb, 'GET')}
  post(url, cb) {this.setUrl(url, cb, 'POST')}
  put(url, cb) {this.setUrl(url, cb, 'PUT')}
  delete(url, cb) {this.setUrl(url, cb, 'DELETE')}

  async matchAll(req, res) {
    const route = _.find(this.urls, ({url, method}) => !!url.match(req.getPath()) && method === req.getMethod())

    if (route) {
      const params = route.url.match(req.getPath())
      req.setParams(params)
      res.json(await route.cb(req, res))
    } else {
      res
        .setStatus(404)
        .json(await this.notFound(req, res))
    }
  }

  set404(callback) {
    this.notFound = callback
  }
}


module.exports = Router