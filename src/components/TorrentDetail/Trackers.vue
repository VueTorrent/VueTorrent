<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { nextTick, onBeforeUnmount, reactive, ref, shallowReadonly, watch } from 'vue'
import { useTask } from 'vue-concurrency'
import { onBeforeRouteUpdate } from 'vue-router'
import { useI18nUtils } from '@/composables'
import { TrackerStatus } from '@/constants/qbit'
import { useTorrentStore, useTrackerStore } from '@/stores'
import { Tracker } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { t } = useI18nUtils()
const torrentStore = useTorrentStore()
const trackerStore = useTrackerStore()

const headers = [
  { nowrap: true, title: t('torrentDetail.trackers.fields.tier'), key: 'tier' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.url'), key: 'url' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.status'), key: 'status' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.num_seeds'), key: 'num_seeds' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.num_peers'), key: 'num_peers' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.num_downloaded'), key: 'num_downloaded' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.num_leeches'), key: 'num_leeches' },
  { nowrap: true, title: t('torrentDetail.trackers.fields.msg'), key: 'msg' },
  { nowrap: true, key: 'actions', sortable: false }
]
const sortBy = shallowReadonly<{ key: string; order?: boolean | 'asc' | 'desc' }[]>([
  { key: 'tier', order: 'asc' },
  { key: 'url', order: 'asc' }
])
const filter = ref('')

function translateTrackerStatus(status: TrackerStatus): string {
  switch (status) {
    case TrackerStatus.DISABLED:
      return t('constants.trackerStatus.disabled')
    case TrackerStatus.NOT_YET_CONTACTED:
      return t('constants.trackerStatus.not_yet_contacted')
    case TrackerStatus.WORKING:
      return t('constants.trackerStatus.working')
    case TrackerStatus.UPDATING:
      return t('constants.trackerStatus.updating')
    case TrackerStatus.NOT_WORKING:
      return t('constants.trackerStatus.not_working')
    default:
      return ''
  }
}

const loading = ref(false)
const isError = ref(false)
const torrentTrackers = ref<Tracker[]>([])
const newTrackers = ref('')
const addTrackersDialog = ref(false)

const editTrackerRules = [(v: string) => !!v || t('torrentDetail.trackers.editTracker.newUrlRequired')]
const editTrackerDialog = reactive({
  isVisible: false,
  isFormValid: false,
  oldUrl: '',
  newUrl: ''
})

function openEditTrackerDialog(tracker: Tracker) {
  editTrackerDialog.isVisible = true
  editTrackerDialog.oldUrl = tracker.url
  editTrackerDialog.newUrl = tracker.url

  void nextTick(() => {
    const input = document.getElementById('input') as HTMLInputElement
    input?.select()
  })
}

async function updateTrackers() {
  loading.value = true
  isError.value = false

  try {
    torrentTrackers.value = await trackerStore.getTorrentTrackers(props.torrent.hash)
  } catch {
    isError.value = true
  } finally {
    loading.value = false
  }
}

const trackerTask = useTask(function* () {
  yield updateTrackers()
}).drop()

async function addTrackers() {
  if (!newTrackers.value.length) return

  await trackerStore.addTorrentTrackers(props.torrent.hash, newTrackers.value)
  resume()
  closeAddDialog()
}

function closeAddDialog() {
  addTrackersDialog.value = false
  newTrackers.value = ''
}

async function editTracker() {
  if (!editTrackerDialog.isFormValid) return

  await trackerStore.editTorrentTracker(props.torrent.hash, editTrackerDialog.oldUrl, editTrackerDialog.newUrl)
  editTrackerDialog.isVisible = false
  resume()
}

async function removeTracker(tracker: Tracker) {
  await trackerStore.removeTorrentTrackers(props.torrent.hash, [tracker.url])
  resume()
}

async function reannounceTrackers() {
  await torrentStore.reannounceTorrents([props.torrent.hash])
}

const timerForcedPause = ref(false)
const {
  isActive: isTimerActive,
  resume: resumeTimer,
  pause: pauseTimer
} = useIntervalFn(() => void trackerTask.perform(), 5000, {
  immediate: true,
  immediateCallback: true
})

function pause() {
  timerForcedPause.value = true
  pauseTimer()
}

function resume() {
  timerForcedPause.value = false
  resumeTimer()
}

watch(
  () => props.isActive,
  v => {
    if (v && !timerForcedPause.value) resume()
    else pause()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  pause()
})

onBeforeRouteUpdate(() => !addTrackersDialog.value && !editTrackerDialog.isVisible)
</script>

<template>
  <v-card>
    <v-empty-state v-if="!torrentTrackers.length && loading" :title="$t('torrentDetail.trackers.loading')" icon="mdi-web-sync" color="accent" />
    <v-empty-state v-else-if="!torrentTrackers.length && isError" :title="$t('torrentDetail.trackers.error')" icon="mdi-web-remove" color="error" />
    <v-data-table v-else :headers="headers" :items="torrentTrackers" multi-sort :sort-by="sortBy" :search="filter" :filter-keys="['url', 'msg']" :mobile="null">
      <template #top>
        <div class="mt-2 mx-3 d-flex flex-gap align-center">
          <v-text-field v-model="filter" density="compact" :label="$t('common.search')" prepend-inner-icon="mdi-magnify" flat hide-details single-line clearable />

          <v-tooltip :text="isTimerActive ? $t('common.pause') : $t('common.resume')" location="bottom">
            <template #activator="{ props: tooltipProps }">
              <v-btn v-bind="tooltipProps" :icon="isTimerActive ? 'mdi-timer-pause' : 'mdi-timer-play'" color="primary" @click="isTimerActive ? pause() : resume()" />
            </template>
          </v-tooltip>
        </div>
      </template>

      <template #[`item.tier`]="{ value }">
        <span v-if="value >= 0">{{ value }}</span>
      </template>

      <template #[`item.status`]="{ value }">
        <span :class="`tracker-${TrackerStatus[value].toLowerCase()}`">{{ translateTrackerStatus(value) }}</span>
      </template>

      <template #[`item.msg`]="{ value }">
        <span v-if="!value">{{ $t('common.NA') }}</span>
        <span v-else>{{ value }}</span>
      </template>

      <template #[`item.actions`]="{ item }">
        <template v-if="item.tier !== -1">
          <v-btn icon="mdi-pencil" variant="text" @click="openEditTrackerDialog(item)" />
          <v-btn color="red" icon="mdi-delete" variant="text" @click="removeTracker(item)" />
        </template>
      </template>
    </v-data-table>

    <div class="d-flex my-3 flex-gap align-center justify-center">
      <v-dialog v-model="addTrackersDialog" max-width="750px">
        <template #activator="{ props: dialogProps }">
          <v-btn v-bind="dialogProps" variant="flat" :text="t('torrentDetail.trackers.addTrackers.title')" color="accent" />
        </template>
        <v-card :title="$t('torrentDetail.trackers.addTrackers.title')">
          <v-card-text>
            <v-textarea v-model="newTrackers" :label="t('torrentDetail.trackers.addTrackers.newTrackers')" :hint="t('torrentDetail.trackers.addTrackers.newTrackersHint')" />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="closeAddDialog">
              {{ t('common.cancel') }}
            </v-btn>
            <v-btn color="accent" @click="addTrackers">
              {{ t('common.ok') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn variant="flat" :disabled="torrentTrackers.length === 3" :text="t('torrentDetail.trackers.reannounce')" color="primary" @click="reannounceTrackers" />
    </div>
  </v-card>

  <v-dialog v-model="editTrackerDialog.isVisible" max-width="750px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ t('torrentDetail.trackers.editTracker.title') }}</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="editTrackerDialog.isFormValid" @submit.prevent>
          <v-text-field :model-value="editTrackerDialog.oldUrl" disabled :label="$t('torrentDetail.trackers.editTracker.oldUrl')" />
          <v-text-field
            id="input"
            v-model="editTrackerDialog.newUrl"
            :rules="editTrackerRules"
            :label="$t('torrentDetail.trackers.editTracker.newUrl')"
            autofocus
            @keydown.enter="editTracker" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="error" :disabled="!editTrackerDialog.isFormValid" @click="editTrackerDialog.isVisible = false">
          {{ t('common.cancel') }}
        </v-btn>
        <v-btn color="accent" @click="editTracker">
          {{ t('common.ok') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@use 'sass:color';

[class*='v-theme--dark-'] {
  .tracker-disabled {
    color: color.adjust(lightgrey, $lightness: -5%);
  }

  .tracker-not_yet_contacted {
    color: orange;
  }

  .tracker-working {
    color: lightgreen;
  }

  .tracker-not_working {
    color: lightcoral;
  }

  .tracker-updating {
    color: lightblue;
  }
}

[class*='v-theme--light-'] {
  .tracker-disabled {
    color: grey;
  }

  .tracker-not_yet_contacted {
    color: orange;
  }

  .tracker-working {
    color: green;
  }

  .tracker-not_working {
    color: red;
  }

  .tracker-updating {
    color: dodgerblue;
  }
}
</style>
