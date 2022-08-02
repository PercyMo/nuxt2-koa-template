const { loggerError } = require('../common/logger')

const response = () => {
  return async function (ctx, next) {
    const { request, response } = ctx
    try {
      await next()
    } catch (err) {
      if (err.status) {
        ctx.res.fail({ code: err.status, message: err.message })
        loggerError.error(
          { type: 'ResponseError' },
          JSON.stringify(
            Object.assign(
              { message: err.message },
              {
                status: response.status,
                url: request.url,
                header: request.header,
                method: request.method,
                reqBody: request.body,
              }
            )
          )
        )
      } else {
        ctx.app.emit('error', err, ctx)
      }
    }
  }
}

module.exports = response
