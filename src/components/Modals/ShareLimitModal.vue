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
          <h3>Limit Ratio</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text class="px-5 py-2">
        <v-slider
          v-model="limit"
          class="mt-6"
          :prepend-icon="mdiPercent"
          thumb-label="always"
          thumb-size="24"
          :min="-2"
          :max="25"
        >
          <template #thumb-label>
            {{ limit | limitToValue }}
          </template>
        </v-slider>
        <v-slider
          v-model="timeLimit"
          class="mt-6"
          :prepend-icon="mdiClockTimeEight"
          thumb-label="always"
          thumb-size="24"
          :min="-2"
          :max="1000"
          step="25"
        >
          <template #thumb-label>
            {{ timeLimit | limitToValue }}
          </template>
        </v-slider>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn class="accent white--text elevation-0 px-4" @click="save">
          Save
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="close">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiPercent, mdiClose, mdiClockTimeEight } from '@mdi/js'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
  name: 'ShareLimitModal',
  mixins: [Modal, FullScreenModal],
  props: {
    mode: String,
    hash: String
  },
  data() {
    return {
      mdiPercent, mdiClockTimeEight, mdiClose,
      limit: '',
      timeLimit: ''
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
    this.limit = this.torrent.ratio_limit
    this.timeLimit = this.torrent.ratio_time_limit
  },
  methods: {
    save() {
      qbit.setShareLimit([this.hash], this.limit, this.timeLimit)
      this.close()
    },
    close() {
      this.dialog = false
    }
  }
}
</script>