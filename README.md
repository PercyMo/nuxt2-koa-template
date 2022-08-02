# nuxt2-koa-template

## 技术栈
* [Nuxt.js 2.x](https://nuxtjs.org/)
* [koa2](https://koa.bootcss.com/)
* [ant-design-vue](https://antdv.com/components/overview)

## 目录结构
```
.
├── app                                 # 服务端目录
│   ├── common
│   │   ├── db.js                       # 数据库方法，如 redis、sql
│   │   ├── logger.js                   # 日志方法
│   │   └── utils.js                    # 通用工具函数
│   ├── controller                      # 控制器：解析用户的输入，处理后返回相应的结果，不要承担过重的业务逻辑
│   ├── extend                          # 框架扩展
│   ├── index.js                        # 服务启动入口
│   ├── libraries                       # 常量存储，如缓存 key 值
│   ├── middlewares                     # 中间件
│   ├── request                         # 中间层 HTTP 请求
│   ├── routers                         # 用于配置 URL 路由规则
│   ├── schedule                        # 定时任务
│   ├── model                           # 数据模型层
│   └── service                         # 数据服务层：用于编写复杂业务数据处理逻辑
├── client                              # 客户端目录
│   ├── api
│   ├── assets
│   ├── components
│   │   ├── antComponentInstall.js
│   │   ├── base                        # 基础功能组件
│   │   ├── common                      # 通用业务组件
│   │   ├── layouts                     # 布局组件
│   │   └── pages                       # 页面业务组件
│   ├── layouts
│   ├── middleware
│   ├── mixins
│   ├── pages
│   ├── plugins
│   ├── static
│   ├── store
│   └── utils
├── config                              # 分环境配置项
├── test                                # jest 单元测试目录
├── commitlint.config.js
├── jest.config.js
├── nuxt.config.js
├── package.json
├── stylelint.config.js
└── README.md
```

## 开始

```bash
# 安装依赖
$ yarn install

# 启动本地开发 默认 localhost:3000
$ yarn dev

# 生产环境构建和启动服务
$ yarn build
$ yarn start
```
