const ExampleService = require('../service/example')

module.exports = {
  /**
   * 获取作者数据
   * @api {get} /api/v1/example/author
   */
  async author(ctx) {
    // await ctx.validator({
    //   udid: { type: 'string', required: true },
    //   pageSize: {
    //     type: 'string',
    //     required: true,
    //     validator: (rule, value) => Number(value) > 0,
    //     message: 'limit 需传入正整数',
    //   },
    //   order: { type: 'enum', enum: ['rankIndex', 'createdAt'] },
    // })

    const author = await ExampleService.author()
    ctx.returnBody({
      author,
    })
  },

  /**
   * 添加学生
   * @api {post} /api/v1/example/student
   * @param {String} name - 学生姓名
   * @param {String} gender - 性别
   * @param {Number} class_id - 班级id
   * @param {String} cid - 身份证
   */
  async createStudent(ctx) {
    await ctx.validator({
      name: { type: 'string', required: true },
      gender: { type: 'string', required: true },
      class_id: { type: 'number', required: true },
      cid: { type: 'string', required: true },
    })

    const result = await ExampleService.createStudent(ctx.request.body)
    ctx.returnBody({
      data: result,
    })
  },

  /**
   * 更新学生信息
   * @api {put} /api/v1/example/student/:id
   * @param {Number} id - 学生id
   * @param {String} name - 学生姓名
   * @param {String} gender - 性别
   * @param {Number} class_id - 班级id
   * @param {String} cid - 身份证
   */
  async updateStudent(ctx) {
    await ctx.validator({
      id: {
        type: 'string',
        required: true,
        validator: (rule, value) => Number(value) > 0,
        message: 'limit 需传入正整数',
      },
      name: { type: 'string', required: true },
      gender: { type: 'string', required: true },
      class_id: { type: 'number', required: true },
      cid: { type: 'string', required: true },
    })

    const result = await ExampleService.updateStudent(
      ctx.params.id,
      ctx.request.body
    )
    ctx.returnBody({
      data: result,
    })
  },

  /**
   * 获取学生信息
   * @api {get} /api/v1/example/student/:id
   * @param {Number} id - 学生id
   */
  async getStudent(ctx) {
    await ctx.validator({
      id: {
        type: 'string',
        required: true,
        validator: (rule, value) => Number(value) > 0,
        message: 'limit 需传入正整数',
      },
    })

    const result = await ExampleService.getStudent(ctx.params.id)
    ctx.returnBody({
      data: result,
    })
  },

  /**
   * 删除学生信息
   * @api {delete} /api/v1/example/student/:id
   * @param {Number} id - 学生id
   */
  async delStudent(ctx) {
    await ctx.validator({
      id: {
        type: 'string',
        required: true,
        validator: (rule, value) => Number(value) > 0,
        message: 'limit 需传入正整数',
      },
    })

    const result = await ExampleService.delStudent(ctx.params.id)
    ctx.returnBody({
      data: result,
    })
  },
}
