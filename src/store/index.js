import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
//import cart from './modules/cart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    movies
    //products
  },
  strict: debug
})