<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <v-card>
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>Confirm Removal</h2>
        </v-card-title>
        <v-card-text>
          <v-list flat>
            <v-list-item
              v-for="t in torrents"
              :key="t.hash"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-wrap"
                  v-text="t.name"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions id="with-files-check" class="justify-center pa-0 ma-0">
          <v-checkbox
            v-model="withFiles"
            label="Also delete the files on the hard disk"
          />
        </v-card-actions>
        <v-card-actions class="justify-center pb-5 py-0">
          <v-btn
            text
            class="accent--text mt-3"
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="error--text mt-3"
            @click="deleteTorrent()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Modal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
  name: 'ConfirmDeleteModal',
  mixins: [Modal],
  data: () => ({
    withFiles: false
  }),
  computed: {
    ...mapState(['selected_torrents']),
    ...mapGetters(['getTorrents']),
    torrents() {
      return this.getTorrents().filter(t => this.selected_torrents.includes(t.hash))
    }
  },
  beforeDestroy() {
    this.$store.state.selected_torrents = []
  },
  methods: {
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    },
    deleteTorrent() {
      qbit.deleteTorrents(this.selected_torrents, this.withFiles)
      this.close()
    }
  }
}
</script>

<style lang="scss">
#with-files-check .v-messages {
  display: none !important;
}
</style>
