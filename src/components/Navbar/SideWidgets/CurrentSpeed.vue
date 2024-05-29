<script setup lang="ts">
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useMaindataStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const maindataStore = useMaindataStore()
</script>

<template>
  <v-card flat class="inherit-bg">
    <v-card-title class="px-0 text-uppercase text-white ml-1 font-weight-light text-subtitle-2">
      {{ t('navbar.side.current_speed.title') }}
    </v-card-title>
    <v-card-text class="px-0">
      <v-sheet class="mx-2 inherit-bg">
        <v-row class="pt-0">
          <v-col class="px-1 pt-1">
            <SpeedCard icon="mdi-chevron-down" color="download" :value="maindataStore.serverState?.dl_info_speed ?? 0" />
          </v-col>
          <v-col class="px-1 pt-1">
            <SpeedCard icon="mdi-chevron-up" color="upload" :value="maindataStore.serverState?.up_info_speed ?? 0" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
