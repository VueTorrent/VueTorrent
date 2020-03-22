<template>
  <v-app class="grey lighten-4">
    <!--snackbar popup for torrent added -->
    <v-snackbar :value="snackbar" :timeout="4000" top color="success">
      <span>{{succes_msg}}</span>
      <v-btn color="white" flat @click="snackbarClose">Close</v-btn>
    </v-snackbar>

    <!--snackbar popup for errors -->
    <v-snackbar :value="snackbar_error" :timeout="4000" top color="error">
      <span>{{error_msg}}</span>
      <v-btn color="white" flat @click="snackbar_errorClose">Close</v-btn>
    </v-snackbar>

    <div v-if="authenticated">
      <Navbar/>
      <v-content class="mx-4 mb-4">
        <router-view></router-view>
      </v-content>
    </div>
    <v-container v-else fill-height>
      <v-layout row wrap align-center class="justify-center" justify-center>
        <div style="margin: 0 auto">
          <Login/>
        </div>
      </v-layout>
    </v-container>

    <v-spacer></v-spacer>
    <p class="grey--text caption text-sm-center text-md-center text-xs-center">Made by Daan Wijns</p>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar'
import Login from './components/Login'

export default {
  components: { Navbar, Login },
  name: 'App',
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'authenticated',
      'snackbar_error',
      'error_msg',
      'snackbar',
      'succes_msg',
    ]),
  },
  methods: {
    snackbar_errorClose() {
      this.$store.state.snackbar_error = false
    },
    snackbarClose() {
      this.$store.state.snackbar = false
    },
  },
}
</script>
