<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import PieceCanvas from './PieceCanvas.vue'
import ColoredChip from '@/components/Core/ColoredChip.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/Confirm/ConfirmDeleteDialog.vue'
import MoveTorrentDialog from '@/components/Dialogs/MoveTorrentDialog.vue'
import MoveTorrentFileDialog from '@/components/Dialogs/MoveTorrentFileDialog.vue'
import { useI18nUtils } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import { TorrentState } from '@/constants/vuetorrent'
import { containsUrl, formatData, formatDataUnit, formatDataValue, formatPercent, formatSpeed, getRatioColor, getTorrentStateColor, splitByUrl } from '@/helpers'
import { useContentStore, useDialogStore, useTorrentDetailStore, useVueTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { t, getTorrentStateString } = useI18nUtils()
const contentStore = useContentStore()
const { cachedFiles } = storeToRefs(contentStore)
const dialogStore = useDialogStore()
const { properties } = storeToRefs(useTorrentDetailStore())
const vuetorrentStore = useVueTorrentStore()

const isContextSecured = computed(() => window.isSecureContext)

const selectedFiles = computed(() => cachedFiles.value.filter(f => f.priority !== FilePriority.DO_NOT_DOWNLOAD))
const selectedFilesSize = computed(() => selectedFiles.value.reduce((acc, file) => acc + file.size, 0))
const torrentFileCount = computed(() => cachedFiles.value.length)
const torrentFileName = computed(() => (selectedFiles.value.length === 1 ? selectedFiles.value[0].name : ''))

const comment = computed(() => properties.value?.comment ?? '')
const downloadSpeedAvg = computed(() => properties.value?.dl_speed_avg ?? 0)
const torrentPieceSize = computed(() => properties.value?.piece_size ?? 0)
const torrentPieceOwned = computed(() => properties.value?.pieces_have ?? 0)
const torrentPieceCount = computed(() => properties.value?.pieces_num ?? 0)
const uploadSpeedAvg = computed(() => properties.value?.up_speed_avg ?? 0)

const torrentStateColor = computed(() => getTorrentStateColor(props.torrent.state))
const pieceSize = computed(() => `${parseInt(formatDataValue(torrentPieceSize.value, true))} ${formatDataUnit(torrentPieceSize.value, true)}`)
const isFetchingMetadata = computed(() => [TorrentState.META_DOWNLOAD, TorrentState.FORCED_META_DOWNLOAD].includes(props.torrent.state))
const ratioColor = computed(() => {
  if (!vuetorrentStore.enableRatioColors) return ''
  return getRatioColor(props.torrent.ratio)
})

async function copyHash() {
  try {
    await navigator.clipboard.writeText(props.torrent.hash)
  } catch (_) {
    toast.error(t('toast.copy.error'))
    return
  }

  toast.success(t('toast.copy.success'))
}

function openMoveTorrentDialog(mode: 'dl' | 'save') {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [props.torrent.hash], mode })
}

function openMoveTorrentFileDialog() {
  dialogStore.createDialog(
    MoveTorrentFileDialog,
    {
      hash: props.torrent.hash,
      isFolder: false,
      oldName: torrentFileName.value
    },
    () => void contentStore.updateFileTreeTask.perform()
  )
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog || !props.isActive) return false

  if (e.key === 'd') {
    e.preventDefault()
    openMoveTorrentDialog('dl')
    return true
  }

  if (e.key === 's') {
    e.preventDefault()
    openMoveTorrentDialog('save')
    return true
  }

  if (e.key === 'f' && selectedFiles.value.length === 1) {
    e.preventDefault()
    openMoveTorrentFileDialog()
    return true
  }

  if (e.key === 'Delete') {
    e.preventDefault()
    dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [props.torrent.hash] })
    return true
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <v-card v-if="torrent">
    <v-card-title class="text-wrap">
      {{ torrent.name }}
    </v-card-title>
    <v-card-subtitle>
      <div>
        <span v-for="(commentPart, i) in splitByUrl(comment)" :key="i">
          <a v-if="containsUrl(commentPart)" target="_blank" :href="commentPart">{{ commentPart }}</a>
          <span v-else>{{ commentPart }}</span>
        </span>
      </div>
      <div class="my-1">
        <span class="mr-2">{{ torrent.hash }}</span>
        <v-btn v-if="isContextSecured" variant="outlined" rounded @click="copyHash">
          {{ $t('torrentDetail.overview.copy_hash') }}
        </v-btn>
      </div>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="4">
              <v-progress-circular :color="torrentStateColor" :indeterminate="isFetchingMetadata" :size="100" :model-value="torrent?.progress * 100 || 0" :width="15">
                <template #default>
                  <span v-if="isFetchingMetadata">{{ $t('torrentDetail.overview.fetchingMetadata') }}</span>
                  <v-icon v-else-if="torrent.progress === 1" icon="mdi-check" size="x-large" />
                  <span v-else>{{ formatPercent(torrent.progress) }}</span>
                </template>
              </v-progress-circular>
            </v-col>
            <v-col cols="8" class="d-flex flex-column align-center justify-center">
              <div v-if="isFetchingMetadata">
                <span>{{ $t('torrentDetail.overview.waitingForMetadata') }}</span>
              </div>
              <div v-else>
                <PieceCanvas :torrent="torrent" :is-active="isActive" />
              </div>

              <div v-if="torrentPieceCount > 0">
                <span>
                  {{
                    t('torrentDetail.overview.pieceCount', {
                      owned: torrentPieceOwned,
                      total: torrentPieceCount,
                      pieceSize
                    })
                  }}
                </span>
              </div>

              <div>
                <v-icon icon="mdi-arrow-down" />
                {{ formatSpeed(torrent.dlspeed, vuetorrentStore.useBitSpeed) }}

                <v-icon icon="mdi-arrow-up" />
                {{ formatSpeed(torrent.upspeed, vuetorrentStore.useBitSpeed) }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.download_path') }}:</div>
              <div>{{ torrent.download_path }}</div>
              <v-btn icon="mdi-pencil" color="accent" size="x-small" @click="openMoveTorrentDialog('dl')" />
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.fileCount') }}:</div>
              <div>{{ selectedFiles.length }} / {{ torrentFileCount }}</div>
              <div v-if="selectedFiles.length === 1">
                {{ torrentFileName }}
              </div>
              <v-btn v-if="selectedFiles.length === 1" icon="mdi-pencil" color="accent" size="x-small" @click="openMoveTorrentFileDialog" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.save_path') }}:</div>
              <div>{{ torrent.savePath }}</div>
              <v-btn icon="mdi-pencil" color="accent" size="x-small" @click="openMoveTorrentDialog('save')" />
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.content_path') }}:</div>
              <div>{{ torrent.content_path }}</div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.state') }}:</div>
              <ColoredChip :disabled="true" :default-color="torrentStateColor" :value="getTorrentStateString(torrent.state)" />
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.category') }}:</div>
              <ColoredChip default-color="category" :disabled="!torrent.category.length" :disabled-value="$t('navbar.side.filters.category.empty')" :value="torrent.category" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.tracker') }}:</div>
              <ColoredChip
                :disabled="!torrent.trackerDomain.length"
                default-color="tracker"
                :disabled-value="$t('navbar.side.filters.tracker.empty')"
                :value="torrent.trackerDomain" />
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrent.properties.tags') }}:</div>
              <div v-if="torrent.tags.length" class="d-flex flex-wrap flex-gap-row-small flex-gap-column">
                <ColoredChip v-for="tag in torrent.tags" :key="tag" default-color="tag" :value="tag" />
              </div>
              <ColoredChip v-else :disabled="true" default-color="tag" :value="$t('navbar.side.filters.tag.empty')" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.selectedFileSize') }}:</div>
              <div>
                {{ formatData(selectedFilesSize, vuetorrentStore.useBinarySize) }} /
                {{ formatData(torrent.total_size, vuetorrentStore.useBinarySize) }}
              </div>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.ratio') }}:</div>
              <div :class="ratioColor">
                {{ torrent.ratio }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.downloaded') }}:</div>
              <div>{{ formatData(torrent.downloaded, vuetorrentStore.useBinarySize) }}</div>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.uploaded') }}:</div>
              <div>{{ formatData(torrent.uploaded, vuetorrentStore.useBinarySize) }}</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.dlSpeedAverage') }}:</div>
              <div>{{ formatSpeed(downloadSpeedAvg, vuetorrentStore.useBitSpeed) }}</div>
            </v-col>
            <v-col cols="6">
              <div>{{ $t('torrentDetail.overview.upSpeedAverage') }}:</div>
              <div>{{ formatSpeed(uploadSpeedAvg, vuetorrentStore.useBitSpeed) }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
