const development = require('./config.development')
const production = require('./config.production')
const preprod = require('./config.preprod')

module.exports = {
  development,
  preprod,
  production,
}[process.env.NODE_ENV || 'development']
