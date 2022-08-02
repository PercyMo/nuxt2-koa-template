const CreateError = require('http-errors')
const config = require('../../config')
const Request = require('./base')

const Example = new Request({
  baseURL: config.baseURL.example,
  timeout: 1000 * 5,
  responseInterceptor: (response) => {
    if (response.code === 0) {
      return Promise.resolve(response.response)
    } else {
      return Promise.reject(
        new CreateError.InternalServerError('上游接口数据错误！')
      )
    }
  },
})

module.exports = {
  Example,
}
