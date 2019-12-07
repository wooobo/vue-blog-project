![https://user-images.githubusercontent.com/12059592/70378349-8b226d00-1962-11ea-9059-f9d6e69e2145.png](https://user-images.githubusercontent.com/12059592/70378349-8b226d00-1962-11ea-9059-f9d6e69e2145.png)

## 1. vuex - { mapState } 출력해보기

- 아래 와 같이 코드를 작성
- state 부분에 데이터임시 데이터를 작성

    ./src/store/index.js
    
    import Vue from 'vue';
    import Vuex from 'vuex';
    
    Vue.use(Vuex);
    
    export default new Vuex.Store({
      state: {
        items: [
          {
            title: '제목 1',
            content: '내용 1',
          },
          {
            title: '제목 2',
            content: '내용 2',
          },
        ],
      },
      mutations: {
      },
      actions: {
      },
      modules: {
      },
    });

## 2. component에서 mapState를 받아 사용해보기

    ./src/views/Home.vue
    
    <template>
      <div class="home">
        <div>
          {{items}}
        </div>
      </div>
    </template>
    
    <script>
    import { mapState } from 'vuex'; // vuex에서 "mapState"를 가져옵니다.
    
    export default {
      name: 'home',
      computed: {
        ...mapState(['items']), // mapState에 items를 등록합니다. 
    														// 여기서 items는 ./src/store/index.js에서 state에 등록한 object 입니다.
      },
    };
    </script>
    
    <style lang='scss' scoped>
      .home {
        border: 1px;
      }
    </style>

## 3. component에서 mapGetters로 state가져오기

- getters를 위와 같이 작성합니다.

    ./src/store/index.js
    
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
      },
      actions: {
      },
      getters: {
        ActiveItems: state => state.items.filter(item => item.isActive),
      },
      modules: {
      },
    });

- store getter에 지정한 'ActiveItems'가 출력되는것을 확인 할 수 있습니다.

    ./src/views/Home.vue
    
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

## 4. component에서 mapMutations 사용하기

- mutations에 'MutationAddItem' 함수를 정의 한다.

    ./src/store/index.js
    
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
      },
      getters: {
        ActiveItems: state => state.items.filter(item => item.isActive),
      },
      modules: {
      },
    });

- mapMutations를 주입시킨다.
- methods안에 "...mapMutations(['MutationAddItem']),"를 정의한다.
- 정의된 mutation은 this 로 접근이 가능하다
- ex) this.MutationAddItem(payload);

    ./src/views/Home.vue
    
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
    import { mapState, mapGetters, mapMutations } from 'vuex'; // vuex에서 "mapState"를 가져옵니다.
    
    export default {
      name: 'home',
      computed: {
        ...mapState(['items']), // mapState에 items를 등록합니다. 여기서 items는 ./src/store/index.js에서 state에 등록한 object 입니다.
        ...mapGetters(['ActiveItems']),
      },
      methods: {
        ...mapMutations(['MutationAddItem']),
        onMutation() {
          this.MutationAddItem({
            title: '제목 추가',
            content: '내용 추가',
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

## 4. component에서 mapActions 사용하기

- actions에 'ActionAddItem' 메소드를 정의함.

    ./src/store/index.js
    
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

- vuex에서 "mapActions" 를 가져옴
- ...mapActions(['ActionAddItem']), 정의
- @click="onMutation" 함수 작동 확인

    ./src/views/Home.vue
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
