<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
    :fullscreen="phoneLayout"
  >
    <v-card style="overflow: hidden !important">
      <v-container :style="{ height: phoneLayout ? '100vh' : '' }">
        <v-card-title class="pb-0 justify-center">
          <h2 class="text-capitalize">
            Limit {{ mode }}
          </h2>
        </v-card-title>
        <v-card-text>
          <div>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="limit"
                    label="Speed Limit"
                    :prepend-icon="mdiSpeedometer"
                    suffix="KB/s"
                    clearable
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
        <div>
          <v-card-actions class="justify-center">
            <v-btn color="success" @click="setLimit">
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
import { mdiSpeedometer, mdiClose } from '@mdi/js'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
  name: 'SpeedLimitModal',
  mixins: [Modal, FullScreenModal],
  props: {
    mode: String,
    hash: String
  },
  data() {
    return {
      limit: '',
      mdiSpeedometer, mdiClose
    }
  },
  computed: {
    ...mapGetters(['getTorrent']),
    torrent() {
      return this.getTorrent(this.hash)
    }
  },
  created() {
    switch (this.mode) {
      case 'download':
        this.limit = this.torrent.dl_limit / 1024
        break
      case 'upload':
        this.limit = this.torrent.up_limit / 1024
        break
      default:
        break
    }
 
  },
  methods: {
    setLimit() {
      switch (this.mode) {
        case 'download':
          qbit.setDownloadLimit([this.hash], this.limit * 1024 ?? -1)
          break
        case 'upload':
          qbit.setUploadLimit([this.hash], this.limit * 1024 ?? -1)
          break
        default:
          break
      }
      this.close()
    },
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>
