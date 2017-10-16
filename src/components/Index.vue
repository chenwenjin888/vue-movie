<template>
  <div>
    <movie-list :movie-type="movieType"></movie-list>
  </div>
</template>

<script>
  import movieList from './MovieList.vue'
  export default {
    data(){
      return {
        movieType: 'in_theaters'
      }
    },
    components: {
      'movie-list': movieList
    }
  }
</script>

<style>
</style>
