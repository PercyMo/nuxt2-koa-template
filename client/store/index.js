export const state = () => ({
  list: [],
  exampleAuthor: [],
})

export const mutations = {
  UPDATE_LIST(state, paylaod) {
    this.$myInjectedFunction('vuex')
    state.list = paylaod
  },
  SET_EXAMPLE_AUTHOR(state, list) {
    state.exampleAuthor = list
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const res = await this.$api.example.getExampleAuthor()
    commit('SET_EXAMPLE_AUTHOR', res.data.author)
  },
}
