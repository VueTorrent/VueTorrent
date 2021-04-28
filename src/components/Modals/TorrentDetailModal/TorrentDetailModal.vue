<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :content-class="isFullscreen ? 'rounded-0' : 'rounded-form'"
    :width="dialogWidth"
    :fullscreen="isFullscreen"
  >
    <v-card
      class="rounded-t-formtop noselect"
      :class="isFullscreen ? '' : 'fix-height'"
    >
      <v-card-title class="primary pa-0" @dblclick="hndlFullscreen = !hndlFullscreen">
        <v-toolbar flat dense class="primary white--text">
          <v-toolbar-title class="mt-auto">
            <h3>Torrent Detail</h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            v-touch="{ start: () => touchTick = true }"
            fab
            small
            class="primary primarytext--text elevation-0"
            aria-label="Remove Selected Torrents"
            @click="openMenu()"
            @dblclick.stop
          >
            <v-icon>
              {{ mdiDotsHorizontalCircle }}
            </v-icon>
          </v-btn>
          <v-btn
            v-if="!isPhone"
            fab
            small
            class="primary white--text elevation-0"
            @click="hndlFullscreen = !hndlFullscreen"
          >
            <v-icon>{{ isFullscreen ? mdiWindowRestore : mdiWindowMaximize }}</v-icon>
          </v-btn>
          <v-btn
            fab
            small
            class="primary white--text elevation-0"
            @click="close"
          >
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
          <template #extension>
            <v-tabs v-model="tab" align-with-title show-arrows>
              <v-tabs-slider color="white" />
              <v-tab class="white--text" href="#info">
                <h4>Info</h4>
              </v-tab>
              <v-tab class="white--text" href="#trackers">
                <h4>Trackers</h4>
              </v-tab>
              <v-tab class="white--text" href="#peers">
                <h4>Peers</h4>
              </v-tab>
              <v-tab class="white--text" href="#content">
                <h4>Content</h4>
              </v-tab>
              <v-tab class="white--text" href="#tagsAndCategories">
                <h4>Tags & Categories</h4>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-tabs-items v-model="tab" touchless>
          <v-tab-item eager value="info">
            <info :is-active="tab === 'info'" :hash="hash" />
          </v-tab-item>
          <v-tab-item eager value="trackers">
            <Trackers :is-active="tab === 'trackers'" :hash="hash" />
          </v-tab-item>
          <v-tab-item eager value="peers">
            <Peers :is-active="tab === 'peers'" :hash="hash" />
          </v-tab-item>
          <v-tab-item eager value="content">
            <Content :is-active="tab === 'content'" :hash="hash" />
          </v-tab-item>
          <v-tab-item eager value="tagsAndCategories">
            <TagsAndCategories :is-active="tab === 'tagsAndCategories'" :hash="hash" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { Modal, FullScreenModal } from '@/mixins'
import { Content, Info, Peers, Trackers, TagsAndCategories } from './Tabs'
import { mdiClose, mdiWindowMaximize, mdiWindowRestore, mdiDotsHorizontalCircle } from '@mdi/js'

export default {
  name: 'TorrentDetailModal',
  components: { Content, Info, Peers, Trackers, TagsAndCategories },
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      hndlFullscreen: false,
      tab: null,
      items: [{ tab: 'Info' }, { tab: 'Content' }],
      peers: [],
      mdiClose, mdiWindowMaximize, mdiWindowRestore, mdiDotsHorizontalCircle
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
      if (this.hndlFullscreen)
        return true
      else if (this.isPhone)
        return true

      return false
    }
  },
  methods: {
    close() {
      this.dialog = false
    },
    openMenu(e) {
      const dialogRect = this.$children[0].$refs.dialog.getBoundingClientRect()
      const
        x = dialogRect.x + dialogRect.width - 140,
        y = dialogRect.y + 40
      const firstSelected = document.getElementsByClassName('v-list-item__content')[0]
      if (this.touchTick) {
        this.touchTick = false
        const touchObj = new Touch({
          identifier: Date.now(),
          target: firstSelected,
          clientX: x,
          clientY: y
        })
        firstSelected.dispatchEvent(new TouchEvent('touchstart', {
          cancelable: true,
          bubbles: true,
          touches: [touchObj],
          targetTouches: [],
          changedTouches: [touchObj]
        }))
        firstSelected.dispatchEvent(new TouchEvent('touchstart', {
          cancelable: true,
          bubbles: true,
          touches: [touchObj, touchObj],
          targetTouches: [],
          changedTouches: [touchObj]
        }))
      } else {
        firstSelected.dispatchEvent(new MouseEvent('contextmenu', { 
          bubbles: true,
          clientX: x,
          clientY: y
        }))
      }
    }
  }
}
</script>

<style scoped>
.fix-height .v-card__text {
  height: 600px;
}
</style>