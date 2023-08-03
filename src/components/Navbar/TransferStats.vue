<script setup lang="ts">
import {reactive} from 'vue'
import StorageCard from '@/components/Core/StorageCard.vue'
import StringCard from '@/components/Core/StringCard.vue'

const stats = reactive({
  download: 0,
  upload: 0,
  ratio: 1.00
})
</script>

<template>
  <v-card elevation="0">
    <v-card-title>Global Stats</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <StorageCard :value="stats.download" color="download" icon="mdi-arrow-down" />
        </v-list-item>
        <v-list-item>
          <StorageCard :value="stats.upload" color="upload" icon="mdi-arrow-up" />
        </v-list-item>
        <v-list-item>
          <StringCard label="Ratio" :value="stats.ratio" color="accent" />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>