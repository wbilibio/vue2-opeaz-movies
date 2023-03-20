<template>
    <v-container class="grey lighten-5">
        <v-row
          class="mt-3"
          no-gutters
        >
        <v-col>
          <v-card
            class="pa-2 mx-auto text-center"
            max-width="600"

            outlined
            tile
          >
            <v-text-field
              label="Search movie by title"
              :rules="rules"
              hide-details="auto"
              v-model="search"
              class="mb-4"
            ></v-text-field>
            <v-btn
              color="success"
              class="mr-4"
              @click="submit"
            >
              Search
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <MovieList v-bind:loading-prop="loading" :search="search" :items="movies" :pagination="true" />
    </v-container>
  </template>
  
  <script>
    import { mapGetters } from 'vuex'
    import MovieList from '../components/MovieList.vue'
    export default {
      data: () => ({
        search: '' ,
        rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        loading: false
      }),
      methods: {
        submit: function () {
          if(this.search.length > 3) {
            this.loading = true;
            this.$store.dispatch('movies/getMoviesByTitle', this.search);            
          }
        }
      },
      computed: { 
        ...mapGetters('movies', {
          movies: 'getAllMovies'
        })
      }, 
      components: { MovieList }      
    }
  </script>
  