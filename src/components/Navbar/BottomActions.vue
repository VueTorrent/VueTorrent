<script setup lang="ts">
import { computed } from 'vue'
import {
  mdiBrightness4,
  mdiBrightness7,
  mdiExitToApp,
  mdiSpeedometer,
  mdiSpeedometerSlow
} from '@mdi/js'
import { useAuthStore } from '@/stores/auth'
import ConnectionStatus from './ConnectionStatus.vue'

// actions
import { toggleSpeedLimitsMode } from '@/composables/api/actions'

// composables
import { useMainData, useSessionInfo } from '@/composables/api/info'
import { useWebUISettingsStore } from '@/stores/settings'
import { useTheme } from 'vuetify'
const authStore = useAuthStore()
const sessionInfo = useSessionInfo()
const mainInfo = useMainData()
const settings = useWebUISettingsStore()

const altSpeed = computed(() => {
  return mainInfo.data.value?.server_state?.use_alt_speed_limits
})

const darkThemeEnabled = computed(() => {
  return settings.webUISettings.darkTheme
})

const connectionStatus = computed(() => {
  return sessionInfo.data.value?.connection_status || 'unknown'
})

const theme = useTheme()
const toggleTheme = () => {
  settings.webUISettings.darkTheme = !settings.webUISettings.darkTheme
  theme.global.name.value = settings.webUISettings.darkTheme ? 'dark' : 'light'
}
</script>

<template>
  <VRow noGutters>
    <VCol>
      <VTooltip>
        <template #activator="{ props }">
          <VBtn :icon="mdiExitToApp" flat block v-bind="props" @click="authStore.logout()" />
        </template>
        <span>{{ $t('logout') }}</span>
      </VTooltip>
    </VCol>
    <VCol>
      <VTooltip>
        <template #activator="{ props }">
          <VBtn
            :icon="altSpeed ? mdiSpeedometerSlow : mdiSpeedometer"
            flat
            block
            v-bind="props"
            :class="altSpeed ? 'text-accent' : ''"
            @click="toggleSpeedLimitsMode()"
          />
        </template>
        <span>{{ $t('navbar.action.altSpeed') }}</span>
      </VTooltip>
    </VCol>
    <VCol>
      <ConnectionStatus :status="connectionStatus" />
    </VCol>
    <VCol>
      <VTooltip>
        <template #activator="{ props }">
          <VBtn
            :icon="darkThemeEnabled ? mdiBrightness4 : mdiBrightness7"
            flat
            block
            v-bind="props"
            @click="toggleTheme()"
          />
        </template>
        <span>{{ darkThemeEnabled ? 'Dark' : 'Light' }}</span>
      </VTooltip>
    </VCol>
  </VRow>
</template>
