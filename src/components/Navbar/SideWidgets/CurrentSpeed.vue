<script setup lang="ts">
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { serverState } = storeToRefs(useMaindataStore())
const { displayGraphLimits } = storeToRefs(useVueTorrentStore())
</script>

<template>
  <v-card flat class="inherit-bg">
    <v-card-title class="px-0 text-uppercase text-white ml-1 font-weight-light text-subtitle-2">
      {{ t('navbar.side.current_speed.title') }}
    </v-card-title>
    <v-card-text class="px-0">
      <v-sheet class="mx-2 inherit-bg">
        <v-row class="pt-0">
          <v-col cols="6" class="px-1 pt-1">
            <SpeedCard icon="mdi-arrow-down" color="download" :value="serverState?.dl_info_speed ?? 0" />
          </v-col>
          <v-col cols="6" class="px-1 pt-1">
            <SpeedCard icon="mdi-arrow-up" color="upload" :value="serverState?.up_info_speed ?? 0" />
          </v-col>

          <template v-if="displayGraphLimits && (serverState?.dl_rate_limit || serverState?.up_rate_limit)">
            <v-col cols="6" v-if="serverState.dl_rate_limit" class="px-1 pt-0">
              <SpeedCard icon="mdi-arrow-collapse-down" color="download" :value="serverState.dl_rate_limit" />
            </v-col>
            <v-col cols="6" v-else />

            <v-col cols="6" v-if="serverState.up_rate_limit" class="px-1 pt-0">
              <SpeedCard icon="mdi-arrow-collapse-up" color="upload" :value="serverState.up_rate_limit" />
            </v-col>
            <v-col cols="6" v-else />
          </template>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
