export default (request) => ({
  getExampleAuthor() {
    return request({
      url: '/api/v1/example/author',
    })
  },

  // TODO: 根据实际业务接口调整
  isAuth() {
    return request({
      url: '/api/v1/isAuth',
    })
  },
})
