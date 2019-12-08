![https://user-images.githubusercontent.com/12059592/70378351-8e1d5d80-1962-11ea-815a-67f4be55d85c.png](https://user-images.githubusercontent.com/12059592/70378351-8e1d5d80-1962-11ea-815a-67f4be55d85c.png)

> ./src/store/index.js는 모든 모듈을 import 받는다
>
> 각각의 모델을 모듈화 하여, 
>
> Large Scale Project 에서도 활용할 수 있도록 체계화 시키는것이 중요하다

## 1. vuex 모듈화 기본 폴더 구조
```
.
├── ...
├── store      // vuex store를 모아둔 디렉토리
|   ├── Modules
|   |   ├── post
|   |   |   ├── actions.js    // vuex - post/actions 모듈
|   |   |   ├── getters.js    // vuex - post/getters 모듈
|   |   |   ├── mutations.js  // vuex - post/mutations 모듈
|   |   |   ├── state.js      // vuex - post/state 모듈
|   |   |   └── index.js      // vuex - post/index
|   |   └── ...
|   └── index.js
├── ...
```

## 2. post폴더를 분석해보자

1. state.js  
post 모델에서 사용될 데이터담는 코드

```
./store/Modules/post/state.js

export default {
  items: [
    {
      title: '제목 1',
      content: '내용 1',
      isDone: false,
      time: Date.now(),
    },
    {
      title: '제목 2',
      content: '내용 2',
      isDone: true,
      time: Date.now(),
    },
  ],
  views: {
    currentFilter: 'All',
  },
};
```

2. getters.js  
    post 모델에서 state를 가져올때 사용하는 코드  

```
  ./store/Modules/post/getters.js
  
  // 각각의 기능을 상수화 함으로써,
  // 중앙 집중식 관리 할 수 있도록 구현
  // 모델이 많아 질수록 혼선이 올수 있는데
  // 그러한 부분을 해소 할 수 있음
  export const DONE_ITEMS = 'DONE_ITEMS';    
  export const ALL_ITEMS = 'ALL_ITEMS';
  
  export default {
    [DONE_ITEMS]: state => state.items.filter(post => post.isDone),
    [ALL_ITEMS]: state => state.items,
  };
```

3. mutations.js  
   post 모델에서 state 값을 변경하는데 사용하는 코드  
   모든 state값은 mutation을 통해 변경하는것으로 약속한다  
   tate를 각각 콤포넌트에서 무분별하게 변경하게 되면  
   프로젝트 상태 관리가 상당히 힘들어지는 부분이 있기 때문이다  

```
./store/Modules/post/mutations.js

export const SET_NEW_ITEM = 'SET_NEW_ITEM';

export default {
  [SET_NEW_ITEM](state, payload) {
    const newItem = payload;
    state.items.push(newItem);
  },
};
```

4. actions.js
post 모델에서 mutation에 값을 전달해주기 위해 사용되는 코드  
component에서 mutation을 직접 접근하는게 아닌,  
actions에서 commit으로 mutation에 전달하도록 약속한다  
state 관리를 쉽게하고, 혼선을 줄일 수 있다  

```
./store/Modules/post/mutations.js

export const SET_NEW_ITEM = 'SET_NEW_ITEM';

export default {
  [SET_NEW_ITEM](state, payload) {
    const newItem = payload;
    state.items.push(newItem);
  },
};
```

4. index.js
    state,getters,actions,mutations를 모두 import 시켜서,
    하나의 post 모듈로 합쳐서 export한다
    vuex의 createNamespacedHelpers 헬퍼 함수를 사용하여 네임스페이스를 지정하면
    좀더 효율적으로 활용 가능하다

```
./store/Modules/post/index.js

import { createNamespacedHelpers } from 'vuex';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export const NAMESPACE = 'post';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(NAMESPACE);

export { mapState, mapGetters, mapActions };

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
```

## 3. /store/index.js 코드 작성하기

- 이제 작성된 모듈을 하나의 파일로 모으는 작업을 해야한다.
- 아래와 같이 작성하면 된다.

```
./src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    post,
  },
});
```

## 4. 작성한 Vuex를 컴포넌트에서 사용해 보자

1. getter를 사용해보자

```
./src/views/Home.vue

<template>
  <div class="home">
    <div v-for="(item, index) in getItems" :key="index">
      {{item.title}}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

// 해당 Vuex 모듈 네임스페이스를 import
import { NAMESPACE } from '@/store/modules/post'; 

// post model의 getters를 import
import * as postGetters from '@/store/modules/post/getters';

// NAMESPACE 주입
// postListHelper에는 'mapState', 'mapGetters', 'mapActions', 'mapMutations'를 가지고 있다
const postListHelper = createNamespacedHelpers(NAMESPACE); 

export default {
  name: 'home',
  computed: {
    // postListHelper는 mapGetters를 가지고 있다
    // postGetters.DONE_ITEMS 처럼 상수를 가져와서 중악 집중식 관리 할 수 있도록 한다
    ...postListHelper.mapGetters({
      getItems: postGetters.DONE_ITEMS,
      allItems: postGetters.ALL_ITEMS,
    }),
  },
  methods: {
  },
};
</script>

<style lang='scss' scoped>
  .home {
    border: 1px;
  }
</style>
```

2. actions를 사용해보자

```
./src/views/Home.vue

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
    // postListHelper는 mapActions를 가지고 있다
    // postActions.SET_NEW_ITEM_ASYNC 처럼 상수를 가져와서 중악 집중식 관리 할 수 있도록 한다
    ...postListHelper.mapActions([postActions.SET_NEW_ITEM_ASYNC]),
    onClick() {
      // 위에서 postActions.SET_NEW_ITEM_ASYNC로 가져왔기 때문에
      // this[이벤트 상수] 와 같은 형식으로 호출 한다
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
```

## 추가설명

> component에서 vuex를 사용하는 포인트는  
getters와 actions로 통일하는게 포인트이다  
state는 getters로 통해 불러오고  
state변경은 actions를 이용하고  
actions에서 commit을 통해 mutation으로 전달  
state의 순환고리를 좀 더 명확하게 하기 위함이다  
