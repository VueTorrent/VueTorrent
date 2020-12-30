<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :width="dialogWidth"
    :fullscreen="phoneLayout"
  >
    <v-card style="overflow: hidden !important">
      <v-container :style="{ height: phoneLayout ? '100vh' : '' }">
        <v-card-title class="pb-0 justify-center">
          <h2>Rename Torrent</h2>
        </v-card-title>
        <v-card-text>
          <div>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    label="Torrent Name"
                    prepend-icon="insert_drive_file"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
        <div>
          <v-card-actions class="justify-center">
            <v-btn color="success" @click="rename">
              Save
            </v-btn>
          </v-card-actions>
        </div>
      </v-container>
      <v-fab-transition v-if="phoneLayout">
        <v-btn
          color="red"
          dark
          absolute
          bottom
          right
          @click="close"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
  name: 'RenameModal',
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['getTorrent']),
    dialogWidth() {
      return this.phoneLayout ? '100%' : '750px'
    },
    torrent() {
      return this.getTorrent(this.hash)
    }
  },
  created() {
    this.name = this.torrent.name
  },
  methods: {
    rename() {
      qbit.setTorrentName(this.hash, this.name)
      this.close()
    },
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>
