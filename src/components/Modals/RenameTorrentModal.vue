<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="750px"
    :content-class="phoneLayout ? 'rounded-0' : 'rounded-form'"
    :fullscreen="phoneLayout"
    @keydown.enter.prevent="rename"
    @keydown.esc.prevent="close"
    @input="close"
  >
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
              <v-text-field v-model="name" id="torrentNameInput" clearable :label="$t('modals.rename.torrentName')" autofocus :prepend-inner-icon="mdiFile" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
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

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import Modal from '@/mixins/Modal'
import { mdiFile } from '@mdi/js'
import { FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RenameTorrentModal',
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
    ...mapState(['selectMode']),
    ...mapGetters(['getTorrent']),
    torrent() {
      return this.getTorrent(this.hash)
    }
  },
  created() {
    this.name = this.torrent.name
  },
  mounted() {
    const input = document.getElementById('torrentNameInput') as HTMLInputElement
    if (input) {
      input.select()
    }
  },
  methods: {
    async rename() {
      await qbit.setTorrentName(this.hash as string, this.name)
      this.close()
    },
    close() {
      this.dialog = false
      if (!this.selectMode) {
        this.$store.commit('RESET_SELECTED')
      }
    }
  }
})
</script>
