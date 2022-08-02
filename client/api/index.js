import exampleApi from './example'

const apiFactory = (request) => ({
  example: exampleApi(request.Example),
})

export default apiFactory
