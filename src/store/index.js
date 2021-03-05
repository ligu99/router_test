import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuData: []
  },
  mutations: {
    setMenuData(state, data) {
      state.menuData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
