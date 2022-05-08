<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
    scrollable
    :content-class="isPhone ? 'rounded-0' : 'rounded-form'"
    :width="dialogWidth"
    :fullscreen="isPhone"
  >
    <v-card
      class="rounded-t-formtop noselect"
      :class="isPhone ? '' : 'fix-height'"
    >
      <v-card-title class="primary pa-0">
        <v-toolbar flat dense class="primary white--text">
          <v-toolbar-title class="mt-auto white--text">
            <h3>{{ $t('settings') | titleCase }}</h3>
          </v-toolbar-title>
          <template #extension>
            <v-tabs v-model="tab" align-with-title show-arrows>
              <v-tabs-slider color="white" />
              <v-tab class="white--text" href="#vuetorrent">
                <h4>{{ $t('modals.settings.tabName.VueTorrent') }}</h4>
              </v-tab>
              <v-tab class="white--text" href="#downloads">
                <h4>{{ $t('modals.settings.tabName.downloads') }}</h4>
              </v-tab>
              <v-tab class="white--text" href="#connection">
                <h4>{{ $t('modals.settings.tabName.connection') }}</h4>
              </v-tab>
              <v-tab class="white--text" href="#bittorrent">
                <h4>{{ $t('modals.settings.tabName.bittorrent') }}</h4>
              </v-tab>
              <v-tab class="white--text" href="#webui">
                <h4>{{ $t('modals.settings.tabName.webUI') }}</h4>
              </v-tab>
              <v-tab class="white--text" href="#tagsAndCategories">
                <h4>{{ $t('modals.settings.tabName.tagsAndCategories') }}</h4>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card-title>
      <!--<v-divider />-->
      <v-card-text class="pa-0">
        <v-tabs-items v-model="tab" touchless>
          <v-tab-item eager value="vuetorrent">
            <VueTorrent :is-active="tab === 'vuetorrent'" />
          </v-tab-item>
          <v-tab-item eager value="downloads">
            <Downloads :is-active="tab === 'downloads'" />
          </v-tab-item>
          <v-tab-item eager value="connection">
            <Connection :is-active="tab === 'connection'" />
          </v-tab-item>
          <v-tab-item eager value="bittorrent">
            <BitTorrent :is-active="tab === 'bittorrent'" />
          </v-tab-item>
          <v-tab-item eager value="webui">
            <WebUI :is-active="tab === 'webui'" />
          </v-tab-item>
          <v-tab-item eager value="tagsAndCategories">
            <TagsAndCategories :is-active="tab === 'tagsAndCategories'" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <!--  class="justify-center" -->
        <v-btn
          class="accent white--text elevation-0 px-4"
          @click="saveSettings"
        >
          {{ $t('save') }}
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="close"
        >
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Modal, FullScreenModal, SettingsTab } from '@/mixins'
import { mdiClose } from '@mdi/js'
import {
  WebUI,
  BitTorrent,
  Downloads,
  VueTorrent,
  TagsAndCategories,
  Connection
} from './Tabs'

export default {
  name: 'SettingsModal',
  components: { WebUI, BitTorrent, Downloads, VueTorrent, TagsAndCategories, Connection },
  mixins: [Modal, FullScreenModal, SettingsTab],
  data() {
    return {
      tab: null,
      items: [],
      peers: [],
      mdiClose
    }
  },
  computed: {
    isPhone() {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  created() {
    this.$store.commit('FETCH_SETTINGS')
  },
  methods: {
    close() {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.fix-height .v-card__text {
  height: 400px;
}
</style>
