const log4js = require('log4js')

const DAYS_TO_KEEP = 7 // 日志保留时间/天

// 仅在生产环境开启日志采集
if (process.env.NODE_ENV !== 'production') {
  log4js.levels = 'OFF'
}

log4js.configure({
  appenders: {
    // 错误日志
    error: {
      type: 'file',
      filename: 'logs/error.log',
      maxLogSize: 1024 * 1024 * 10, // 10M
      backups: 5,
    },
    // 统计日志
    stats: {
      type: 'dateFile',
      filename: 'logs/stats.log',
      compress: true,
      alwaysIncludePattern: true,
      keepFileExt: true,
      numBackups: DAYS_TO_KEEP,
    },
    // 系统日志
    system: {
      type: 'dateFile',
      filename: 'logs/system.log',
      compress: true,
      alwaysIncludePattern: true,
      keepFileExt: true,
      numBackups: DAYS_TO_KEEP,
    },
    // 页面渲染日志
    page: {
      type: 'dateFile',
      filename: 'logs/page.log',
      compress: true,
      alwaysIncludePattern: true,
      keepFileExt: true,
      numBackups: DAYS_TO_KEEP,
    },
  },
  categories: {
    default: { appenders: ['stats'], level: 'trace' },
    error: { appenders: ['error'], level: 'error' },
    system: { appenders: ['system'], level: 'trace' },
    page: { appenders: ['page'], level: 'trace' },
  },
})

const logger = log4js.getLogger()
const loggerError = log4js.getLogger('error')
const loggerSystem = log4js.getLogger('system')
const loggerPage = log4js.getLogger('page')

module.exports = {
  logger,
  loggerError,
  loggerSystem,
  loggerPage,
}
