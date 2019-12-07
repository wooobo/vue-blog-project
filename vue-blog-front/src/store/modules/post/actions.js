import * as mutations from './mutations';

export const SET_NEW_ITEM_ASYNC = 'SET_NEW_ITEM_ASYNC';

export default {
  async [SET_NEW_ITEM_ASYNC]({ commit }, payload) {
    const newItem = await new Promise((resolve) => {
      setTimeout(() => {
        const { item: lazyItem } = payload;
        resolve(lazyItem);
      }, 1000);
    });
    commit(mutations.SET_NEW_ITEM, newItem);
  },
};
