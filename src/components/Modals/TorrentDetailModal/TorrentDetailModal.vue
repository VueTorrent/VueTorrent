<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :width="dialogWidth"
    :fullscreen="isFullscreen"
  >
    <v-card
      v-if="torrent"
      style="min-height: 400px; overflow: hidden !important"
    >
      <div
        :class="`pa-0 project ${torrent.state}`"
        :style="{ height: phoneLayout ? '100vh' : '' }"
      >
        <v-card-title class="pb-0 justify-center primary" @dblclick="hndlFullscreen = !hndlFullscreen">
          <h2 class="white--text">
            Torrent Detail
          </h2>
        </v-card-title>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
          fixed-tabs
        >
          <v-tab href="#info">
            Info
          </v-tab>
          <v-tab href="#trackers">
            Trackers
          </v-tab>
          <v-tab href="#peers">
            Peers
          </v-tab>
          <v-tab href="#content">
            Content
          </v-tab>
          <v-tab href="#tagsAndCategories">
            Tags & Categories
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" touchless>
          <v-tab-item value="info">
            <info :is-active="tab === 'info'" :hash="hash" />
          </v-tab-item>
          <v-tab-item value="trackers">
            <Trackers
              :is-active="tab === 'trackers'"
              :hash="hash"
            />
          </v-tab-item>
          <v-tab-item value="peers">
            <Peers :is-active="tab === 'peers'" :hash="hash" />
          </v-tab-item>
          <v-tab-item value="content">
            <Content :is-active="tab === 'content'" :hash="hash" />
          </v-tab-item>
          <v-tab-item value="tagsAndCategories">
            <TagsAndCategories
              :is-active="tab === 'tagsAndCategories'"
              :hash="hash"
            />
          </v-tab-item>
        </v-tabs-items>
      </div>
      <v-btn
        v-if="!isPhone"
        absolute
        fab
        small
        class="primary white--text elevation-0"
        style="top:9px; right:50px;"
        @click="fullscreen = !fullscreen"
      >
        <v-icon>{{ isFullscreen ? mdiWindowRestore : mdiWindowMaximize }}</v-icon>
      </v-btn>
      <v-btn
        absolute
        fab
        small
        class="primary white--text elevation-0"
        style="top:9px; right:9px;"
        @click="close"
      >
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { Modal, FullScreenModal } from '@/mixins'
import { Content, Info, Peers, Trackers, TagsAndCategories } from './Tabs'
import { mdiClose, mdiWindowMaximize, mdiWindowRestore } from '@mdi/js'

export default {
  name: 'TorrentDetailModal',
  components: { Content, Info, Peers, Trackers, TagsAndCategories },
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      fullscreen: false,
      tab: null,
      items: [{ tab: 'Info' }, { tab: 'Content' }],
      peers: [],
      mdiClose, mdiWindowMaximize, mdiWindowRestore
    }
  },
  computed: {
    ...mapGetters(['getTorrent']),
    torrent() {
      return this.getTorrent(this.hash)
    },
    isPhone() {
      return this.$vuetify.breakpoint.xsOnly
    },
    isFullscreen() {
      return this.isPhone || this.fullscreen
    }
  },
  methods: {
    close() {
      this.deleteModal()
    }
  }
}
</script>
