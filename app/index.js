const Koa = require('koa')
const consola = require('consola')
const compose = require('koa-compose')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const MD = require('./middlewares/')
const Extends = require('./extend')
const utils = require('./common/utils')
const useRouter = require('./routers/router')
const schedule = require('./schedule')
const { loggerError } = require('./common/logger')
const app = new Koa()

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PART || 3000,
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.context.utils = utils

  // 加载扩展
  app.use(compose(Extends))
  // 加载中间件
  app.use(compose(MD))
  // 使用路由
  useRouter(app)

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)

  // 启动定时任务
  schedule()

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })

  app.on('error', (err, ctx) => {
    const { request, response } = ctx
    const fields = {
      status: response.status,
      url: request.url,
      header: request.header,
      method: request.method,
      reqBody: request.body,
    }
    loggerError.error({ type: 'AppOnError', err }, JSON.stringify(fields))
    if (ctx) {
      ctx.body = {
        code: err.status || 9999,
        message: `程序运行时报错：${err.message}`,
      }
    }
  })
}

start()
