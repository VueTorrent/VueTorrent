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
        <v-card-actions class="justify-center pb-5">
          <v-btn
            text
            class="accent white--text mt-3"
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="error white--text mt-3"
            @click="deleteWithoutFiles()"
          >
            Delete
          </v-btn>
          <v-btn
            text
            class="error white--text mt-3"
            @click="deleteWithFiles()"
          >
            Delete with files
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
  computed: {
    ...mapState(['selected_torrents']),
    ...mapGetters(['getTorrents']),
    torrents() {
      return this.getTorrents().filter(t => this.selected_torrents.includes(t.hash))
    }
  },
  methods: {
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    },
    deleteWithoutFiles() {
      qbit.deleteTorrents(this.selected_torrents, false)
      this.close()
    },
    deleteWithFiles() {
      qbit.deleteTorrents(this.selected_torrents, true)
      this.close()
    }
  }
}
</script>
