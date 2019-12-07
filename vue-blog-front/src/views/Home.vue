<template>
  <div class="home">
    <div v-for="(item, index) in getItems" :key="index">
      {{item.title}}
    </div>
    <button @click="onClick">추가하기</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { NAMESPACE } from '@/store/modules/post';
import * as postGetters from '@/store/modules/post/getters';
import * as postActions from '@/store/modules/post/actions';

const postListHelper = createNamespacedHelpers(NAMESPACE);

export default {
  name: 'home',
  computed: {
    ...postListHelper.mapGetters({
      getItems: postGetters.DONE_ITEMS,
      allItems: postGetters.ALL_ITEMS,
    }),
  },
  methods: {
    ...postListHelper.mapActions([postActions.SET_NEW_ITEM_ASYNC]),
    onClick() {
      this[postActions.SET_NEW_ITEM_ASYNC]({
        item: {
          title: '추가 하는 포스트',
          content: '포스트 내용입니다.',
          isDone: true,
          time: Date.now(),
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
  .home {
    border: 1px;
  }
</style>
