import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import  getters from './getters'
import mutations from './mutations'
import state from './state'


Vue.use(Vuex)//安装vuex

export default new Vuex.Store({
  state ,
  mutations,
  actions ,
  getters,
  modules: {
  }
})
