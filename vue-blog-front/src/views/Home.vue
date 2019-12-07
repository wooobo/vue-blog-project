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
import * as postGetters from '@/store/post/getters';
import * as postActions from '@/store/post/actions';

const postListHelper = createNamespacedHelpers('post');

export default {
  name: 'home',
  computed: {
    ...postListHelper.mapGetters({
      getItems: postGetters.DONE_ITEMS,
      allItems: postGetters.ALL_ITEMS,
    }),
  },
  methods: {
    ...postListHelper.mapActions([postActions.ADD_POST]),
    onClick() {
      this[postActions.ADD_POST]({
        item: {
          title: '추가 하는 포스트',
          content: '포스트 내용입니다.',
          isDone: true,
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
