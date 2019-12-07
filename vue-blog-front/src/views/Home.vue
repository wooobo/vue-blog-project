<template>
  <div class="home">
    <div>
      <p>state로 가져온 값</p>
      {{items}}
    </div>
    <br />
    <div>
      <p>mapGetters로 가져온 값</p>
      <div>
        {{ActiveItems}}
      </div>
    </div>
    <div>
      <button @click="onMutation">mutation 버튼</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'; // vuex에서 "mapState"를 가져옵니다.

export default {
  name: 'home',
  computed: {
    ...mapState(['items']), // mapState에 items를 등록합니다. 여기서 items는 ./src/store/index.js에서 state에 등록한 object 입니다.
    ...mapGetters(['ActiveItems']),
  },
  methods: {
    ...mapMutations(['MutationAddItem']),
    ...mapActions(['ActionAddItem']),
    onMutation() {
      this.MutationAddItem({
        title: '제목 추가',
        content: '내용 추가',
        isActive: true,
      });
    },
    onAction() {
      this.ActionAddItem({
        title: '액션 추가',
        content: '액션 내용 추가',
        isActive: true,
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
