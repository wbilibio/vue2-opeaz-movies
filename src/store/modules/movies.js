import omdbapi from '../../api/omdbapi'

// initial state
const state = () => ({
  all: [],
  favorites: [],
  countPage: 0
})

// getters
const getters = {
  getAllMovies: (state) => {
    return state.all.map(movie => {
      let foundFavorite = state.favorites.find(({ imdbID }) => imdbID === movie.imdbID);
      if(foundFavorite && !movie['isFavorite']) {
        movie['isFavorite'] = true;
      }
      return movie;
    })
  }

}

// actions
const actions = {
  async getMoviesByTitle({ commit }, params) {
    const data = await omdbapi.getMovies(params);
    
    commit('setCountPage', data.totalResults);
    commit('setMovies', data.Search)
  },
  
  saveFavoriteMovie ({ commit, state }, movie){
    let foundFavorite = state.favorites.find(({ imdbID }) => imdbID === movie.imdbID);
    if(!foundFavorite) {
      movie['isFavorite'] =  true;
      commit('setFavoriteMovie', movie)
    } else {
      commit('decrementFavoriteMovie', movie)
    }
  },

  updateFavoriteMovies({ commit }, movies) {
    commit('setFavoriteMovies', movies)
  }
}

// mutations
const mutations = {
  setMovies (state, movies) {
    state.all = movies
  },
  setFavoriteMovie (state, movie) {
    state.favorites.push(movie);    
    localStorage.setItem('movies', JSON.stringify(state.favorites));
  },

  decrementFavoriteMovie (state, movie) {

    let foundIndex = state.all.findIndex(({ imdbID }) => imdbID === movie.imdbID);
    state.favorites = state.favorites.filter(({ imdbID }) => imdbID !== movie.imdbID);
    delete state.all[foundIndex]['isFavorite'];
    
    localStorage.setItem('movies', JSON.stringify(state.favorites));
  },
  
  setFavoriteMovies(state, movies) {
    state.favorites = movies;
  },

  setCountPage (state, totalMovies) {
    state.countPage = Math.ceil(totalMovies/10);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}