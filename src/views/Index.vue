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
        movieType: 'in_theaters'// 正在热映类型
      }
    },
    components: {
      'movie-list': movieList
    }
  }
</script>

<style>
</style>
