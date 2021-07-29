import Vue from 'vue'
import Vuex from 'vuex'
import gifs from './gifs'
import favorites from './favorites'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: (state) => state.error
  },
  modules: {
    gifs, favorites
  }
})
