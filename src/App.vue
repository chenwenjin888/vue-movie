<template>
  <div id="app">
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
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
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
        this.$router.push({
          path: '/search/' + this.searchKey,
        })
        this.searchKey = "";
      }
    }
  }
</script>

<style>
  a {
    color: #888;
  }

  .canvas {
    display: flex;
    justify-content: center;
  }

  .spinner {
    animation: spinner 1s linear infinite;
    border: solid 1.5em #4DB6AC;
    border-right: solid 1.5em transparent;
    border-left: solid 1.5em transparent;
    border-radius: 100%;
    width: 0;
    height: 0;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(60deg)
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
