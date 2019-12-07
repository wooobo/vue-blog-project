## vue cli를 이용해 프로젝트를 생성

    $ mkdir VueBlogProject      // root 프로젝트 폴더 생성 
    $ cd VueBolgProject         // root 폴더 이동
    $ vue create vue-blog-front // 'vue-blog-front' vue 프로젝트 생성
    
    
    **TIP.
    vue-cli에서의 "@"는 "/src"를 가르키는 별칭이다.**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee8a9ac6-f1c3-4026-a0d8-a091046a1ea6/_2019-11-30__4.58.04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee8a9ac6-f1c3-4026-a0d8-a091046a1ea6/_2019-11-30__4.58.04.png)

## 2. 폴더 구조 파악하기

    .
    ├── assets // 이미지, 기타 파일 등등
    ├── components // vue 콤포넌트 파일 디렉토리
    |   ├── CustromComponent.vue
    |   └── ...
    ├── router     // vue router를 모아둔 디렉토리
    ├── store      // vuex store를 모아둔 디렉토리
    ├── styles      // 스타일을 모아둔 디텍토리
    ├── views      // page 파일을 모아둔 디렉토리
    |   └── CustromPageView.vue
    ├── App.vue    // APP 최상위 vue 콤포넌트 파일
    └── main.js    // 가장 먼저 실행되는 파일 -> vue instance를 생성함

## 3. 프로젝트 초기 설정

    1. 불필요 한 파일 제거
     ./src/components/HelloWorld.vue 
     ./src/views/About.vue
    
    
    2. App.vue 깔끔하게 초기화
    <template>
      <div id="app">
        <router-view/>
      </div>
    </template>
    
    <style>
    </style>
    
    3. scss 종속성 설치
    yarn add --save-dev node-sass sass-loader style-resources-loader
    
    4. Webpack 설정을 어떻게?
    vue-cli의 "2.x"에서는 webpack.config.js 파일이 루트 디렉토리에 있었으나, 
    "3.x"에서는 없어졌기에 설정을 추가하기 위해서는 루트 디렉토리에 
    "vue.config.js" 파일을 설정하고 내용을 추가해줘야 한다.
    
    5. 공통 css관리 설정
    	- vue 루트 디렉토리에 ./vue.config.js 파일을 생성
      - 아래 코드를 작성한다.
    ```
    // vue.config.js
    const path = require('path')
    
    module.exports = {
      chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
      },
    }
    
    function addStyleResource (rule) {
      rule.use(['style-loader', 'css-loader', 'sass-loader'])
        .loader('style-resources-loader')
        .options({
          patterns: [
            './src/styles/*.scss',
          ]
        })
    }
    ```
    
    6. reset css 설정
    ./src/styles/_reset.scss 
    ./src/styles/_variables.scss
    파일 생성 후 
    _reset.scss에 css 초기화 코드 작성
    (https://gist.github.com/DavidWells/18e73022e723037a50d6)
    
    ***
    TIP.
    "To install it, you can run: npm install --save core-js/modules/es.object.to-string"
    이런 에러가 나온대면, core-js버전 문제이므로 다시 설치한다
    npm install --save core-js
    ***
