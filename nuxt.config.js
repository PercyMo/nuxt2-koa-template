const { loggerPage } = require('./app/common/logger')
const config = require('./config')

module.exports = {
  rootDir: 'client',
  // 服务启动前跳过数据收集询问
  telemetry: false,
  env: config.clientEnv,
  router: {
    middleware: ['auth'],
  },
  head: {
    title: 'nuxt2-koa-template',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['normalize.css', '~/assets/css/main.scss'],
  plugins: [
    {
      src: '~/plugins/vconsole',
      ssr: false,
    },
    '~/plugins/request.js',
    '~/plugins/combined-inject.js',
    '~/plugins/ctx-inject.js',
    '~/plugins/vue-main.js',
  ],
  // 基础UI组件全局注册
  components: [{ path: '~/components/base', prefix: 'd' }],
  /**
   * Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/style-resources'],
  /**
   * Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],
  styleResources: {
    scss: ['./assets/css/variables.scss'],
  },
  build: {
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: 'css',
          },
        ],
      ],
    },
    transpile: [/ant-design-vue/],
  },
  hooks: {
    // 在nuxt初始化时插入一个中间件，每次请求都生成一个logParams对象
    'render:setupMiddleware': (app) => {
      app.use((req, res, next) => {
        // TODO: 渲染前生成唯一 RequestId，用于串联页面渲染时刻 api 请求日志，更方便排查页面渲染异常时的问题
        // 但 log4js 在 nuxt 插件中使用报错，尚未解决
        req.logParams = {
          // requestId: generateRandomString(), // 生成requestId随机串
          pageUrl: req.url,
        }
        next()
      })
    },
    // 渲染完毕
    'render:routeDone': (url, result, { req }) => {
      const { method, headers } = req
      loggerPage.info(
        { type: 'render', ...req.logParams },
        { url, method, headers }
      )
    },
    // 渲染错误
    'render:errorMiddleware': (app) => {
      app.use((error, req, res, next) => {
        const { url, method, headers } = req
        loggerPage.error(
          { type: 'render', error, ...req.logParams },
          { url, method, headers }
        )
        next(error)
      })
    },
  },
}
