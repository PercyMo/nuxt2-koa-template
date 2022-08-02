class Request {
  constructor($axios, $cookies, options) {
    const {
      baseURL,
      timeout = 5000,
      headers = {},
      responseInterceptor,
    } = options
    const instance = $axios.create({
      baseURL,
      timeout,
      withCredentials: true, // 跨域携带cookie
    })

    instance.interceptors.request.use(
      (config) => {
        config.headers.token = $cookies.get('token') || ''
        for (const key in headers) {
          config.headers[key] = headers[key]
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (response) => {
        if (/^[4|5]/.test(response.status)) {
          return Promise.reject(response.statusText)
        }
        // 实例自定义响应拦截函数
        if (typeof responseInterceptor === 'function') {
          return responseInterceptor(response.data)
        }
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    return instance
  }
}

export default Request
