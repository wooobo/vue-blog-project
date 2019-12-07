import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export const NAMESPACE = 'post';

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
