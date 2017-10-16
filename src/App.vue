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
