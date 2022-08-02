const Redis = require('ioredis')
const { Sequelize } = require('sequelize')
const config = require('../../config')
const { loggerSystem } = require('./logger')

class RedisClient {
  constructor() {
    this.isReady = false
    this.client = new Redis(config.redis)
    loggerSystem.trace('redis init')
    this.client.on('connect', () => {
      this.isReady = true
      loggerSystem.trace('redis connect success')
    })
    this.client.on('error', (err) => {
      this.isReady = false
      loggerSystem.error('redis fail', err)
    })
  }

  async get(key) {
    try {
      if (this.isReady) {
        const result = await this.client.get(key)
        if (!result) return
        return JSON.parse(result)
      }
    } catch (error) {
      loggerSystem.error('redis get fail', error)
    }
  }

  async del(key) {
    try {
      if (this.isReady) {
        await this.client.del(key)
      }
    } catch (error) {
      loggerSystem.error('redis del fail', error)
    }
  }

  /**
   * set
   * @param {String} key - 键
   * @param {any} value - 值
   * @param {Number} expires - 过期时间 / s
   */
  async set(key, value, expires) {
    try {
      if (this.isReady) {
        if (expires) {
          await this.client.set(key, JSON.stringify(value), 'EX', expires)
        } else {
          await this.client.set(key, JSON.stringify(value))
        }
      }
    } catch (error) {
      loggerSystem.error('redis set fail', error)
    }
  }
}

class MySql {
  constructor(opts) {
    this.config = opts
    this.options = Object.assign(
      {
        dialect: 'mysql',
        timezone: '+08:00',
        dialectOptions: {
          // 时间格式化，返回字符串
          dateStrings: true,
          typeCast(field, next) {
            if (field.type === 'DATETIME') {
              return field.string()
            }
            return next()
          },
        },
        define: {
          timestamps: true,
          freezeTableName: true,
          createdAt: 'create_time',
          updatedAt: 'update_time',
        },
      },
      opts
    )
  }

  init() {
    const sequelize = new Sequelize(this.options)
    sequelize
      .authenticate()
      .then(() => {
        loggerSystem.trace('mysql connect success', this.config)
      })
      .catch((error) => {
        loggerSystem.error('mysql connect fail', error, this.config)
      })
    return sequelize
  }
}

module.exports = {
  Redis: new RedisClient(),
  // 看实际需求，必要的话可以读写分离
  MySql: new MySql(config.mysql).init(),
}
