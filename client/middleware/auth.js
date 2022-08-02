export default function (context) {
  const { app, store } = context
  const cookiesToken = app.$cookies.get('token')
  if (cookiesToken) {
    // 每次路由跳转，验证登录是否过期
    return app.$api.example.isAuth().then((res) => {
      if (res.code === 0) {
        if (res.data.isExpired) {
          app.$auth.removeAuthInfo(context)
        } else {
          const stateToken = store.state.suth.token
          if (cookiesToken && !stateToken) {
            // 一些操作可能会新开标签页导致 vuex 状态丢失，这里重新同步下 vuex 中的登录状态
            store.commit('auth/SET_USERID', app.$cookies.get('userId'))
            store.commit('auth/SET_USERINFO', app.$cookies.get('userInfo'))
            store.commit('auth/SET_TOKEN', app.$cookies.get('token'))
          }
        }
      }
    })
  }
}
