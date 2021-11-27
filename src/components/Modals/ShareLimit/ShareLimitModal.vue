<template>
  <v-dialog
    v-model="dialog"
    scrollable
    content-class="rounded-form"
    max-width="500px"
    :fullscreen="isPhone"
  >
    <v-card class="px-2">
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>Limit Ratio</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text class="px-4 py-2">
        <ShareLimitInput ref="ratio" title="Ratio" :initial-limit="torrent.ratio_limit" />
        <ShareLimitInput
          ref="time"
          title="Duration"
          :initial-limit="torrent.ratio_time_limit"
          class="mt-2"
        />
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
import ShareLimitInput from './ShareLimitInput.vue'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
export default {
  name: 'ShareLimitModal',
  components: { ShareLimitInput },
  mixins: [Modal, FullScreenModal],
  props: {
    mode: String,
    hash: String
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
  methods: {
    save() {
      qbit.setShareLimit([this.hash],
        this.$refs.ratio.export(),
        this.$refs.time.export()
      )
      this.close()
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
// Reversed input variant
::v-deep .v-input--reverse .v-input__slot {
  @import "../../../styles/styles";
  @include reverse-switch;
}
</style>
