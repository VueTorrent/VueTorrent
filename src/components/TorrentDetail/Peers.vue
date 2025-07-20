<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { computed, readonly, ref, shallowReadonly, watch } from 'vue'
import { useTask } from 'vue-concurrency'
import { onBeforeRouteUpdate } from 'vue-router'
import { useI18nUtils } from '@/composables'
import { codeToFlag, formatData, formatPercent, formatSpeed, isWindows } from '@/helpers'
import { useDialogStore, useMaindataStore, usePreferenceStore, useVueTorrentStore } from '@/stores'
import { Peer } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

type PeerType = Peer & { host: string }

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()

const headers = readonly([
  { nowrap: true, key: 'actions', sortable: false },
  { nowrap: true, title: t('torrentDetail.peers.fields.country'), key: 'country', sortRaw: sortCountry },
  { nowrap: true, title: t('torrentDetail.peers.fields.host'), key: 'host', sortRaw: sortHost },
  { nowrap: true, title: t('torrentDetail.peers.fields.progress'), key: 'progress' },
  { nowrap: true, title: t('torrentDetail.peers.fields.download'), key: 'dl_speed' },
  { nowrap: true, title: t('torrentDetail.peers.fields.upload'), key: 'up_speed' },
  { nowrap: true, title: t('torrentDetail.peers.fields.flags'), key: 'flags' },
  { nowrap: true, title: t('torrentDetail.peers.fields.client'), key: 'client' },
  { nowrap: true, title: t('torrentDetail.peers.fields.relevance'), key: 'relevance' },
  { nowrap: true, title: t('torrentDetail.peers.fields.files'), key: 'files' },
])
const sortBy = shallowReadonly<{ key: string; order?: boolean | 'asc' | 'desc' }[]>([
  { key: 'dl_speed', order: 'desc' },
  { key: 'up_speed', order: 'desc' },
])

const rid = ref<number>()
const torrentPeers = ref<Map<string, Peer>>(new Map())
const showCountryFlags = ref(false)
const filter = ref('')

const addPeersDialog = ref(false)
const newPeers = ref('')

const syncPeersTask = useTask(function* () {
  yield syncPeers()
}).drop()

const items = computed<PeerType[]>(() => Array.from(torrentPeers.value.entries()).map(([host, peer]) => ({ ...peer, host })))

function sortHost(a: PeerType, b: PeerType) {
  const ipA = a.ip.split('.').map(Number)
  const ipB = b.ip.split('.').map(Number)

  for (let i = 0; i < 4; i++) {
    if (ipA[i] !== ipB[i]) {
      return ipA[i] - ipB[i]
    }
  }

  return a.port - b.port
}

function sortCountry(a: PeerType, b: PeerType) {
  if (a.country && !b.country) return -1
  if (!a.country && b.country) return 1
  if (a.country === b.country) return sortHost(a, b)
  return a.country!.localeCompare(b.country!)
}

function updatePeers(peers: Record<string, Peer>) {
  Object.entries(peers).forEach(([k, v]) => {
    const currentPeer = torrentPeers.value.get(k)
    torrentPeers.value.set(k, { ...currentPeer, ...v })
  })
}

function cleanPeers(peers: string[]) {
  peers.forEach(peer => torrentPeers.value.delete(peer))
}

async function syncPeers() {
  const response = await maindataStore.syncTorrentPeers(props.torrent.hash, rid.value)
  rid.value = response.rid
  showCountryFlags.value = response.show_flags ?? showCountryFlags.value

  if (response.full_update) {
    torrentPeers.value = new Map(Object.entries(response.peers!))
  } else {
    if (response.peers_removed) cleanPeers(response.peers_removed)
    if (response.peers) updatePeers(response.peers)
  }
}

async function addPeers() {
  if (!newPeers.value.length) return

  await maindataStore.addTorrentPeers(props.torrent.hash, newPeers.value.split('\n'))
  resume()
  closeAddDialog()
}

function closeAddDialog() {
  addPeersDialog.value = false
  newPeers.value = ''
}

function banPeer(peer: PeerType) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.banPeers'),
    text: peer.host,
    yesColor: 'error',
    onConfirm: async () => {
      await maindataStore.banPeers([peer.host])
      await preferenceStore.fetchPreferences()
      resume()
    },
  })
}

const {
  isActive: isTimerActive,
  pause,
  resume,
} = useIntervalFn(() => void syncPeersTask.perform(), 2000, {
  immediate: true,
  immediateCallback: true,
})

watch(
  () => props.isActive,
  value => {
    if (value) resume()
    else pause()
  }
)

onBeforeRouteUpdate(() => !addPeersDialog.value)
</script>

<template>
  <v-card>
    <v-empty-state v-if="!torrentPeers.size" :title="$t('torrentDetail.peers.empty')" icon="mdi-account-sync" color="accent" />
    <v-data-table v-else :headers="headers" :items="items" multi-sort :sort-by="sortBy" :search="filter" :filter-keys="['host', 'client', 'files']" :mobile="null">
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

      <template #[`item.host`]="{ item }">
        {{ item.ip }}<span class="text-grey">:{{ item.port }}</span>
      </template>

      <template #[`item.client`]="{ item }">
        <span v-if="item.connection">[{{ item.connection }}]&nbsp;</span>
        <span v-if="item.client">
          {{ item.client }}
          <span v-if="item.peer_id_client">({{ item.peer_id_client }})</span>
        </span>
        <span v-else class="text-grey">?????</span>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="red" icon="mdi-cancel" variant="text" @click="banPeer(item)" />
      </template>

      <template #[`item.country`]="{ item }">
        <div v-if="showCountryFlags" class="cursor-help" :title="item.country">
          <span v-if="!item.country_code" />
          <img v-else-if="isWindows" :alt="codeToFlag(item.country_code).char" :src="codeToFlag(item.country_code).url" :title="item.country" style="max-width: 32px" />
          <span v-else :title="item.country">{{ codeToFlag(item.country_code).char }}</span>
        </div>
      </template>

      <template #[`item.flags`]="{ item }">
        <div v-if="item.flags" class="cursor-help" :title="item.flags_desc">
          {{ item.flags }}
        </div>
        <div v-else>
          {{ $t('common.none') }}
        </div>
      </template>

      <template #[`item.dl_speed`]="{ item }">
        <span class="text-download">
          {{ formatSpeed(item.dl_speed, vuetorrentStore.useBitSpeed) }}
          ({{ formatData(item.downloaded, vuetorrentStore.useBinarySize) }})
        </span>
      </template>
      <template #[`item.up_speed`]="{ item }">
        <span class="text-upload">
          {{ formatSpeed(item.up_speed, vuetorrentStore.useBitSpeed) }}
          ({{ formatData(item.uploaded, vuetorrentStore.useBinarySize) }})
        </span>
      </template>

      <template #[`item.progress`]="{ item }">
        <v-progress-linear
          :model-value="item.progress"
          :max="1"
          :height="20"
          rounded="sm"
          style="width: 8em"
          :color="item.progress === 1 ? 'torrent-ul_stalled' : 'torrent-downloading'">
          {{ formatPercent(item.progress) }}
        </v-progress-linear>
      </template>
      <template #[`item.relevance`]="{ item }">
        {{ formatPercent(item.relevance) }}
      </template>
    </v-data-table>

    <div class="d-flex my-3 flex-gap align-center justify-center">
      <v-dialog v-model="addPeersDialog" max-width="750px">
        <template #activator="{ props: dialogProps }">
          <v-btn v-bind="dialogProps" variant="flat" :text="t('torrentDetail.peers.addPeers.title')" color="accent" />
        </template>
        <v-card :title="$t('torrentDetail.peers.addPeers.title')">
          <v-card-text>
            <v-textarea
              v-model="newPeers"
              :label="t('torrentDetail.peers.addPeers.newPeers')"
              :placeholder="t('torrentDetail.peers.addPeers.newPeersPlaceholder')"
              :hint="t('torrentDetail.peers.addPeers.newPeersHint')" />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="closeAddDialog">
              {{ t('common.cancel') }}
            </v-btn>
            <v-btn color="accent" @click="addPeers">
              {{ t('common.ok') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>
