const example = require('../request/example')
const { Redis } = require('../common/db')
const Student = require('../model/example')
const Constant = require('../libraries/constant')

module.exports = {
  author: async () => {
    const cacheKey = Constant.EXAMPLE_AUTHOR
    let exampleAuthor = await Redis.get(cacheKey)
    if (exampleAuthor) {
      return exampleAuthor
    } else {
      exampleAuthor = await example.getExampleAuthor()
      await Redis.set(cacheKey, exampleAuthor, 3600 * 2)
      return exampleAuthor
    }
  },

  createStudent: async (data = {}) => {
    try {
      const info = {
        name: data.name,
        gender: data.gender,
        class_id: data.class_id,
        cid: data.cid,
      }
      return await Student.create(info)
    } catch (error) {
      return false
    }
  },

  updateStudent: async (id, data = {}) => {
    try {
      const result = await Student.update(
        {
          name: data.name,
          gender: data.gender,
          class_id: data.class_id,
          cid: data.cid,
        },
        { where: { id } }
      )
      return result[0]
    } catch (error) {
      return false
    }
  },

  getStudent: async (id) => {
    try {
      return await Student.findOne({
        where: { id },
      })
    } catch (error) {
      return {}
    }
  },

  delStudent: async (id) => {
    try {
      return await Student.destroy({
        where: { id },
      })
    } catch (error) {
      return false
    }
  },
}
