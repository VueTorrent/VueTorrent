<template>
  <v-row class="align-center justify-center">
    <v-col cols="4">
      <v-text-field v-model="folder.path" />
    </v-col>
    <v-col cols="4">
      <v-select v-model="folder.type" height="1" flat dense hide-details outlined :items="monitorTypeOptions" />
    </v-col>
    <v-col cols="4">
      <v-text-field v-model="folder.savePath" :disabled="folder.type !== ScanDirsEnum.OTHER" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {ScanDirsEnum} from "@/enums/qbit/AppPreferences";

export default defineComponent({
  name: "MonitoredFolderRow",
  computed: {
    ScanDirsEnum() {
      return ScanDirsEnum
    }
  },
  props: ['folder'],
  data() {
    return {
      monitorTypeOptions: [
        { text: 'Monitored folder', value: 0 },
        { text: 'Default save location', value: 1 },
        { text: 'Other', value: -1 }
      ]
    }
  }
})
</script>
