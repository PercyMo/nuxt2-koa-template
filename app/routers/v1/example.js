const Router = require('koa-router')
const router = new Router()
const ExampleController = require('../../controller/example')

router.get('/author', ExampleController.author)
router.get('/student/:id', ExampleController.getStudent)
router.post('/student', ExampleController.createStudent)
router.put('/student/:id', ExampleController.updateStudent)
router.del('/student/:id', ExampleController.delStudent)

module.exports = router
