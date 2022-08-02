const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const helmet = require('koa-helmet')
const response = require('./response')

/**
 * 参数解析
 */
const mdBodyParser = bodyParser({
  enableTypes: ['json', 'form', 'text', 'xml'],
})

/**
 * 跨域处理
 */
const mdCors = cors({
  origin(ctx) {
    return ctx.request.header.origin
  },
  credentials: true,
  allowMethods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'X-Requested-With', 'token'],
  maxAge: 86400,
})

/**
 * 请求安全性
 */
const mdHelmet = helmet({
  // TODO: nuxt 提供的 js 文件 MIME type ('application/json')，会引起报错，线上也众多错误，暂时关闭内容安全策略
  contentSecurityPolicy: false,
})

/**
 * 响应数据格式处理
 */
const mdResponseHandler = response()

module.exports = [mdCors, mdHelmet, mdResponseHandler, mdBodyParser]
