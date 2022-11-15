<template>
  <v-dialog v-model="dialog" scrollable content-class="rounded-form" max-width="600px">
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

<script>
import { mapState, mapGetters } from 'vuex'
import Modal from '@/mixins/Modal'
import qbit from '@/services/qbit'
export default {
  name: 'ConfirmDeleteModal',
  mixins: [Modal],
  computed: {
    ...mapState(['selected_torrents']),
    ...mapGetters(['getTorrents', 'getWebuiSettings']),
    torrents() {
      return this.getTorrents().filter(t => this.selected_torrents.includes(t.hash))
    },
    settings() {
      return this.getWebuiSettings()
    }
  },
  beforeDestroy() {
    this.$store.state.selected_torrents = []
  },
  methods: {
    close() {
      this.dialog = false
    },
    deleteTorrent() {
      qbit.deleteTorrents(this.selected_torrents, this.settings.deleteWithFiles)
      this.close()
    }
  }
}
</script>
