const schedule = require('node-schedule')
const ExampleTask = require('./tasks/example')

module.exports = () => {
  /**
   * 每天凌晨 0:20 点执行
   */
  schedule.scheduleJob('0 20 0 * * *', async () => {
    await ExampleTask.clearCache()
  })
}
