<template>
  <v-layout class="background mt-5">
    <div style="margin: 130px auto">
      <v-card max-width="400" flat>
        <v-card-title class="justify-center">
          <h2>Login</h2>
        </v-card-title>
        <div class="mr-5 ml-5" />
        <v-card-text>
          <v-form ref="form" class="px-3">
            <v-text-field
              v-model="username"
              outlined
              label="username"
              :prepend-icon="mdiAccount"
              :rules="inputRules"
              autocomplete="current email"
              name="username"
              autocapitalize="none"
              persistent-placeholder
              autofocus
              @keyup.enter.native="login"
            />
            <v-text-field
              v-model="password"
              outlined
              type="password"
              label="password"
              :prepend-icon="mdiLock"
              :rules="inputRules"
              autocomplete="current password"
              name="password"
              autocapitalize="none"
              persistent-placeholder
              @keyup.enter.native="login"
            />
            <v-spacer />
            <v-card-actions class="justify-center">
              <v-btn text class="accent white--text mx-0 mt-3" @click="login"> Login </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { mdiLock, mdiAccount } from '@mdi/js'

export default {
  name: 'Login',
  ...mapState(['authenticated']),
  data() {
    return {
      username: '',
      password: '',
      inputRules: [v => v.length >= 1 || 'At least 1 character'],
      mdiLock,
      mdiAccount
    }
  },
  async mounted() {
    if (this.$route.query.username !== undefined && this.$route.query.password !== undefined) {
      this.authenticated = await this.$store.dispatch('LOGIN',{
        username: this.$route.query.username,
        password: this.$route.query.password
      })
    }
    if (this.authenticated) {
      this.redirectOnSuccess()
    }
  },
  methods: {
    async login() {
      const authenticated = await this.$store.dispatch('LOGIN', {
        username: this.username,
        password: this.password
      })

      if (authenticated) {
        this.redirectOnSuccess()
      }
    },
    redirectOnSuccess() {
      if (this.$route.query.redirect !== undefined) {
        this.$router.push(this.$route.query.redirect)
      } else {
        this.$router.push({ name: 'dashboard' })
      }
    }
  }
}
</script>
