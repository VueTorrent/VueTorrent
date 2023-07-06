<template>
  <v-dialog v-model="dialog" scrollable max-width="750px" :content-class="phoneLayout ? 'rounded-0' : 'rounded-form'" :fullscreen="phoneLayout" @keydown.enter.prevent="rename">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.rename.title') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="caption">{{ $t('modals.rename.oldPath') }}</v-list-item-title>
            <v-list-item-subtitle>{{ oldName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="newName" :label="$t('modals.rename.newPath')" autofocus :prepend-inner-icon="mdiFile" />
        </v-list-item>
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
import Modal from '@/mixins/Modal'
import { mdiFile } from '@mdi/js'
import { FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RenameTorrentFileModal',
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String,
    isFolder: Boolean,
    oldName: String
  },
  data() {
    return {
      newName: '',
      mdiFile
    }
  },
  computed: {
    torrentHash() {
      return this.hash as string
    }
  },
  created() {
    this.newName = this.oldName as string
  },
  methods: {
    async rename() {
      let result: Promise<void>
      if (this.isFolder) {
        result = qbit.renameFolder(this.torrentHash, this.oldName as string, this.newName)
      } else {
        result = qbit.renameFile(this.torrentHash, this.oldName as string, this.newName)
      }

      result.then(
          () => this.close(),
          () => this.$toast.error(this.$t('modals.rename.errorConflict'))
      )
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
