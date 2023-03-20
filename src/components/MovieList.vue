<template>
  <v-container>
    <v-row
        class="mb-6"
        v-show="loadingProp && !items.length"
      >
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          sm="4"
        >
          <v-skeleton-loader
            type="card,  actions"
          ></v-skeleton-loader>
        </v-col>          
    </v-row>
    <v-row
      class="mb-6"
      v-show="items.length"
    >
      <v-col
        v-for="movie in items"
        :key="movie.imdbID"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto my-4"
          max-width="374"
        >
          <v-img
            height="250"
            :src="movie.Poster"
          ></v-img>

          <v-card-title style="word-break: normal !important;">{{ movie.Title }}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-btn icon @click="saveFavorite(movie)">
                <v-icon :color="movie.isFavorite ? 'red lighten-2' : '' ">mdi-heart</v-icon>
              </v-btn>
            </v-row>

            <div class="mt-4 text-subtitle-1">
              Year • {{ movie.Year }}
            </div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>{{ movie.Type }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>          
    </v-row>
    <v-row v-if="countPage && pagination" justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            v-model="page"
            color="red"
            class="my-4 "
            :length="countPage"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: [
      "loadingProp", 
      "items", 
      "search",
      "pagination"
    ],
    data: () => ({
        page: 0
      }),
    created: function() {
        let storageMovies = JSON.parse(localStorage.getItem('movies'));
        if(storageMovies && storageMovies.length){            
          this.$store.dispatch('movies/updateFavoriteMovies', storageMovies)
        }
    },    
    computed: { 
        ...mapState('movies', {
          countPage: 'countPage'
        })
      },   
    methods: {
      saveFavorite: function(movie) {
        this.$store.dispatch('movies/saveFavoriteMovie', movie)
      }
    },
    watch:{
      page: function(newPage){
        let params = this.search + "&page=" + newPage;
        this.$store.dispatch('movies/getMoviesByTitle', params);
      }
    }
  }
</script>
