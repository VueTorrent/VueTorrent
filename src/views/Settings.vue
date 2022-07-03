<template>
  <div
    class="px-1 px-sm-5 background noselect"
  >
    <v-row
      no-gutters
      class="grey--text"
      align="center"
      justify="center"
    >
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ $t('settings') | titleCase }}
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <v-card-actions class="justify-end">
          <v-btn
            class="accent"
            small
            elevation="0"
            @click="saveSettings"
          >
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn
            small
            elevation="0"
            @click="close"
          >
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-tabs
        v-model="tab"
        align-with-title
        show-arrows
        background-color="primary"
      >
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
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiClose, mdiContentSave } from '@mdi/js'
import {
  WebUI,
  BitTorrent,
  Downloads,
  VueTorrent,
  TagsAndCategories,
  Connection
} from '@/components/Settings/Tabs'
import { SettingsTab } from '../mixins'

export default {
  name: 'Settings',
  components: { WebUI, BitTorrent, Downloads, VueTorrent, TagsAndCategories, Connection },
  mixins: [SettingsTab],
  data() {
    return {
      tab: null,
      items: [],
      peers: [],
      mdiClose, mdiContentSave
    }
  },
  computed: {
    ...mapGetters(['getSettings']),
    settings() {
      return this.getSettings()
    },
    isPhone() {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_SETTINGS')
  },
  methods: {
    close() {
      this.$router.back()
    }
  }
}
</script>