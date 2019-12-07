import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      {
        title: '제목 1',
        content: '내용 1',
        isActive: false,
      },
      {
        title: '제목 2',
        content: '내용 2',
        isActive: true,
      },
    ],
  },
  mutations: {
    MutationAddItem(state, payload) {
      state.items.push(payload);
    },
  },
  actions: {
    ActionAddItem({ commit }, payload) {
      commit('MutationAddItem', payload);
    },
  },
  getters: {
    ActiveItems: state => state.items.filter(item => item.isActive),
  },
  modules: {
  },
});
