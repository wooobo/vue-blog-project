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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'; // vuex에서 "mapState"를 가져옵니다.

export default {
  name: 'home',
  computed: {
    ...mapState(['items']), // mapState에 items를 등록합니다. 여기서 items는 ./src/store/index.js에서 state에 등록한 object 입니다.
    ...mapGetters(['ActiveItems']),
  },
};
</script>

<style lang='scss' scoped>
  .home {
    border: 1px;
  }
</style>
