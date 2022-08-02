const urllib = require('urllib')
const CreateError = require('http-errors')
const { loggerError } = require('../common/logger')

class Request {
  constructor(options) {
    this._options = options
  }

  request(options) {
    const { url, method = 'GET', data } = options
    const {
      baseURL,
      timeout = 5000,
      headers = {},
      responseInterceptor,
    } = this._options
    const requestOptions = {
      method: method.toUpperCase(),
      timeout,
      headers,
      contentType: 'json',
      dataType: 'json',
      data,
    }

    return urllib
      .request(baseURL + url, requestOptions)
      .then(async (result) => {
        if (!result.data) {
          loggerError.error(
            { type: 'MidResponseError', options: requestOptions },
            JSON.stringify(result)
          )
          throw new CreateError.ServiceUnavailable(
            `数据服务层请求返回异常！错误码：${result.status}`
          )
        }
        const responseData =
          typeof responseInterceptor === 'function'
            ? await responseInterceptor(result.data)
            : result.data

        return responseData
      })
      .catch((error) => {
        loggerError.error(
          { type: 'MidRequestError', options: requestOptions },
          JSON.stringify(error)
        )
        throw new CreateError.ServiceUnavailable('数据服务层服务异常！')
      })
  }
}

module.exports = Request
