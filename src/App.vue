<template>
  <v-app id="inspire">
    <v-navigation-drawer       
      v-model="drawer"
      dark
      app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Opeaz
          </v-list-item-title>
          <v-list-item-subtitle>
            movies
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="red "
      dense
      dark
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Movies</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/favorites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon to="/">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey darken-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Movies', icon: 'mdi-movie-open', to: '/' },
        { title: 'Favorites', icon: 'mdi-heart', to: '/favorites' },
      ],
      right:null, 
      drawer: null 
    }),
  }
</script>