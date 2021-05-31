import Vue from 'vue'
import Vuex from 'vuex'
import hits from './hits'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpenModal: false,
    instantSearchInstance: null,
  },
  mutations: {
    setInstantSearchInstance(state, payload) {
      state.instantSearchInstance = payload
    },
    setIsOpenModal(state, payload) {
      state.isOpenModal = payload
    }
  },
  getters: {
    instantSearchInstance({ instantSearchInstance }) {
      return instantSearchInstance
    },
    isOpenModal({ isOpenModal }) {
      return isOpenModal
    }
  },
  modules: {
    hits
  }
})
