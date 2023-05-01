<script setup lang="ts">
import { mdiClose, mdiContentSave } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { definePage } from 'vue-router/auto'

definePage({
  path: '/settings',
  name: 'Settings'
})

// composables
const router = useRouter()

// variabls
const tab = ref('vuetorrent')

// methods
const close = () => router.push({ name: 'Dashboard' })
const saveSettings = () => {}
</script>

<template>
  <div class="px-1 px-sm-5 background noselect">
    <VRow>
      <VCol>
        <h1 style="font-size: 1.6em !important">
          {{ $t('settings') }}
        </h1>
      </VCol>
      <VCol class="align-center justify-center">
        <v-card-actions class="justify-end">
          <VBtn color="accent" :icon="mdiContentSave" small elevation="0" @click="saveSettings" />
          <VBtn :icon="mdiClose" small elevation="0" @click="close" />
        </v-card-actions>
      </VCol>
    </VRow>

    <VCard class="ma-0 pa-0">
      <v-tabs v-model="tab" background-color="primary">
        <v-tab value="vuetorrent">
          <h4>{{ $t('modals.settings.tabName.VueTorrent') }}</h4>
        </v-tab>
        <v-tab value="downloads">
          <h4>{{ $t('modals.settings.tabName.downloads') }}</h4>
        </v-tab>
        <v-tab value="connection">
          <h4>{{ $t('modals.settings.tabName.connection') }}</h4>
        </v-tab>
        <v-tab value="bittorrent">
          <h4>{{ $t('modals.settings.tabName.bittorrent') }}</h4>
        </v-tab>
        <v-tab value="rss">
          <h4>{{ $t('modals.settings.tabName.rss') }}</h4>
        </v-tab>
        <v-tab value="webui">
          <h4>{{ $t('modals.settings.tabName.webUI') }}</h4>
        </v-tab>
        <v-tab value="tagsAndCategories">
          <h4>{{ $t('modals.settings.tabName.tagsAndCategories') }}</h4>
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="vuetorrent"> vuetorrent </v-window-item>
        </v-window>
        <v-window v-model="tab">
          <v-window-item value="downloads"> downloads </v-window-item>
        </v-window>
      </v-card-text>
    </VCard>
  </div>
</template>
