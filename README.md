# vue-movie
>vue2.0 豆瓣电影项目实例，包含三个功能模块（首页列表、搜索列表、详情页） ，适合刚入门学习

## 所需组件
我们会用到vue的核心组件：vue-router、axios、vue-cli
1. 使用vue-cli脚手架创建项目（使用webpack模板）
2. 使用vue-router实现单页面应用
3. 使用axios请求豆瓣API的数据
4. 使用bootstrap样式库

## 安装
>PS：请先安装node和npm，这个就不做多介绍。嫌npm下载太慢，可以安装一个cnpm淘宝npm镜像，安装方式：npm install -g cnpm --registry=https://registry.npm.taobao.org

第一步安装vue-cli

```
cnpm i -g vue-cli
```
然后使用vue-cli脚手架创建一个webpack项目，根据提示一步步来，在是否安装vue-router的时候选择y，省的后面再安装

```
vue init webpack vue-movie
```
![image](http://note.youdao.com/yws/public/resource/b9324d1a09138ab84e0bbe979766a420/88A5CC7022134EF6AFC2A96672FFF0D7)

安装成功后根据提示进入项目中

```
cd vue-movie
```
安装依赖模块

```
cnpm i
```
启动服务, 它会去package.json中找到script对象下的start，进行热加载部署

```
cnpm run dev
```
我们可以在浏览器中输入：localhost:8080进入下面界面就代表我们第一步环境搭建已经完成。给大家提供一个网址，里面详细介绍了vue-cli的webpack模板项目配置文件分析：http://blog.csdn.net/hongchh/article/details/55113751
![image](http://note.youdao.com/yws/public/resource/b9324d1a09138ab84e0bbe979766a420/C3A6C68D758040E4A30EF74318B0545A)

## 效果图
先感受这三个页面的效果图，不好也不允许吐槽，O(∩_∩)O哈哈~
![image](http://note.youdao.com/yws/public/resource/b9324d1a09138ab84e0bbe979766a420/3243E492DFB74266B58863950A9068CF)
![image](http://note.youdao.com/yws/public/resource/b9324d1a09138ab84e0bbe979766a420/3C8479DE56EC4007A8706BAA8EB008DB)
![image](http://note.youdao.com/yws/public/resource/b9324d1a09138ab84e0bbe979766a420/3843DD3BDBC24DB58FE7B9A6F0CBECC2)

## 正式开工
首先，我们把剩下需要的组件下下来：

```
cnpm i bootstrap axios -S
```

## 项目结构
```javascript
.
├── build // 构建后路径
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config  // 配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── src
│   ├── assets
│   ├── components
│   │   ├── MovieList.vue // 电影列表组件
│   │   └── Header.vue  // 头部导航栏组件
│   ├── router // 路由
│   │   ├── index.js
│   └── views // 视图
│       ├── Index.vue // 首页-显示正在上映电影
│       └── Search.vue // 搜索页
│       └── Detail.vue // 详情页
│   ├── App.vue
│   ├── main.js // 入口文件
├── static
├── README.md
├── index.html
├── package.json
```
电影项目展示主要包含三个模块：首页、搜索页、详情页，根据这三个页面我们在views下新建三个.vue文件。其中头部是固定的，首页和首页页都要展示影片列表，所以我们抽出来2个共用组件MovieList.vue和Header.vue。

##  初始化 main.js

```
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css

// 请求绑定Vue属性上面，方便使用
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```
引入组件、路由、样式库、数据请求，并初始化Vue实例，这里我们引入了一个入口App组件以及一个路由配置文件，接下来我们就先开始实行他们

## 创建App组件

```
// src/App.vue
<template>
  <div id="app">
    <v-header></v-header>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import vHeader from './components/Header.vue'
  export default{
    components: {
      vHeader
    }
  }
</script>
```
这里使用了keep-alive来缓存页面的组件，减少性能消耗。  还引入了头部组件，下面就开始写头部代码。

## 头部组件

```
// src/components/Header.vue
<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-brand">
        <router-link to="/">豆瓣电影</router-link>
      </div>
      <form class="navbar-form navbar-left" role="search" @submit.prevent="submit">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="输入电影名称" v-model="searchKey">
        </div>
        <button type="submit" class="btn btn-default">搜索</button>
      </form>
    </div>
  </nav>
</template>

<script>
  export default{
    data(){
      return {
        searchKey: ''
      }
    },
    methods: {
      submit(){
        if (!this.searchKey) {
          alert('请输入搜索内容');
          return;
        }
        // 搜索页面跳转
        this.$router.push({
          path: '/search/' + this.searchKey,
        })
        this.searchKey = "";
      }
    }
  }
</script>
```
这里包含了搜索功能，输入关键字进行搜索， 下面开始配置各个页面之间的路由。

## 路由配置

```
// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Search from '@/views/Search'
import Detail from '@/views/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/search/:searchKey',
      component: Search
    },
    {
      path:'/detail/:id',
      component: Detail
    }
  ]
})
```

## 豆瓣API
该应用使用了下面3个api：
* `/v2/movie/search?q=关键字` 电影搜索api
* `/v2/movie/in_theaters` 正在上映的电影
* `/v2/movie/subject/:id` 单个电影条目信息

>PS:更多关于豆瓣的api可以前往[豆瓣api官网](https://developers.douban.com/wiki/?title=api_v2)查看。

## 电影列表
首页展示的是正在热映的电影(Index.vue)，搜索页展示的是搜索后的结果集(Search.vue)，他们都是展示电影列表，所以我们共用了一个MovieList.vue组件，先上代码：

```
// src/views/Index.vue
<template>
  <div>
    <movie-list :movie-type="movieType"></movie-list>
  </div>
</template>

<script>
  import movieList from '@/components/MovieList.vue'
  export default {
    data(){
      return {
        movieType: 'in_theaters' // 正在热映类型
      }
    },
    components: {
      'movie-list': movieList
    }
  }
</script>
```

```
// src/views/Search.vue
<template>
  <div>
    <movie-list :movie-type="movieType" ref="updateList"></movie-list>
  </div>
</template>

<script>
  import movieList from '@/components/MovieList.vue'
  export default{
    data(){
      return {
        movieType: 'search' // 搜索类型
      }
    },
    watch: {
      // 监听路由，搜索页重复搜索的时候改变路由状态，页面重新加载，不监听的话组件实例会被复用
      '$route'(to, from){
        // 防止返回重复调用
        if (to.path.indexOf('/search/') == 0) {
          // 调用子组件方法
          this.$refs.updateList.loadMovieList();
        }
      }
    },
    components: {
      'movie-list': movieList
    }
  }
</script>
```

```
// src/components/MovieList.vue
<template>
  <div class="container">
    <div class="canvas" v-show="loading">
      <div class="spinner"></div>
    </div>
    <h2>{{title}}</h2>
    <div class="row">
      <div class="col-md-2 text-center" v-for="item in list" :key="item.id">
        <router-link :to="{path:'/detail/'+item.id}">
          <img :src="item.images.large">
          <div class="title">{{item.title}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        title: '',
        list: []
      }
    },
    props: ['movieType'],// 接收父组件传过来的值 --in_theaters=正在上映的电影  --search==搜索电影
    mounted(){
      this.loadMovieList();
    },
    methods: {
      loadMovieList(){
        this.loading = true;
        // 请求参数
        let params = {
            count: 18
          },
          // 请求路径
          movieUrl = '/api/movie/' + this.movieType;
        // 如果是搜索进入，新增搜索关键字参数
        if (this.movieType == 'search') {
          params['q'] = this.$route.params.searchKey;
        }
        this.$http.post(movieUrl, params).then((res) => {
          console.log(res.data)
          // 这里不做多校验，可自己加，直接上数据
          this.list = res.data.subjects;
          this.title = res.data.title;
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
    height: 230px;
    vertical-align: middle;
  }
  .row > div {
    margin-bottom: 20px;
  }
  .title {
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

```
>组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。父组件的数据需要通过 prop 才能下发到子组件中。 所以我们在Index.vue 和 Search.vue中的movie-list我们定义了一个Prop属性movie-type, 下发给子组件MovieList.vue,告知当前类型是什么，并根据类型请求相应类型的数据。
```
// 父级
<movie-list :movie-type="movieType"></movie-list>
```

```
// 子级
export default {
  ...
  props: ['movieType'],// 接收父组件传过来的值 --in_theaters=正在上映的电影  --search==搜索电影
  ...
}
```


>在重复搜索的时候，我们会发现页面根本不会重新请求数据，并渲染页面。这是因为：当使用路由参数时，例如从 /search/a 导航到 search/b，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。复用组件时，想对路由参数的变化作出响应的话，可以简单地 watch（监测变化） $route 对象  ,所以在Search.vue中加入如下代码

```
watch: {
  // 监听路由，搜索页重复搜索的时候改变路由状态，页面重新加载，不监听的话组件实例会被复用
  '$route'(to, from){
    // 防止返回重复调用
    if (to.path.indexOf('/search/') == 0) {
      // 调用子组件方法
      this.$refs.updateList.loadMovieList();
    }
  }
}
```
>当我们高高兴兴的进入页面后发现页面没反应， 打开控制台一看，waht，跨域了，我勒个去。好在vue-cli中webpack模板提供了代理的配置，根据[官网文档](http://vuejs-templates.github.io/webpack/proxy.html)的给出的方法进行配置。

```
// config/index.js
module.exports = {
  ...
  dev:{
    proxyTable: {
      '/api': {
        target: 'http://api.douban.com/v2',// 有使用次数限制
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  ...
}
```
这样我们就可以使用/api/movie/in_theaters代替http://api.douban.com/v2/movie/in_theaters进行访问了， 跨域问题也就解决。


## 详情

```
// src/views/Details.vue
<template>
  <div class="container">
    <div class="canvas" v-show="loading">
      <div class="spinner"></div>
    </div>
    <h2>{{movie.title}}({{movie.year}})</h2>
    <div class="box">
      <div class="left">
        <img :src="movie.images.large">
      </div>
      <div class="main">
        <div>导演：{{getDirectors}}</div>
        <div>主演：{{getCasts}}</div>
        <div>评分：{{movie.rating.average}}</div>
        <div>
          <h3>{{movie.title}}剧情介绍</h3>
          {{movie.summary}}
        </div>
      </div>
    </div>
  </div>
</template>
```
这里唯一要注意的是movie.xx.xx多级情况下，如果不在data里面定义好，在初始化的时候会报错，请求数据填充后又成功了。
```
// src/views/Details.vue
<script>
  export default {
    data () {
      return {
        loading: true,
        movie: {
          images: {
            large: ''
          },
          rating: {
            average: 0
          }
        }
      }
    },
    /*mounted(){
      // 获取电影详情
      this.getMovieDetail();
    },
    watch: {
      // 监听路由，搜索页重复搜索的时候改变路由状态，页面重新加载，不监听的话组件实例会被复用
      '$route'(to, from){
        // 防止返回重复调用
        if (to.path.indexOf('/detail/') == 0) {
          this.getMovieDetail();
        }
      }
    },*/
    activated(){
      // 在App.vue中使用了构建组件keep-alive,所以可用钩子函数activated属性来代替watch中的$route监听
      // 获取电影详情
      this.getMovieDetail();
    },
    methods: {
      // 获取电影详情
      getMovieDetail(){
        let detailUrl = '/api/movie/subject/' + this.$route.params.id;
        this.$http.get(detailUrl).then((res) => {
          console.log(res.data);
          this.movie = res.data;

          this.loading = false;
        })
      },
      // 过滤数据
      getFilterData(obj){
        let arr = [];
        if (!obj || obj.length == 0)return '';

        for (let i = 0; i < obj.length; i++) {
          arr.push(obj[i].name)
        }
        return arr.join('/');
      },
    },
    computed: {
      // 获取导演
      getDirectors(){
        return this.getFilterData(this.movie.directors);
      },
      // 获取主演
      getCasts(){
        return this.getFilterData(this.movie.casts);
      },
    }
  }
</script>
```
>这个也会碰到跟重复搜索一样的问题，进入详情后返回在进入另一个详情页面不变，原理一样。但是还有另一种实现方式，由于我们在App.vue中使用了构建组件keep-alive,所以可用钩子函数activated属性来代替watch中的$route监听。可多了解下vue的生命周期
```
// src/views/Details.vue
<style scoped>
  .box {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }

  .left {
    width: 200px;
    height: 300px;
  }

  .left img {
    width: 100%;
    height: 100%;
  }

  .main {
    margin-left: 20px;
    flex: 1;
  }
</style>
```

## 总结
至此，我们的一个简单的豆瓣电影实例已经完成，踩了很多坑，但是也学到了很多东西，此处省略N个字的心得...


>[源码地址：Vue2.0 豆瓣电影项目实例](https://github.com/chenwenjin888/vue-movie) ，如果觉得有帮助，可**star**一下啊

## 进阶篇
好了，Vue会用了，不会Vuex怎么行呢。下一目标[Vuex 豆瓣电影项目实战](https://github.com/chenwenjin888/vuex-movie)
