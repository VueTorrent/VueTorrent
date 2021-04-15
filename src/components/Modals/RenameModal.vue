<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="750px"
    :content-class="isPhone ? 'rounded-0' : 'rounded-form'"
    :fullscreen="isPhone"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>Rename</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-textarea
                v-model="name"
                rows="1"
                auto-grow
                clearable
                label="Torrent Name"
                :prepend-inner-icon="mdiFile"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          class="accent white--text elevation-0 px-4"
          @click="rename"
        >
          save
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="close"
        >
          cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/mixins/Modal'
import { mdiFile } from '@mdi/js'
import { FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
  name: 'RenameModal',
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      hndlDialog: true,
      name: '',
      mdiFile
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
  created() {
    this.name = this.torrent.name
  },
  methods: {
    rename() {
      qbit.setTorrentName(this.hash, this.name)
      this.close()
    },
    close() {
      this.dialog = false
      //this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>
