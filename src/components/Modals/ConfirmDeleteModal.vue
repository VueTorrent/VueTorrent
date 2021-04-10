<template>
  <v-dialog
    v-model="dialog"
    scrollable
    content-class="rounded-form"
    max-width="550px"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4">
          <h3>Confirm Removal</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-list flat>
          <v-list-item
            v-for="t in torrents"
            :key="t.hash"
            else
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
      <v-divider />
      <v-card-actions class="justify-end">
        <v-checkbox
          v-model="withFiles"
          class="ma-0 pa-0"
          label="Also delete the files on the storage"
          hide-details
        />
        <v-spacer />
        <v-btn
          class="white--text elevation-0 px-4"
          :class="withFiles ? 'error' : 'info'"
          @click="deleteTorrent()"
        >
          Delete
        </v-btn>
        <v-btn
          class="grey white--text elevation-0 px-4"
          @click="close()"
        >
          Cancel
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
  data() {
    return {
      hndlDialog: true,
      withFiles: false
    }
  },
  computed: {
    ...mapState(['selected_torrents']),
    ...mapGetters(['getTorrents']),
    torrents() {
      return this.getTorrents().filter(t => this.selected_torrents.includes(t.hash))
    },
    dialog: {
      get: function () {
        return this.hndlDialog
      },
      set: function (e) {
        this.hndlDialog = e
        if (e === false)
          this.deleteModal()
      }
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
      qbit.deleteTorrents(this.selected_torrents, this.withFiles)
      this.close()
    }
  }
}
</script>
