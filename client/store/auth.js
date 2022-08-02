export const state = () => ({
  userId: '',
  userInfo: null,
  token: '',
})

export const mutations = {
  SET_USERID(state, userId) {
    state.userId = userId
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_TOKEN(state, token) {
    state.userInfo = token
  },
}
