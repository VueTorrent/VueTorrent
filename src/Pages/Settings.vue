<script setup lang="ts">
import { mdiClose, mdiContentSave } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { definePage } from 'vue-router/auto'
import Advanced from '@/components/Settings/Advanced.vue'
import BitTorrent from '@/components/Settings/BitTorrent.vue'
import Connection from '@/components/Settings/Connection.vue'
import Downloads from '@/components/Settings/Downloads.vue'
import Speed from '@/components/Settings/Speed.vue'
import TagsAndCategories from '@/components/Settings/TagsAndCategories.vue'
import WebUI from '@/components/Settings/WebUI.vue'
import RGeneral from '@/components/Settings/RSS/General.vue'
import RFeeds from '@/components/Settings/RSS/Feeds.vue'
import RRules from '@/components/Settings/RSS/Rules.vue'
import VGeneral from '@/components/Settings/VueTorrent/General.vue'
import VDesktopCard from '@/components/Settings/VueTorrent/DesktopCard.vue'
import VMobileCard from '@/components/Settings/VueTorrent/MobileCard.vue'

definePage({
  path: '/settings',
  name: 'Settings'
})

// composables
const router = useRouter()

// variables
const tab = ref('vuetorrent')
const innerTabV = ref('general')
const innerTabR = ref('general')

// methods
const close = () => router.push({ name: 'Dashboard' })
const saveSettings = () => {}
</script>

<template>
  <div class="px-1 px-sm-5 background noselect">
    <v-row :no-gutters="true" class="grey--text" align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ $t('settings') }}
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <v-card-actions class="justify-end">
          <v-btn color="accent" :icon="mdiContentSave" small elevation="0" @click="saveSettings" />
          <v-btn :icon="mdiClose" small elevation="0" @click="close" />
        </v-card-actions>
      </v-col>
    </v-row>

    <v-card class="ma-0 pa-0">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="vuetorrent">
          {{ $t('modals.settings.tabName.vueTorrent') }}
        </v-tab>
        <v-tab value="downloads">
          {{ $t('modals.settings.tabName.downloads') }}
        </v-tab>
        <v-tab value="connection">
          {{ $t('modals.settings.tabName.connection') }}
        </v-tab>
        <v-tab value="speed">
          {{ $t('modals.settings.tabName.speed') }}
        </v-tab>
        <v-tab value="bittorrent">
          {{ $t('modals.settings.tabName.bittorrent') }}
        </v-tab>
        <v-tab value="rss">
          {{ $t('modals.settings.tabName.rss') }}
        </v-tab>
        <v-tab value="webui">
          {{ $t('modals.settings.tabName.webUI') }}
        </v-tab>
        <v-tab value="tagsAndCategories">
          {{ $t('modals.settings.tabName.tagsAndCategories') }}
        </v-tab>
        <v-tab value="advanced">
          {{ $t('modals.settings.tabName.advanced') }}
        </v-tab>
      </v-tabs>
      <v-card-text class="pa-0">
        <v-window v-model="tab">
          <v-window-item value="vuetorrent">
            <v-card class="ma-0 pa-0">
              <v-tabs v-model="innerTabV" bg-color="secondary">
                <v-tab value="general">
                  {{ $t('modals.settings.vueTorrent.tabName.general') }}
                </v-tab>
                <v-tab value="desktopCard">
                  {{ $t('modals.settings.vueTorrent.tabName.desktopCard') }}
                </v-tab>
                <v-tab value="mobileCard">
                  {{ $t('modals.settings.vueTorrent.tabName.mobileCard') }}
                </v-tab>
              </v-tabs>
              <v-card-text>
                <v-window v-model="innerTabV">
                  <v-window-item value="general">
                    <VGeneral />
                  </v-window-item>
                  <v-window-item value="desktopCard">
                    <VDesktopCard />
                  </v-window-item>
                  <v-window-item value="mobileCard">
                    <VMobileCard />
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="downloads">
            <Downloads />
          </v-window-item>
          <v-window-item value="connection">
            <Connection />
          </v-window-item>
          <v-window-item value="speed">
            <Speed />
          </v-window-item>
          <v-window-item value="bittorrent">
            <BitTorrent />
          </v-window-item>
          <v-window-item value="rss">
            <v-card class="ma-0 pa-0">
              <v-tabs v-model="innerTabR" bg-color="secondary">
                <v-tab value="general">
                  {{ $t('modals.settings.rss.tabName.general') }}
                </v-tab>
                <v-tab value="feeds">
                  {{ $t('modals.settings.rss.tabName.feeds') }}
                </v-tab>
                <v-tab value="rules">
                  {{ $t('modals.settings.rss.tabName.rules') }}
                </v-tab>
              </v-tabs>
              <v-card-text>
                <v-window v-model="innerTabR">
                  <v-window-item value="general">
                    <RGeneral />
                  </v-window-item>
                  <v-window-item value="feeds">
                    <RFeeds />
                  </v-window-item>
                  <v-window-item value="rules">
                    <RRules />
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="webui">
            <WebUI />
          </v-window-item>
          <v-window-item value="tagsAndCategories">
            <TagsAndCategories />
          </v-window-item>
          <v-window-item value="advanced">
            <Advanced />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>
