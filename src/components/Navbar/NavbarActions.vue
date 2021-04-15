<template>
  <v-row no-gutters>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            text
            tile
            block
            v-on="on"
            @click="logout"
          >
            <v-icon :class="commonStyle">
              {{ mdiExitToApp }}
            </v-icon>
          </v-btn>
        </template>
        <span>Log out</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            text
            tile
            block
            v-on="on"
            @click="toggleSpeed"
          >
            <v-icon :class="altSpeed ? 'accent--text' : commonStyle">
              {{ altSpeed ? mdiSpeedometerSlow : mdiSpeedometer }}
            </v-icon>
          </v-btn>
        </template>
        <span>Alt speeds</span>
      </v-tooltip>
    </v-col>
    <!--<v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            text
            tile
            block
            v-on="on"
            @click="toggleAlarm"
          >
            <v-icon :class="commonStyle">
              {{ alarm ? mdiBell : mdiBellOff }}
            </v-icon>
          </v-btn>
        </template>
        <span>done notification</span>
      </v-tooltip>
    </v-col>-->
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            text
            tile
            block
            v-on="on"
            @click="toggleTheme"
          >
            <v-icon :class="commonStyle">
              {{ theme === 'Light' ? mdiBrightness7 : mdiBrightness4 }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ theme }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import qbit from '@/services/qbit'
import { mapGetters } from 'vuex'
import { mdiBrightness4, mdiSpeedometerSlow, mdiBrightness7, mdiSpeedometer, mdiExitToApp, mdiBell, mdiBellOff } from '@mdi/js'

export default {
  name: 'BottomActions',
  data: () => ({
    //commonStyle: 'primarytext--text',
    commonStyle: 'white--text',
    mdiBrightness4,
    mdiBrightness7,
    mdiSpeedometer,
    mdiExitToApp,
    mdiSpeedometerSlow,
    mdiBell,
    mdiBellOff
  }),
  computed: {
    ...mapGetters(['getTheme', 'getStatus', 'getAlarm']),
    webuiSettings() {
      return this.getWebuiSettings()
    },
    theme() {
      return this.getTheme() ? 'Dark' : 'Light'
    },
    alarm() {
      return this.getAlarm()
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
    /*
    toggleAlarm() {
      this.$store.commit('TOGGLE_ALARM')
    },
    */
    toggleTheme() {
      this.$store.commit('TOGGLE_THEME')
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>