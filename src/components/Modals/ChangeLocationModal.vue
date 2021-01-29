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
          <h2>Change Location</h2>
        </v-card-title>
        <v-card-text>
          <div>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="torrent.name"
                    label="Torrent Name"
                    :prepend-icon="mdiFile"
                    readonly
                  />
                  <v-text-field
                    v-model="newPath"
                    label="Directory"
                    :prepend-icon="mdiFolder"
                    @keydown.enter="setLocation"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
        <div>
          <v-card-actions class="justify-center">
            <v-btn color="success" @click="setLocation">
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
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiFile, mdiFolder, mdiClose } from '@mdi/js'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'

export default {
  name: 'ChangeLocationModal',
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      newPath: '',
      mdiFile, mdiFolder, mdiClose
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
    this.newPath = this.torrent.savePath
  },
  methods: {
    setLocation() {
      qbit.setTorrentLocation([this.hash], this.newPath)
      this.close()
    },
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>
