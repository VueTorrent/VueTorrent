<template>
  <v-dialog
    v-model="dialog"
    :transition="dTransition"
    :content-class="phoneLayout ? 'rounded-0' : 'rounded-form'"
    max-width="500px"
    :fullscreen="phoneLayout"
    persistent
    @keydown.enter.prevent="$refs.addTorrent.click"
  >
    <div
      class="noselect"
      style="position: fixed; left: 0; top: 0; width: 100%; height: 100%"
      @drop.prevent="addDropFile"
      @dragover.prevent="showWrapDrag = true"
      @dragend.prevent="showWrapDrag = false"
      @dragleave.prevent="DragLeave"
    />
    <v-card :class="showWrapDrag ? 'wrap-drag' : ''" @drop.prevent="addDropFile" @dragover.prevent="showWrapDrag = true" @dragend.prevent="showWrapDrag = false">
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <v-toolbar flat dense class="transparent">
            <v-toolbar-title class="mx-auto">
              <h2>{{ $t('modals.add.title') }}</h2>
            </v-toolbar-title>
            <v-btn fab small class="transparent elevation-0" @click="close">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row no-gutters>
                <v-col ref="fileZone">
                  <v-file-input
                    v-if="!urls"
                    v-model="files"
                    color="deep-purple accent-4"
                    counter
                    :label="$t('modals.add.selectFiles')"
                    multiple
                    :prepend-icon="mdiPaperclip"
                    :rules="fileInputRules"
                    outlined
                    :show-size="1000"
                  >
                    <template #selection="{ index, text }">
                      <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                        {{ text }}
                      </v-chip>
                      <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                        +{{ files.length - 2 }}
                        File(s)
                      </span>
                    </template>
                  </v-file-input>
                  <v-textarea
                    v-if="files.length == 0"
                    v-model="urls"
                    style="max-height: 200px; overflow-x: hidden; overflow-y: auto"
                    :label="$t('url')"
                    :prepend-icon="mdiLink"
                    rows="1"
                    required
                    :autofocus="!phoneLayout"
                    auto-grow
                    clearable
                    :hint="$t('modals.add.urlHint')"
                    @click:prepend="paste"
                  />
                </v-col>
              </v-row>

              <v-combobox v-model="category" :items="availableCategories" clearable :label="$t('category')" item-text="name" :prepend-icon="mdiTag" @input="categoryChanged" />

              <v-text-field
                v-model="directory"
                :disabled="autoTMM"
                :label="$t('modals.add.downloadDirectory')"
                :prepend-icon="mdiFolder"
                autocomplete="download-directory"
                name="download-directory"
              />
              <v-row no-gutters>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="start" :label="$t('modals.add.starttorrent')" hide-details />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="skip_checking" :label="$t('modals.add.skipHashCheck')" hide-details />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="root_folder" :label="$t('modals.add.createSubfolder')" hide-details />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="autoTMM" :label="$t('modals.add.automaticTorrentManagement')" hide-details />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="sequentialDownload" :label="$t('rightClick.advanced.sequentialDownload')" hide-details />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="firstLastPiecePrio" :label="$t('rightClick.advanced.firstLastPriority')" hide-details />
                </v-flex>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-spacer />
        <v-form>
          <v-card-actions class="justify-center">
            <v-btn ref="addTorrent" text :disabled="!valid" class="accent white--text mx-0 mt-3" @click="submit"> Add Torrent </v-btn>
            <v-fab-transition v-if="phoneLayout">
              <v-btn color="red" dark absolute bottom right @click="close">
                <v-icon>{{ mdiClose }}</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
    <div
      v-show="showWrapDrag"
      class="wrap-drag noselect"
      style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; text-align: center; background-color: rgb(0, 0, 0, 0.5)"
    >
      <div class="align white--text">
        <div>
          <v-icon size="40" class="white--text">
            {{ mdiCloudUpload }}
          </v-icon>
        </div>
        <div>
          <h3>{{ $t('modals.add.dropHereForAdd') }}</h3>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { mdiCloudUpload, mdiFolder, mdiTag, mdiPaperclip, mdiLink, mdiClose } from '@mdi/js'
import { FullScreenModal, Modal } from '@/mixins'

export default {
  name: 'AddModal',
  mixins: [Modal, FullScreenModal],
  props: ['initialMagnet', 'openSuddenly'],
  data() {
    return {
      dTransition: 'scale-transition',
      hndlDialog: true,
      showWrapDrag: false,
      files: [],
      category: null,
      directory: '',
      start: true,
      skip_checking: false,
      root_folder: true,
      autoTMM: true,
      sequentialDownload: false,
      firstLastPiecePrio: false,
      fileInputRules: [
        v => {
          const result = v.every(f => {
            if (f.type) return f.type === 'application/x-bittorrent'
            else return /^.*\.torrent$/.test(f.name)
          })

          return result ? result : this.$i18n.t('modals.add.oneOrMoreFilesInvalidTorrent')
        }
      ],
      loading: false,
      urls: null,
      valid: false,
      mdiCloudUpload,
      mdiFolder,
      mdiTag,
      mdiPaperclip,
      mdiLink,
      mdiClose
    }
  },
  computed: {
    ...mapGetters(['getSettings', 'getCategories']),
    validFile() {
      return this.Files.length > 0
    },
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    savepath() {
      let savePath = this.getSettings().save_path
      if (this.category && this.category.savePath) {
        savePath = this.category.savePath
      }

      return savePath
    },
    availableCategories() {
      return this.getCategories()
    }
  },
  created() {
    this.urls = this.initialMagnet
    this.setSettings()
    if (this.openSuddenly == true) {
      this.dTransition = 'none'
    }
  },
  mounted() {
    this.dTransition = 'scale-transition'
  },
  methods: {
    async setSettings() {
      await this.$store.dispatch('FETCH_SETTINGS')
      await this.$store.commit('FETCH_CATEGORIES')
      const settings = this.getSettings()
      this.start = !settings.start_paused_enabled
      this.autoTMM = settings.auto_tmm_enabled
      this.root_folder = settings.create_subfolder_enabled
      this.directory = this.savepath
    },
    addDropFile(e) {
      this.showWrapDrag = false
      if (!this.urls) this.files.push(...Array.from(e.dataTransfer.files))
    },
    startDropFile() {
      this.showWrapDrag = true
    },
    DragLeave(e) {
      this.showWrapDrag = false
    },
    closeWrap() {
      if (this.showWrapDrag) this.showWrapDrag = false
      else this.close()
    },
    async paste() {
      if (navigator.clipboard && window.isSecureContext) {
        this.urls = await navigator.clipboard.readText()
      } else {
        this.urls = document.execCommand('paste')
      }
    },
    submit() {
      if (this.files.length || this.urls) {
        const torrents = []
        const params = {
          urls: null,
          paused: !this.start,
          skip_checking: this.skip_checking,
          root_folder: this.root_folder,
          autoTMM: this.autoTMM,
          sequentialDownload: this.sequentialDownload,
          firstLastPiecePrio: this.firstLastPiecePrio
        }
        if (this.files.length) torrents.push(...this.files)
        if (this.urls) params.urls = this.urls
        if (this.category) params.category = this.category.name
        if (!this.autoTMM) params.savepath = this.directory

        qbit.addTorrents(params, torrents)

        this.resetForm()

        this.$store.commit('DELETE_MODAL', this.guid)
      }
    },
    categoryChanged() {
      this.directory = this.savepath
    },
    resetForm() {
      this.url = null
      this.files = []
      this.category = null
      this.directory = this.savepath
      this.skip_checking = null
    },
    close() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-drag {
  pointer-events: none;
}

.wrap-drag .align {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #fff;
  padding: 0;
}
</style>
