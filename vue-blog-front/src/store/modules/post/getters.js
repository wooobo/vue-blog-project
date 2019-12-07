export const DONE_ITEMS = 'DONE_ITEMS';
export const ALL_ITEMS = 'ALL_ITEMS';

export default {
  [DONE_ITEMS]: state => state.items.filter(post => post.isDone),
  [ALL_ITEMS]: state => state.items,
};
