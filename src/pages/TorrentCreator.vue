<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import DOMPurify from 'dompurify'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useTask } from 'vue-concurrency'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import TorrentCreatorFormDialog from '@/components/Dialogs/TorrentCreatorFormDialog.vue'
import { useI18nUtils } from '@/composables'
import { TorrentCreatorTaskStatus, TorrentFormat } from '@/constants/qbit'
import { basename, downloadFile, formatData, formatPercent } from '@/helpers'
import dayjs from '@/plugins/dayjs'
import { useAppStore, useDialogStore, useTorrentCreatorStore, useVueTorrentStore } from '@/stores'
import { TorrentCreatorTask } from '@/types/qbit/models'

const { height: deviceHeight } = useDisplay()
const router = useRouter()
const { t } = useI18nUtils()
const appStore = useAppStore()
const dialogStore = useDialogStore()
const torrentCreatorStore = useTorrentCreatorStore()
const { tasks } = storeToRefs(torrentCreatorStore)
const vueTorrentStore = useVueTorrentStore()

const torrentCreatorTasksTask = useTask(function* () {
  yield torrentCreatorStore.fetchTasks()
}).drop()

const {
  isActive: isTimerActive,
  pause,
  resume,
} = useIntervalFn(() => void torrentCreatorTasksTask.perform(), 1000, {
  immediate: true,
  immediateCallback: true,
})
const forceFetch = resume

const height = computed(() => {
  // 64px for the toolbar
  // 12px for the padding (top and bottom)
  // 48px for the title
  return deviceHeight.value - 64 - 12 * 2 - 48
})

const headers = computed(() => [
  { key: 'actions', sortable: false },
  { title: t('torrentCreator.table.sourcePath'), key: 'sourcePath' },
  { title: t('torrentCreator.table.status'), key: 'status' },
  { title: t('torrentCreator.table.progress'), key: 'progress' },
  appStore.usesLibtorrent2 ? { title: t('torrentCreator.table.format'), key: 'format' } : { title: t('torrentCreator.table.optimizeAlignment'), key: 'optimizeAlignment' },
  { title: t('torrentCreator.table.pieceSize'), key: 'pieceSize' },
  { title: t('torrentCreator.table.private'), key: 'private' },
  { title: t('torrentCreator.table.timeAdded'), key: 'timeAdded' },
  { title: t('torrentCreator.table.timeStarted'), key: 'timeStarted' },
  { title: t('torrentCreator.table.timeFinished'), key: 'timeFinished' },
  { title: t('torrentCreator.table.trackers.header'), key: 'trackers', sortable: false },
  { title: t('torrentCreator.table.urlSeeds.header'), key: 'urlSeeds', sortable: false },
  { title: t('torrentCreator.table.source'), key: 'source' },
  { title: t('torrentCreator.table.comment'), key: 'comment' },
  { title: t('torrentCreator.table.errorMessage'), key: 'errorMessage' },
])

const taskStatusColorMap: Record<TorrentCreatorTaskStatus, string> = {
  [TorrentCreatorTaskStatus.FAILED]: 'error',
  [TorrentCreatorTaskStatus.RUNNING]: 'torrent-ul_stalled',
  [TorrentCreatorTaskStatus.QUEUED]: 'warning',
  [TorrentCreatorTaskStatus.FINISHED]: 'success',
}

const torrentFormatMap: Record<TorrentFormat, string> = {
  [TorrentFormat.V1]: 'V1',
  [TorrentFormat.V2]: 'V2',
  [TorrentFormat.HYBRID]: 'Hybrid',
}

function openTorrentCreatorFormDialog() {
  dialogStore.createDialog(TorrentCreatorFormDialog, {}, () => void torrentCreatorStore.fetchTasks())
}

async function downloadTorrent(item: TorrentCreatorTask) {
  const blob = await torrentCreatorStore.downloadTorrent(item.taskID)

  const baseFilename = basename(item.torrentFilePath)
  let exportedFilename: string
  if (baseFilename && baseFilename.endsWith('.torrent')) {
    exportedFilename = baseFilename.slice(0, -8)
  } else if (baseFilename) {
    exportedFilename = baseFilename
  } else {
    exportedFilename = item.taskID
  }
  downloadFile(`${exportedFilename}.torrent`, blob)
}

async function deleteTask(item: TorrentCreatorTask) {
  await torrentCreatorStore.deleteTask(item.taskID)
  forceFetch()
}

function sanitizeHtml(html?: string) {
  if (!html?.length) {
    return ''
  }

  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }).replaceAll('\n', '<br>')
}

function goHome() {
  void router.push({ name: 'dashboard' })
}

function handleKeyboardShortcut(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog) {
    return false
  }

  if (e.key === 'Escape') {
    e.preventDefault()
    goHome()
  }
}

onBeforeMount(() => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  torrentCreatorTasksTask.perform()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('torrentCreator.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-card v-if="!tasks.length" :height="height">
      <v-empty-state :title="t('torrentCreator.empty.value')" color="accent" icon="mdi-cog-off">
        <template #actions>
          <v-btn :text="t('torrentCreator.empty.action')" color="accent" @click="openTorrentCreatorFormDialog()" />
        </template>
      </v-empty-state>
    </v-card>

    <v-list v-else>
      <v-list-item>
        <div class="d-flex align-center flex-gap">
          <v-spacer />
          <v-btn
            color="accent"
            :prepend-icon="isTimerActive ? 'mdi-timer-pause' : 'mdi-timer-play'"
            :text="isTimerActive ? t('common.pause') : t('common.resume')"
            @click="isTimerActive ? pause() : resume()" />
          <v-btn color="accent" prepend-icon="mdi-plus" :text="t('torrentCreator.table.create')" @click="openTorrentCreatorFormDialog" />
        </div>
      </v-list-item>

      <v-divider class="my-3" />

      <v-list-item class="text-select">
        <v-data-table
          :header-props="{ class: 'text-no-wrap' }"
          :mobile="null"
          :headers="headers"
          :items="tasks"
          multi-sort
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }">
          <template #[`item.status`]="{ item, value }">
            <span :class="`text-${taskStatusColorMap[item.status]}`">{{ t(`constants.torrentCreatorTaskStatus.${value.toLowerCase()}`) }}</span>
          </template>
          <template #[`item.progress`]="{ item, value }">
            <v-progress-linear
              v-if="item.status === TorrentCreatorTaskStatus.RUNNING"
              :model-value="value"
              :color="taskStatusColorMap[item.status]"
              :height="20"
              rounded="sm"
              style="width: 10em">
              {{ value }} %
            </v-progress-linear>
            <v-progress-linear v-else :model-value="100" :color="taskStatusColorMap[item.status]" :height="20" rounded="sm" style="width: 10em">
              {{ formatPercent(1) }}
            </v-progress-linear>
          </template>
          <template #[`item.format`]="{ value }">
            {{ torrentFormatMap[value as TorrentFormat] }}
          </template>
          <template #[`item.pieceSize`]="{ value }">
            {{ formatData(value, vueTorrentStore.useBinarySize, 0) }}
          </template>
          <template #[`item.private`]="{ value }">
            <v-icon v-if="value" color="accent"> mdi-check-bold </v-icon>
            <v-icon v-else color="error"> mdi-close-thick </v-icon>
          </template>
          <template #[`item.optimizeAlignment`]="{ value }">
            <v-icon v-if="value" color="accent"> mdi-check-bold </v-icon>
            <v-icon v-else color="error"> mdi-close-thick </v-icon>
          </template>
          <template #[`item.timeAdded`]="{ value }">
            <div class="text-no-wrap">
              {{ dayjs(value).format(vueTorrentStore.dateFormat) }}
            </div>
          </template>
          <template #[`item.timeFinished`]="{ value }">
            <div class="text-no-wrap">
              {{ dayjs(value).format(vueTorrentStore.dateFormat) }}
            </div>
          </template>
          <template #[`item.timeStarted`]="{ value }">
            <div class="text-no-wrap">
              {{ dayjs(value).format(vueTorrentStore.dateFormat) }}
            </div>
          </template>
          <template #[`item.trackers`]="{ value }">
            <v-dialog v-if="value && value.length && !value.every((url: string) => !url.length)">
              <template #activator="{ props }">
                <div class="text-no-wrap">
                  <span>{{ t('torrentCreator.table.trackers.activator', value.filter((v: string) => v.length).length) }}</span>
                  <v-icon class="ml-1" v-bind="props"> mdi-information </v-icon>
                </div>
              </template>

              <v-card>
                <v-card-title class="ios-margin">
                  <v-toolbar color="transparent">
                    <v-toolbar-title>{{ t('torrentCreator.table.trackers.title') }}</v-toolbar-title>
                    <v-spacer />
                    <v-btn icon="mdi-close" />
                  </v-toolbar>
                </v-card-title>

                <v-card-text>
                  <v-list>
                    <template v-for="(tracker, i) in value" :key="i">
                      <v-list-item v-if="tracker">
                        {{ tracker }}
                      </v-list-item>
                      <v-divider v-else />
                    </template>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-dialog>
            <span v-else>{{ t('common.none') }}</span>
          </template>
          <template #[`item.urlSeeds`]="{ value }">
            <v-dialog v-if="value && value.length && !value.every((url: string) => !url.length)">
              <template #activator="{ props }">
                <div class="text-no-wrap">
                  <span>{{ t('torrentCreator.table.urlSeeds.activator', value.filter((v: string) => v.length).length) }}</span>
                  <v-icon class="ml-1" v-bind="props"> mdi-information </v-icon>
                </div>
              </template>

              <v-card>
                <v-card-title class="ios-margin">
                  <v-toolbar color="transparent">
                    <v-toolbar-title>{{ t('torrentCreator.table.urlSeeds.title') }}</v-toolbar-title>
                    <v-spacer />
                    <v-btn icon="mdi-close" />
                  </v-toolbar>
                </v-card-title>

                <v-card-text>
                  <v-list>
                    <template v-for="(url, i) in value.filter((v: string) => v.length)">
                      <v-list-item v-if="url" :key="i">
                        {{ url }}
                      </v-list-item>
                    </template>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-dialog>
            <span v-else>{{ t('common.none') }}</span>
          </template>
          <template #[`item.comment`]="{ value }">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="text-no-wrap" v-html="sanitizeHtml(value)" />
          </template>
          <template #[`item.errorMessage`]="{ value }">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="text-no-wrap" v-html="sanitizeHtml(value)" />
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn
              :disabled="item.status !== TorrentCreatorTaskStatus.FINISHED"
              color="accent"
              icon="mdi-download"
              variant="text"
              density="compact"
              @click.stop="downloadTorrent(item)" />
            <v-btn color="red" icon="mdi-delete" variant="text" density="compact" @click.stop="deleteTask(item)" />
          </template>
        </v-data-table>
      </v-list-item>
    </v-list>
  </div>
</template>
