<script setup lang="ts">
import { TrackerStatus } from '@/constants/qbit'
import { useMaindataStore } from '@/stores'
import { Tracker } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'
import { onBeforeMount, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ torrent: Torrent, isActive: boolean }>()

const { t } = useI18n()
const maindataStore = useMaindataStore()

const headers = [
  { title: t('torrentDetail.trackers.table.tier'), key: 'tier' },
  { title: t('torrentDetail.trackers.table.url'), key: 'url' },
  { title: t('torrentDetail.trackers.table.status'), key: 'status' },
  { title: t('torrentDetail.trackers.table.peers'), key: 'peers' },
  { title: t('torrentDetail.trackers.table.downloaded'), key: 'num_downloaded' },
  { title: t('torrentDetail.trackers.table.message'), key: 'msg' }
]

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

function formatTrackerValue(tracker: Tracker | number) {
  if (typeof tracker === 'number') return tracker === -1 ? 'N/A' : tracker.valueOf()
  else if (
    tracker.num_peers === -1 ||
    tracker.num_seeds === -1 ||
    tracker.num_leeches === -1
  ) return 'N/A'
  else return t('torrentDetail.trackers.table.peersValue', {
      peers: tracker.num_peers,
      seeds: tracker.num_seeds,
      leeches: tracker.num_leeches
    })
}

const loading = ref(false)
const torrentTrackers = ref<(Tracker & { isSelectable: boolean })[]>([])
const newTrackers = ref('')
const selectedTrackers = ref<string[]>([])
const timer = ref<NodeJS.Timeout | null>(null)
const addTrackersDialog = ref(false)
const removeTrackersDialog = ref(false)

async function updateTrackers() {
  loading.value = true
  torrentTrackers.value = (await maindataStore.getTorrentTrackers(props.torrent.hash))
  .map(tracker => ({ ...tracker, isSelectable: tracker.tier !== -1 }))
  loading.value = false
}

async function addTrackers() {
  if (!newTrackers.value.length) return

  await maindataStore.addTorrentTrackers(props.torrent.hash, newTrackers.value)
  await updateTrackers()
  closeAddDialog()
}

function closeAddDialog() {
  addTrackersDialog.value = false
  newTrackers.value = ''
}

async function removeTrackers() {
  if (!selectedTrackers.value.length) return

  await maindataStore.removeTorrentTrackers(props.torrent.hash, selectedTrackers.value)
  await updateTrackers()
  closeRemoveDialog()
}

function closeRemoveDialog() {
  removeTrackersDialog.value = false
  selectedTrackers.value = []
}

async function reannounceTrackers() {
  await maindataStore.reannounceTorrents([props.torrent.hash])
}

async function setupTimer(forceState?: boolean) {
  if (forceState ?? props.isActive) {
    await updateTrackers()
    timer.value = setInterval(updateTrackers, 5000)
  } else {
    clearInterval(timer.value!)
    timer.value = null
  }
}

onBeforeMount(setupTimer)
onUnmounted(() => setupTimer(false))
watch(() => props.isActive, setupTimer)
</script>

<template>
  <v-data-table v-model="selectedTrackers"
                :headers="headers"
                :items-per-page="-1"
                item-value="url"
                item-selectable="isSelectable"
                select-strategy="all"
                show-select
                :loading="loading"
                :items="torrentTrackers"
                :sort-by="[{key: 'tier', order: 'asc'}]">
    <template v-slot:[`item.tier`]="{ item }">
      <span v-if="item.raw.tier === -1">-</span>
      <span v-else>{{ item.raw.tier }}</span>
    </template>
    <template v-slot:[`item.status`]="{ item }">{{ translateTrackerStatus(item.raw.status) }}</template>
    <template v-slot:[`item.peers`]="{ item }">
      <span v-if="item.raw.num_peers && item.raw.num_seeds && item.raw.num_leeches">
        {{ formatTrackerValue(item.raw) }}
      </span>
      <span v-else>N/A</span>
    </template>
    <template v-slot:[`item.num_downloaded`]="{ item }">{{ formatTrackerValue(item.raw.num_downloaded) }}</template>
    <template v-slot:bottom>
      <div :class="['d-flex gap py-5', $vuetify.display.mobile ? 'flex-column' : 'justify-space-evenly']">
        <v-dialog v-model="addTrackersDialog" max-width="750px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props"
                   variant="flat"
                   :text="t('torrentDetail.trackers.addTrackers.title')"
                   color="accent" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ t('torrentDetail.trackers.addTrackers.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="newTrackers"
                                :label="t('torrentDetail.trackers.addTrackers.newTrackers')"
                                :hint="t('torrentDetail.trackers.addTrackers.newTrackersHint')" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="error" @click="closeAddDialog">{{ t('common.cancel') }}</v-btn>
              <v-btn color="accent" @click="addTrackers">{{ t('common.ok') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="removeTrackersDialog" max-width="750px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props"
                   variant="flat"
                   :disabled="!selectedTrackers.length"
                   :text="t('torrentDetail.trackers.removeTrackers.title')"
                   color="error" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ t('torrentDetail.trackers.removeTrackers.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <div class="d-flex flex-wrap gap">
                  <span class="pa-1 border" v-for="tracker in selectedTrackers">{{ tracker }}</span>
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="accent" @click="closeRemoveDialog">{{ t('common.cancel') }}</v-btn>
              <v-btn color="error" @click="removeTrackers">{{ t('common.ok') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn variant="flat"
               :disabled="torrentTrackers.length === 3"
               :text="t('torrentDetail.trackers.reannounce')"
               color="primary"
               @click="reannounceTrackers" />
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>