export default {
  /**
   * 设置登录验证信息
   * @param {object} ctx 服务端传入context 客户端传入this
   * @param {object} res 登录验证信息
   */
  setAuthInfo(ctx, res) {
    let $cookies, $store
    if (process.client) {
      $cookies = ctx.$cookies
      $store = ctx.$store
    }
    if (process.server) {
      $cookies = ctx.app.$cookies
      $store = ctx.store
    }
    if ($cookies && $store) {
      const expires = new Date(Date.now() + 8.64e7 * 365 * 10)
      // 设置 cookie
      $cookies.set('userId', res.userId, { expires })
      $cookies.set('userInfo', res.user, { expires })
      $cookies.set('token', res.token, { expires })
      // 设置 vuex
      $store.commit('auth/SET_USERID', res.userId)
      $store.commit('auth/SET_USERINFO', res.user)
      $store.commit('auth/SET_TOKEN', res.token)
    }
  },

  /**
   * 移除登录验证信息
   * @param {object} ctx 服务端传入context 客户端传入this
   */
  removeAuthInfo(ctx) {
    let $cookies, $store
    if (process.client) {
      $cookies = ctx.$cookies
      $store = ctx.store
    }
    if (process.server) {
      $cookies = ctx.app.$cookies
      $store = ctx.store
    }
    if ($cookies && $store) {
      $cookies.remove('userId')
      $cookies.remove('userInfo')
      $cookies.remove('token')
      $store.commit('auth/SET_USERID', '')
      $store.commit('auth/SET_USERINFO', null)
      $store.commit('auth/SET_TOKEN', '')
    }
  },
}
