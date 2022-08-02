const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const config = require('../../config')

function useRouter(realPath = __dirname) {
  const urls = fs.readdirSync(realPath)
  urls.forEach((element) => {
    const elementPath = path.join(realPath, element)
    const stat = fs.lstatSync(elementPath)
    const isDir = stat.isDirectory()
    if (isDir) {
      useRouter(elementPath)
    } else {
      const module = require(elementPath)
      // 正确的路由文件应该返回 koa-router 实例
      if (module.routes) {
        const routerPrefix = realPath.split('/routers')[1] || ''
        // routers 里的文件路径作为 路由名
        router.use(
          path.join(
            config.apiPathPrefix,
            routerPrefix,
            element.replace('.js', '')
          ),
          module.routes()
        )
      }
    }
  })
}

module.exports = (app) => {
  useRouter()
  app.use(router.routes()).use(router.allowedMethods())
}
