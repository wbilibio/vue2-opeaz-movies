<template>
    <v-container class="grey lighten-5">
      <MovieList :loading-prop="loading" :items="favorites" :pagination="false" />
    </v-container>
  </template>
  
  <script>
    import { mapState } from 'vuex'
    import MovieList from '../components/MovieList.vue'
    export default {
      data: () => ({
        loading: false
      }),
      computed: { 
        ...mapState('movies', {
          favorites: 'favorites'
        })
      }, 
      components: { MovieList }      
    }
  </script>
  