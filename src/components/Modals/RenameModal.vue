<template>
  <v-dialog v-model="dialog" scrollable max-width="750px" :content-class="isPhone ? 'rounded-0' : 'rounded-form'" :fullscreen="isPhone">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.rename.title') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="name" clearable :label="$t('modals.rename.torrentName')" :prepend-inner-icon="mdiFile" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn v-if="enableUrlDecode" class="info white--text elevation-0 px-4" @click="urlDecode"> URL DECODE </v-btn>
        <v-spacer />
        <v-btn class="accent white--text elevation-0 px-4" @click="rename">
          {{ $t('save') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="close">
          {{ $t('cancel') }}
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
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardShortcut)
  },
  created() {
    this.name = this.torrent.name
    this.isUrl()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  methods: {
    urlDecode() {
      this.name = decodeURIComponent(this.name)
      this.isUrl()
    },
    isUrl() {
      this.enableUrlDecode = false
      if (this.name.indexOf(' ') === -1) {
        const exp = /\+|%/
        if (exp.test(this.name)) this.enableUrlDecode = true
      }
    },
    async rename() {
      await qbit.setTorrentName(this.hash, this.name)
      this.close()
    },
    close() {
      this.dialog = false
      //this.$store.commit('DELETE_MODAL', this.guid)
    },
    handleKeyboardShortcut(e) {
      if (e.key === 'Escape') {
        this.close()
      } else if (e.keyCode === 13) {
        this.rename()
      }
    }
  }
}
</script>
