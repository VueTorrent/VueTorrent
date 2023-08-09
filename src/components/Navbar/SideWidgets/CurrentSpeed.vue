<script setup lang="ts">
import {ref} from 'vue'
import SpeedCard from '@/components/Core/SpeedCard.vue'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()

const downloadSpeed = ref(10_000)
const uploadSpeed = ref(0)
</script>

<template>
  <v-card flat>
    <v-card-title>
      {{ t('navbar.current_speed.title') }}
    </v-card-title>
    <v-card-text class="px-0">
      <v-sheet>
        <div class="d-flex justify-space-around">
          <SpeedCard icon="mdi-arrow-down" color="download" :value="downloadSpeed" />
          <SpeedCard icon="mdi-arrow-up" color="upload" :value="uploadSpeed" />
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>