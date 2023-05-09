<template>
  <div class="px-1 px-sm-5 background noselect">
    <v-row no-gutters class="grey--text" align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ $t('settings').toString() | titleCase }}
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <v-card-actions class="justify-end">
          <v-btn class="accent" small elevation="0" @click="saveSettings">
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn small elevation="0" @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-tabs v-model="tab" align-with-title show-arrows background-color="primary">
        <v-tab class="white--text" href="#vuetorrent">
          <h4>{{ $t('modals.settings.tabName.vueTorrent') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#downloads">
          <h4>{{ $t('modals.settings.tabName.downloads') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#connection">
          <h4>{{ $t('modals.settings.tabName.connection') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#speed">
          <h4>{{ $t('modals.settings.tabName.speed') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#bittorrent">
          <h4>{{ $t('modals.settings.tabName.bittorrent') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#rss">
          <h4>{{ $t('modals.settings.tabName.rss') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#webui">
          <h4>{{ $t('modals.settings.tabName.webUI') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#tagsAndCategories">
          <h4>{{ $t('modals.settings.tabName.tagsAndCategories') }}</h4>
        </v-tab>
        <v-tab class="white--text" href="#advanced">
          <h4>{{ $t('modals.settings.tabName.advanced') }}</h4>
        </v-tab>
      </v-tabs>

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
          <v-tab-item eager value="speed">
            <Speed :is-active="tab === 'speed'" />
          </v-tab-item>
          <v-tab-item eager value="bittorrent">
            <BitTorrent :is-active="tab === 'bittorrent'" />
          </v-tab-item>
          <v-tab-item eager value="rss">
            <Rss :is-active="tab === 'rss'" />
          </v-tab-item>
          <v-tab-item eager value="webui">
            <WebUI :is-active="tab === 'webui'" />
          </v-tab-item>
          <v-tab-item eager value="tagsAndCategories">
            <TagsAndCategories :is-active="tab === 'tagsAndCategories'" />
          </v-tab-item>
          <v-tab-item eager value="advanced">
            <Advanced :is-active="tab === 'advanced'" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { mdiClose, mdiContentSave } from '@mdi/js'
import { VueTorrent, Downloads, Connection, Speed, BitTorrent, Rss, WebUI, TagsAndCategories, Advanced } from '../components/Settings/Tabs'
import { SettingsTab } from '../mixins'

export default defineComponent({
  name: 'Settings',
  components: {
    VueTorrent,
    Downloads,
    Connection,
    Speed,
    BitTorrent,
    Rss,
    WebUI,
    TagsAndCategories,
    Advanced
  },
  mixins: [SettingsTab],
  data() {
    return {
      tab: 'vuetorrent',
      items: [],
      peers: [],
      mdiClose,
      mdiContentSave
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
    document.addEventListener('keydown', this.handleKeyboardShortcut)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  watch: {
    tab() {
      window.scrollTo(0, 0)
    }
  },
  methods: {
    close() {
      this.$router.back()
    },
    handleKeyboardShortcut(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.close()
      }
    }
  }
})
</script>
