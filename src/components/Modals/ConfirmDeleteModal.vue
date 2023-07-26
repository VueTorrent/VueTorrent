<template>
  <v-dialog v-model="dialog" scrollable content-class="rounded-form" max-width="600px" @input="close">
    <v-card class="pa-2">
      <v-card-title class="pa-0">
        <v-toolbar-title class="mx-4 mt-2">
          <h3>{{ $t('confirm') | titleCase }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text class="px-6p py-2 mb-2">
        <v-list flat class="mb-4">
          <v-list-item v-for="t in torrents" :key="t.hash" else>
            <v-list-item-content>
              <v-list-item-title class="text-wrap" v-text="t.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-checkbox v-model="settings.deleteWithFiles" class="ma-0 pa-0" :label="$t('modals.delete.check')" hide-details />
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn class="white--text elevation-0 px-4" :class="settings.deleteWithFiles ? 'error' : 'info'" @click="deleteTorrent()">
          {{ $t('delete') }}
        </v-btn>
        <v-spacer />
        <v-btn class="grey white--text elevation-0 px-4" @click="close()">
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import qbit from '@/services/qbit'
import { FullScreenModal, Modal } from '@/mixins'
import { Torrent } from '@/models'
import WebUISettings from '@/types/vuetorrent/WebUISettings'

export default defineComponent({
  name: 'ConfirmDeleteModal',
  props: {
    hashes: Array<string>
  },
  mixins: [Modal, FullScreenModal],
  computed: {
    ...mapState(['selectMode']),
    ...mapGetters(['getTorrents', 'getWebuiSettings']),
    selection(): string[] {
      return this.hashes ?? []
    },
    torrents(): Torrent[] {
      return (this.getTorrents() as Torrent[]).filter(t => this.selection.includes(t.hash))
    },
    settings(): WebUISettings {
      return this.getWebuiSettings()
    }
  },
  methods: {
    close() {
      this.dialog = false
      if (!this.selectMode) {
        this.$store.commit('RESET_SELECTED')
      }
    },
    async deleteTorrent() {
      await qbit.deleteTorrents(this.selection, this.settings.deleteWithFiles)
      this.$store.commit('RESET_SELECTED')
      this.close()

      if (this.$route.name === 'torrentDetail') {
        this.$router.push({ name: 'dashboard' })
      }
    }
  }
})
</script>
