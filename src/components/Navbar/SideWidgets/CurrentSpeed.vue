<script setup lang="ts">
import { useMaindataStore } from '@/stores'
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const maindataStore = useMaindataStore()
</script>

<template>
  <v-card flat color="primary">
    <v-card-title class="px-0">
      {{ t('navbar.side.current_speed.title') }}
    </v-card-title>
    <v-card-text class="px-0">
      <v-sheet color="primary">
        <v-row>
          <v-col class="px-1 mx-1">
            <SpeedCard icon="mdi-arrow-down" color="download" :value="maindataStore.serverState?.dl_info_speed ?? 0" />
          </v-col>
          <v-col class="px-1 mx-1">
            <SpeedCard icon="mdi-arrow-up" color="upload" :value="maindataStore.serverState?.up_info_speed ?? 0" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
