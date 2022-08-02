const { Redis } = require('../../common/db')
const Constant = require('../../libraries/constant')

module.exports = {
  async clearCache() {
    const cacheKey = Constant.EXAMPLE_AUTHOR
    await Redis.del(cacheKey)
  },
}
