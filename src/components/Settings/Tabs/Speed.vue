<template>
  <v-card flat>
    <!-- TODO -->
    <v-list-item>
      Item 1
    </v-list-item>
    <v-list-item>
      Item 2
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FullScreenModal, SettingsTab } from '@/mixins'

export default defineComponent({
  name: 'Speed',
  mixins: [SettingsTab, FullScreenModal]
})
</script>
