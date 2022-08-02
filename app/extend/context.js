const { default: Schema } = require('async-validator')
const CreateError = require('http-errors')
const { logger } = require('../common/logger')

const context = async (ctx, next) => {
  /**
   * 统一错误数据返回格式
   */
  ctx.res.fail = ({ code, data, message }) => {
    ctx.body = {
      code,
      data,
      message,
    }
  }

  /**
   * 统一成功数据返回格式
   */
  ctx.returnBody = (data = {}, message = 'success', code = 0) => {
    if (!ctx.utils.isObject(data)) {
      throw new TypeError(
        'For specification purposes,data must be wrapped as an object.'
      )
    }
    const { request, response } = ctx
    ctx.body = {
      code,
      data,
      message: message || 'success',
    }
    logger.trace(
      JSON.stringify({
        status: response.status,
        url: request.url,
        header: request.header,
        method: request.method,
        reqBody: request.body,
      })
    )
  }

  /**
   * 路由参数验证
   * @param {Object} descriptor - 用于数据校验的 Schema 对象
   */
  ctx.validator = async (descriptor) => {
    const validator = new Schema(descriptor)
    const params = {}
    // 获取参数
    Object.keys(descriptor).forEach((key) => {
      if (ctx.method === 'GET') {
        params[key] = ctx.query[key]
      } else if (
        ctx.method === 'POST' ||
        ctx.method === 'PUT' ||
        ctx.method === 'DELETE'
      ) {
        params[key] = ctx.request.body[key]
      }
    })

    // 验证参数
    const errors = await validator
      .validate(Object.assign({}, params, ctx.params))
      .then(() => null)
      .catch((err) => err.errors)
    if (errors) {
      // 验证不通过
      throw new CreateError.BadRequest(JSON.stringify(errors))
    }
  }

  await next()
}

module.exports = context
