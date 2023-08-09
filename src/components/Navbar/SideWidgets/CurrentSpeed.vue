<script setup lang="ts">
import {ref} from 'vue'
import SpeedCard from '@/components/Core/SpeedCard.vue'

const downloadSpeed = ref(0)
const uploadSpeed = ref(0)
</script>

<template>
  <v-card elevation="0">
    <v-card-title>Current Speed</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <SpeedCard icon="mdi-arrow-down" color="download" :value="downloadSpeed" />
        </v-col>
        <v-col cols="6">
          <SpeedCard icon="mdi-arrow-up" color="upload" :value="uploadSpeed" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>