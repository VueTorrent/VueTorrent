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
                    v-if="urls.length === 0"
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
                    v-if="files.length === 0"
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

              <v-combobox v-model="tags" :items="availableTags" clearable :label="$t('tags')" :prepend-icon="mdiTag" multiple chips />
              <v-combobox v-model="category" :items="availableCategories" clearable :label="$t('category')" item-text="name" :prepend-icon="mdiLabel" @input="categoryChanged" />

              <v-text-field
                v-model="directory"
                :disabled="autoTMM"
                :label="$t('modals.add.downloadDirectory')"
                :prepend-icon="mdiFolder"
                autocomplete="download-directory"
                name="download-directory"
              />

              <v-row no-gutters class="flex-gap">
                <v-col>
                  <div class="d-flex flex-column align-center">
                     <p class="subtitle-1 mb-1">{{ $t('enums.contentLayout.title') }}</p>
                    <v-select
                      v-model="contentLayout"
                      flat
                      solo
                      dense
                      hide-details
                      background-color="background"
                      class="rounded-xl"
                      :items="contentLayoutOptions"
                    />
                  </div>
                </v-col>
                <v-col>
                  <div class="d-flex flex-column align-center">
                    <p class="subtitle-1 mb-1">{{ $t('enums.stopCondition.title') }}</p>
                    <v-select
                      v-model="stopCondition"
                      flat
                      solo
                      dense
                      hide-details
                      background-color="background"
                      class="rounded-xl"
                      :items="stopConditionOptions"
                    />
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="start" :label="$t('modals.add.starttorrent')" hide-details />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-checkbox v-model="skip_checking" :label="$t('modals.add.skipHashCheck')" hide-details />
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
import { mapGetters, mapState } from 'vuex'
import qbit from '@/services/qbit'
import { mdiCloudUpload, mdiFolder, mdiTag, mdiLabel, mdiPaperclip, mdiLink, mdiClose } from '@mdi/js'
import { FullScreenModal, Modal } from '@/mixins'
import { AppPreferences } from '@/enums/qbit'

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
      tags: [],
      directory: '',
      start: true,
      skip_checking: false,
      contentLayout: 'Original',
      contentLayoutOptions: [
        { text: this.$t('enums.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
        { text: this.$t('enums.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
        { text: this.$t('enums.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER }
      ],
      stopCondition: 'None',
      stopConditionOptions: [
        { text: this.$t('enums.stopCondition.none'), value: AppPreferences.StopCondition.NONE },
        { text: this.$t('enums.stopCondition.metadataReceived'), value: AppPreferences.StopCondition.METADATA_RECEIVED },
        { text: this.$t('enums.stopCondition.filesChecked'), value: AppPreferences.StopCondition.FILES_CHECKED }
      ],
      autoTMM: true,
      sequentialDownload: false,
      firstLastPiecePrio: false,
      fileInputRules: [
        v => {
          const result = v.every(f => {
            if (f.type) return f.type === 'application/x-bittorrent'
            else return /^.*\.torrent$/.test(f.name)
          })

          return result ? result : this.$t('modals.add.oneOrMoreFilesInvalidTorrent')
        }
      ],
      loading: false,
      urls: '',
      valid: false,
      mdiCloudUpload,
      mdiFolder,
      mdiTag,
      mdiLabel,
      mdiPaperclip,
      mdiLink,
      mdiClose
    }
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['getCategories', 'getAvailableTags']),
    phoneLayout() {
      return this.$vuetify.breakpoint.xsOnly
    },
    savepath() {
      let savePath = this.settings.save_path
      if (this.category && this.category.savePath) {
        savePath = this.category.savePath
      }

      return savePath
    },
    availableCategories() {
      return this.getCategories()
    },
    availableTags() {
      return this.getAvailableTags()
    }
  },
  created() {
    if (this.initialMagnet) this.urls = this.initialMagnet
    this.setSettings()
    if (this.openSuddenly === true) {
      this.dTransition = 'none'
    }
  },
  mounted() {
    this.dTransition = 'scale-transition'
    document.addEventListener('keydown', this.handleKeyboardShortcut)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  methods: {
    async setSettings() {
      await this.$store.dispatch('FETCH_SETTINGS')
      await this.$store.commit('FETCH_CATEGORIES')
      await this.$store.commit('FETCH_TAGS')
      this.start = !this.settings.start_paused_enabled
      this.autoTMM = this.settings.auto_tmm_enabled
      this.directory = this.savepath
      this.contentLayout = this.settings.torrent_content_layout
      this.stopCondition = this.settings.torrent_stop_condition
    },
    addDropFile(e) {
      this.showWrapDrag = false
      if (this.urls.length === 0) this.files.push(...Array.from(e.dataTransfer.files))
    },
    startDropFile() {
      this.showWrapDrag = true
    },
    DragLeave() {
      this.showWrapDrag = false
    },
    closeWrap() {
      if (this.showWrapDrag) this.showWrapDrag = false
      else this.close()
    },
    async paste(e) {
      if (navigator.clipboard && window.isSecureContext) {
        this.urls = await navigator.clipboard.readText()
      } else {
        e.target.focus()
        if (!document.execCommand('paste')) {
          this.$toast.error(this.$t('toast.pasteNotSupported').toString())
          return
        }
      }
      this.$toast.success(this.$t('toast.pasteSuccess').toString())
    },
    async submit() {
      if (this.files.length === 0 && this.urls.length === 0) return

      const torrents = []
      const params = {
        urls: null,
        paused: !this.start,
        skip_checking: this.skip_checking,
        autoTMM: this.autoTMM,
        sequentialDownload: this.sequentialDownload,
        firstLastPiecePrio: this.firstLastPiecePrio,
        contentLayout: this.contentLayout,
        stopCondition: this.stopCondition
      }
      if (this.files.length) torrents.push(...this.files)
      if (this.urls) params.urls = this.urls
      if (this.category) params.category = this.category.name
      if (this.tags) params.tags = this.tags.join(',')
      if (!this.autoTMM) params.savepath = this.directory

      await qbit.addTorrents(params, torrents)

      this.resetForm()

      this.$store.commit('DELETE_MODAL', this.guid)
    },
    categoryChanged() {
      this.directory = this.savepath
    },
    resetForm() {
      this.url = ''
      this.files = []
      this.category = null
      this.tags = []
      this.directory = this.savepath
      this.skip_checking = false
      this.contentLayout = this.settings.torrent_content_layout
      this.stopCondition = this.settings.torrent_stop_condition
    },
    close() {
      this.dialog = false
    },
    handleKeyboardShortcut(e) {
      if (e.key === 'Escape') {
        this.close()
      }
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

.flex-gap {
  column-gap: 8px;
}
</style>
