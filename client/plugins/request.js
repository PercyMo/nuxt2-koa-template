import Request from '@/utils/request.js'
import apiFactory from '@/api'

export default ({ app: { $axios, $cookies } }, inject) => {
  const Example = new Request($axios, $cookies, {
    baseURL: process.env.baseURL,
    responseInterceptor: (res) => {
      if (res.code === 0) {
        return res
      } else {
        return Promise.reject(new Error(res.message || 'Error'))
      }
    },
  })

  inject(
    'api',
    apiFactory({
      Example,
    })
  )
}
