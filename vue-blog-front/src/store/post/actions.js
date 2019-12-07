import * as mutations from './mutations';

export const ADD_POST = 'ADD_POST';

export default {
  [ADD_POST]({ commit }, payload) {
    commit(mutations.SET_NEW_ITEM, payload);
  },
};
