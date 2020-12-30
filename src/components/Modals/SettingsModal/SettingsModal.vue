<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :width="dialogWidth"
    :fullscreen="phoneLayout"
  >
    <v-card style="min-height: 400px; overflow: hidden !important">
      <div :style="{ height: phoneLayout ? '100vh' : '' }">
        <v-card-title class="pb-0 justify-center primary">
          <h2 class="white--text">
            Settings
          </h2>
        </v-card-title>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
          fixed-tabs
        >
          <v-tab href="#downloads">
            Downloads
          </v-tab>
          <v-tab href="#bittorrent">
            BitTorrent
          </v-tab>
          <v-tab href="#webui">
            WebUI
          </v-tab>
          <v-tab href="#vuetorrent">
            VueTorrent
          </v-tab>
          <v-tab href="#tagsAndCategories">
            Tags & Categories
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" :touch="updateTab(tab)">
          <v-tab-item value="downloads">
            <Downloads :is-active="tab === 'downloads'" />
          </v-tab-item>
          <v-tab-item value="bittorrent">
            <BitTorrent :is-active="tab === 'bittorrent'" />
          </v-tab-item>
          <v-tab-item value="webui">
            <WebUI :is-active="tab === 'webui'" />
          </v-tab-item>

          <v-tab-item value="vuetorrent">
            <VueTorrent :is-active="tab === 'vuetorrent'" />
          </v-tab-item>
          <v-tab-item value="tagsAndCategories">
            <TagsAndCategories
              :is-active="tab === 'tagsAndCategories'"
            />
          </v-tab-item>
        </v-tabs-items>
      </div>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="success" @click="saveSettings">
          Save
        </v-btn>
        <v-fab-transition v-if="phoneLayout">
          <v-btn
            color="red"
            dark
            absolute
            bottom
            right
            @click="close"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Modal, FullScreenModal, SettingsTab } from '@/mixins'
import {
  WebUI,
  BitTorrent,
  Downloads,
  VueTorrent,
  TagsAndCategories
} from './Tabs'

export default {
  name: 'SettingsModal',
  components: { WebUI, BitTorrent, Downloads, VueTorrent, TagsAndCategories },
  mixins: [Modal, FullScreenModal, SettingsTab],
  data() {
    return {
      tab: null,
      items: [],
      peers: []
    }
  },
  created() {
    this.$store.commit('FETCH_SETTINGS')
  },
  methods: {
    close() {
      this.deleteModal()
    }
  }
}
</script>
