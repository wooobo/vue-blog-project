export const SET_NEW_ITEM = 'SET_NEW_ITEM';

export default {
  [SET_NEW_ITEM](state, payload) {
    const newItem = payload;
    state.items.push(newItem);
  },
};
