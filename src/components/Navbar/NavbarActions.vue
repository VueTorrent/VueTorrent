<template>
  <v-row align="center" align-content="center" justify="center">
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-list-item link v-on="on" @click="logout">
            <v-icon class="white--text">
              {{ mdiExitToApp }}
            </v-icon>
          </v-list-item>
        </template>
        <span>Log out</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-list-item link v-on="on" @click="toggleSpeed">
            <v-icon
              color="white"
            >
              {{ altSpeed ? mdiSpeedometerSlow : mdiSpeedometer }}
            </v-icon>
          </v-list-item>
        </template>
        <span>Alt speeds</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-list-item link v-on="on" @click="toggleTheme">
            <v-icon
              class="white--text"
            >
              {{ theme === 'Light' ? mdiBrightness7 : mdiBrightness4 }}
            </v-icon>
          </v-list-item>
        </template>
        <span>{{ theme }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import qbit from '@/services/qbit'
import { mapGetters } from 'vuex'
import { mdiBrightness4, mdiSpeedometerSlow, mdiBrightness7, mdiSpeedometer, mdiExitToApp } from '@mdi/js'

export default {
  name: 'BottomActions',
  data: () => ({
    mdiBrightness4,
    mdiBrightness7,
    mdiSpeedometer,
    mdiExitToApp,
    mdiSpeedometerSlow
  }),
  computed: {
    ...mapGetters(['getTheme', 'getStatus']),
    theme() {
      return this.getTheme() ? 'Dark' : 'Light'
    },
    altSpeed() {
      const status = this.getStatus()
      if (status && status.altSpeed) return status.altSpeed

      return null
    }
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    },
    toggleSpeed() {
      qbit.toggleSpeedLimitsMode()
    },
    toggleTheme() {
      this.$store.commit('TOGGLE_THEME')
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style lang="scss" scoped>
.justify-space-between {
    bottom: 0px;
    padding: 10px;
}
</style>
