<template>
  <div id="app" container>
    <v-layout wrap>
      <v-container>
        <v-layout justify-center>
          <v-btn v-if='!drawer' @click.stop="drawer = !drawer" fab fixed left top>
            <v-icon dark>list</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
      <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      dark
      absolute
      >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="handleRoute(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
  <router-view></router-view>
</div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import auth from './shared/auth'
export default {
  data () {
    return {
      drawer: null,
      items: [
      { title: 'Log In', icon: 'account_circle', route: 'LogIn' },
      { title: 'Dashboard', icon: 'dashboard', route: 'Dashboard' },
      { title: 'Profile', icon: 'account_box', route: 'Profile' },
      { title: 'Log Out', icon: 'exit_to_app', route: 'LogOut' },
      ],
      mini: false,
      right: null,
    }
  },
  methods: {
    handleRoute(route) {
      this.$router.push(route)
    }
  }
}
</script>
