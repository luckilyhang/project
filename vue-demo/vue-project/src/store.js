import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    number: 0,
    me: 0,
    detail:[]
  },
  mutations: {
    add(state) {
      state.number++;
    },
    educe(state) {
      state.me--;
    },
    newDE(state){
      state.detail=1;
    }
  },
  actions: {
    increment({commit}){
        commit('add');
    },
    apart({commit}){
        commit('educe');
    }
}
})
export default store
