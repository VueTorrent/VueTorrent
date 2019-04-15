<template>
  <v-container class="grey lighten-4">
    <v-card max-width="400" flat>
      <v-container :class="`pa-3 project done`">
        <v-card-title class="justify-center">
          <h2>Login</h2>
        </v-card-title>
        <div class="mr-5 ml-5"></div>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              flat
              solo
              background-color="grey lighten-4"
              label="username"
              prepend-icon="person"
              v-model="username"
              :rules="inputRules"
              @keyup.enter.native="Login"
            ></v-text-field>
            <v-text-field
              flat
              solo
              background-color="grey lighten-4"
              type="password"
              label="password"
              prepend-icon="lock"
              v-model="password"
              :rules="inputRules"
              @keyup.enter.native="Login"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                flat
                @click="Login"
                class="blue_accent white--text mx-0 mt-3"
              >Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      inputRules: [v => v.length >= 1 || "At least 1 character"]
    };
  },
  methods: {
    Login() {
      this.$store.state.loading = true;
      this.$store.dispatch("LOGIN", {
        username: this.username,
        password: this.password
      });
    }
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>
