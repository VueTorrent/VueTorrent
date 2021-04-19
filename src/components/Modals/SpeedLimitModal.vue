<template>
  <v-dialog
    v-model="dialog"
    scrollable
    content-class="rounded-form"
    max-width="500px"
    :fullscreen="isPhone"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>Limit {{ mode }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="limit"
                autofocus
                clearable
                label="Speed Limit"
                :prepend-inner-icon="mdiSpeedometer"
                suffix="KB/s"
                @focus="$event.target.select()"
                @keydown.enter="setLimit"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          class="accent white--text elevation-0 px-4"
          @click="setLimit"
        >
          Save
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
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
    },
    isPhone() {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  created() {
    switch (this.mode) {
      case 'download':
        this.limit = this.torrent.dl_limit > 0 ? this.limit = this.torrent.dl_limit / 1024 : '∞'
        break
      case 'upload':
        this.limit = this.torrent.up_limit > 0 ? this.torrent.up_limit / 1024 : '∞'
        break
      default:
        break
    }
  },
  methods: {
    setLimit() {
      switch (this.mode) {
        case 'download':
          qbit.setDownloadLimit([this.hash], this.limit > 0 ? this.limit * 1024 : NaN)
          break
        case 'upload':
          qbit.setUploadLimit([this.hash], this.limit > 0 ? this.limit * 1024 : NaN)
          break
        default:
          break
      }
      this.close()
    },
    close() {
      this.dialog = false
    }
  }
}
</script>
