<template>
  <v-row no-gutters>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn text tile block v-on="on" @click="logout">
            <v-icon :class="commonStyle">
              {{ mdiExitToApp }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('logout') }}</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn text tile block v-on="on" @click="toggleSpeed">
            <v-icon :class="altSpeed ? 'accent--text' : commonStyle">
              {{ altSpeed ? mdiSpeedometerSlow : mdiSpeedometer }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('navbar.action.altSpeed') }}</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <connection-status :status="connectionStatus" />
    </v-col>
    <v-col>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn text tile block v-on="on" @click="toggleTheme">
            <v-icon :class="commonStyle">
              {{ theme === 'Light' ? mdiBrightness7 : mdiBrightness4 }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ theme }}</span>
      </v-tooltip>
    </v-col>
    <v-col v-if="webuiSettings.showShutdownButton">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn text tile block v-on="on" @click="createModal('ConfirmShutdownModal')">
            <v-icon :class="commonStyle">
              {{ mdiPower }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t('shutdownApp') }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import qbit from '@/services/qbit'
import { mapGetters, mapState } from 'vuex'
import { mdiBrightness4, mdiSpeedometerSlow, mdiBrightness7, mdiSpeedometer, mdiPower, mdiExitToApp, mdiBell, mdiBellOff } from '@mdi/js'
import ConnectionStatus from './ConnectionStatus.vue'
import { General } from '@/mixins'

export default {
  name: 'BottomActions',
  components: {
    ConnectionStatus
  },
  mixins: [General],
  data: () => ({
    commonStyle: 'white--text',
    mdiBrightness4,
    mdiBrightness7,
    mdiSpeedometer,
    mdiPower,
    mdiExitToApp,
    mdiSpeedometerSlow,
    mdiBell,
    mdiBellOff
  }),
  computed: {
    ...mapState(['webuiSettings']),
    ...mapGetters(['isDarkMode', 'getStatus']),
    theme() {
      return this.isDarkMode() ? this.$t('navbar.action.dark') : this.$t('navbar.action.light')
    },
    status() {
      return this.getStatus()
    },
    altSpeed() {
      if (this.status && this.status.altSpeed) return this.status.altSpeed

      return null
    },
    connectionStatus() {
      return this.status.status
    }
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push({ name: 'login' })
    },
    toggleSpeed() {
      qbit.toggleSpeedLimitsMode()
    },
    toggleTheme() {
      this.webuiSettings.darkTheme = !this.webuiSettings.darkTheme
      this.$vuetify.theme.dark = this.webuiSettings.darkTheme
    }
  }
}
</script>
