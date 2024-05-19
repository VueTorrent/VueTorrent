<script setup lang="ts">
import { TrackerStatus } from '@/constants/qbit'
import { useMaindataStore } from '@/stores'
import { Tracker } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'
import { nextTick, onBeforeMount, onUnmounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm, VTextField } from 'vuetify/components'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const { t } = useI18n()
const maindataStore = useMaindataStore()

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
  else if (!tracker || tracker.num_peers === -1 || tracker?.num_seeds === -1 || tracker?.num_leeches === -1) return 'N/A'
  else {
    return t('torrentDetail.trackers.peersValue', {
      peers: tracker.num_peers,
      seeds: tracker.num_seeds,
      leeches: tracker.num_leeches
    })
  }
}

const loading = ref(false)
const torrentTrackers = ref<(Tracker & { isSelectable: boolean })[]>([])
const newTrackers = ref('')
const timer = ref<NodeJS.Timeout | null>(null)
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

  nextTick(() => {
    const input = document.getElementById('input') as HTMLInputElement
    input?.select()
  })
}

async function updateTrackers() {
  loading.value = true
  torrentTrackers.value = (await maindataStore.getTorrentTrackers(props.torrent.hash)).map(tracker => ({
    ...tracker,
    isSelectable: tracker.tier !== -1
  }))
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

async function editTracker() {
  if (!editTrackerDialog.isFormValid) return

  await maindataStore.editTorrentTracker(props.torrent.hash, editTrackerDialog.oldUrl, editTrackerDialog.newUrl)
  editTrackerDialog.isVisible = false
  await updateTrackers()
}

async function removeTracker(tracker: Tracker) {
  await maindataStore.removeTorrentTrackers(props.torrent.hash, [tracker.url])
  await updateTrackers()
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
  <v-list>
    <template v-for="(tracker, index) in torrentTrackers">
      <v-divider v-if="index === 3" color="white" thickness="5" />
      <v-divider v-else-if="index > 0" class="mx-5" color="white" />

      <v-list-item>
        <div class="d-flex">
          <div :class="`tracker-${TrackerStatus[tracker.status].toLowerCase()}`">
            <v-list-item-title class="text-break text-wrap">
              {{ tracker.url }}
            </v-list-item-title>
            <v-list-item-subtitle class="d-block">
              <div v-if="tracker.msg">{{ tracker.msg }}</div>
              <div v-else>{{ translateTrackerStatus(tracker.status) }}</div>

              <div v-if="tracker.tier >= 0">
                {{ t('torrentDetail.trackers.tier', tracker.tier) }}
              </div>

              <div v-if="tracker.status !== TrackerStatus.NOT_WORKING">
                <div>{{ formatTrackerValue(tracker) }}</div>
                <div>Downloads: {{ formatTrackerValue(tracker.num_downloaded) }}</div>
              </div>
            </v-list-item-subtitle>
          </div>

          <v-spacer />

          <div class="d-flex flex-column" v-if="tracker.tier >= 0">
            <v-dialog v-model="editTrackerDialog.isVisible" max-width="750px">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-pencil" variant="text" @click="openEditTrackerDialog(tracker)" />
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ t('torrentDetail.trackers.editTracker.title') }}</span>
                </v-card-title>

                <v-card-text>
                  <v-form v-model="editTrackerDialog.isFormValid" @submit.prevent>
                    <v-text-field :model-value="editTrackerDialog.oldUrl" disabled :label="$t('torrentDetail.trackers.editTracker.oldUrl')" />
                    <v-text-field
                      v-model="editTrackerDialog.newUrl"
                      id="input"
                      :rules="editTrackerRules"
                      :label="$t('torrentDetail.trackers.editTracker.newUrl')"
                      autofocus
                      @keydown.enter="editTracker" />
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="error" :disabled="!editTrackerDialog.isFormValid" @click="editTrackerDialog.isVisible = false">{{ t('common.cancel') }} </v-btn>
                  <v-btn color="accent" @click="editTracker">{{ t('common.ok') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn color="red" icon="mdi-delete" variant="text" @click="removeTracker(tracker)" />
          </div>
        </div>
      </v-list-item>
    </template>

    <v-list-item>
      <div :class="['d-flex flex-gap py-5', $vuetify.display.mobile ? 'flex-column' : 'justify-space-evenly']">
        <v-dialog v-model="addTrackersDialog" max-width="750px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="flat" :text="t('torrentDetail.trackers.addTrackers.title')" color="accent" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ t('torrentDetail.trackers.addTrackers.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newTrackers"
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

        <v-btn variant="flat" :disabled="torrentTrackers.length === 3" :text="t('torrentDetail.trackers.reannounce')" color="primary" @click="reannounceTrackers" />
      </div>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped>
.v-theme--darkTheme {
  .tracker-disabled {
    color: darken(lightgrey, 5%);
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

.v-theme--lightTheme {
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
