<script setup lang="ts">
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { Peer, Tracker } from '@/types/qbit/models'
import { Torrent } from '@/types/VueTorrent'
import debounce from 'lodash.debounce'
import { onBeforeMount, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { codeToFlag, formatData, formatPercent, formatSpeed, isWindows } from '@/helpers'

const props = defineProps<{ torrent: Torrent, isActive: boolean }>()

type PeerType = Peer & { host: string, isCopied: boolean }

const { t } = useI18n()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const headers = [
  { title: t('torrentDetail.peers.table.host'), key: 'host' },
  { title: t('torrentDetail.peers.table.connection'), key: 'connection' },
  { title: t('torrentDetail.peers.table.flags'), key: 'flags' },
  { title: t('torrentDetail.peers.table.client'), key: 'client' },
  { title: t('torrentDetail.peers.table.progress'), key: 'progress' },
  { title: t('torrentDetail.peers.table.downloadSpeed'), key: 'dl_speed' },
  { title: t('torrentDetail.peers.table.downloaded'), key: 'downloaded' },
  { title: t('torrentDetail.peers.table.upSpeed'), key: 'up_speed' },
  { title: t('torrentDetail.peers.table.uploaded'), key: 'uploaded' },
  { title: t('torrentDetail.peers.table.relevance'), key: 'relevance' },
  { title: t('torrentDetail.peers.table.files'), key: 'files' }
]

const loading = ref(false)
const torrentPeers = ref<PeerType[]>([])
const newPeers = ref('')
const selectedPeers = ref<string[]>([])
const timer = ref<NodeJS.Timeout | null>(null)
const addPeersDialog = ref(false)
const removePeersDialog = ref(false)

const copyDebounce = debounce((peer: PeerType) => peer.isCopied = false, 1000)

async function copyHost(peer: PeerType) {
  peer.isCopied = true
  await navigator.clipboard.writeText(peer.host)
  copyDebounce(peer)
}

async function updatePeers() {
  loading.value = true
  torrentPeers.value = Object.entries((await maindataStore.getTorrentPeers(props.torrent.hash)).peers)
  .map(([host, peer]) => ({ ...peer, host, isCopied: false }))
  loading.value = false
}

async function addPeers() {
  if (!newPeers.value.length) return

  await maindataStore.addTorrentPeers(props.torrent.hash, newPeers.value.split('\n'))
  await updatePeers()
  closeAddDialog()
}

function closeAddDialog() {
  addPeersDialog.value = false
  newPeers.value = ''
}

async function banPeers() {
  if (!selectedPeers.value.length) return

  await maindataStore.banPeers(selectedPeers.value)
  await updatePeers()
  closeRemoveDialog()
}

function closeRemoveDialog() {
  removePeersDialog.value = false
  selectedPeers.value = []
}

async function setupTimer(forceState?: boolean) {
  if (forceState ?? props.isActive) {
    await updatePeers()
    timer.value = setInterval(updatePeers, 5000)
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
  <v-data-table v-model="selectedPeers"
                :headers="headers"
                :items-per-page="-1"
                item-value="host"
                item-selectable="isSelectable"
                select-strategy="all"
                show-select
                :loading="loading"
                :items="torrentPeers"
                :sort-by="[{key: 'tier', order: 'asc'}]">

    <template v-slot:[`item.host`]="{ item }">
      <v-tooltip text="Click to copy host" location="top">
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="text-no-wrap pointer" @click="copyHost(item.raw)">
            <span v-if="item.raw.country_code">
              <img v-if="isWindows" :title="item.raw.country" :alt="codeToFlag(item.raw.country_code).char"
                   :src="codeToFlag(item.raw.country_code).url" />
              <span v-else :title="item.raw.country">{{ codeToFlag(item.raw.country_code).char }}</span>
            </span>
            {{ item.raw.ip }}
            <span class="text-subtitle-2 text-grey">:{{ item.raw.port }}</span>
            <v-icon :icon="item.raw.isCopied ? 'mdi-check' : 'mdi-content-copy'"
                    class="ml-1"
                    :color="item.raw.isCopied ? 'success' : 'grey'"
                    size="x-small" />
          </div>
        </template>
      </v-tooltip>
    </template>
    <template v-slot:[`item.flags`]="{ item }">
      <span :title="item.raw.flags_desc">{{ item.raw.flags }}</span>
    </template>
    <template v-slot:[`item.progress`]="{ item }">
      {{ formatPercent(item.raw.progress) }}
    </template>
    <template v-slot:[`item.dl_speed`]="{ item }">
      {{ formatSpeed(item.raw.dl_speed, vuetorrentStore.useBitSpeed) }}
    </template>
    <template v-slot:[`item.downloaded`]="{ item }">
      {{ formatData(item.raw.downloaded, vuetorrentStore.useBinarySize) }}
    </template>
    <template v-slot:[`item.up_speed`]="{ item }">
      {{ formatSpeed(item.raw.up_speed, vuetorrentStore.useBitSpeed) }}
    </template>
    <template v-slot:[`item.uploaded`]="{ item }">
      {{ formatData(item.raw.uploaded, vuetorrentStore.useBinarySize) }}
    </template>
    <template v-slot:[`item.relevance`]="{ item }">
      {{ formatPercent(item.raw.relevance) }}
    </template>

    <template v-slot:bottom>
      <div :class="['d-flex gap py-5', $vuetify.display.mobile ? 'flex-column' : 'justify-space-evenly']">
        <v-dialog v-model="addPeersDialog" max-width="750px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props"
                   variant="flat"
                   :text="t('torrentDetail.peers.addPeers.title')"
                   color="accent" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ t('torrentDetail.peers.addPeers.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="newPeers"
                                :label="t('torrentDetail.peers.addPeers.newPeers')"
                                :placeholder="t('torrentDetail.peers.addPeers.newPeersPlaceholder')"
                                :hint="t('torrentDetail.peers.addPeers.newPeersHint')" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="error" @click="closeAddDialog">{{ t('common.cancel') }}</v-btn>
              <v-btn color="accent" @click="addPeers">{{ t('common.ok') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="removePeersDialog" max-width="750px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props"
                   variant="flat"
                   :disabled="!selectedPeers.length"
                   :text="t('torrentDetail.peers.banPeers.title')"
                   color="error" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ t('torrentDetail.peers.banPeers.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <div class="d-flex flex-wrap gap">
                  <span class="pa-1 border" v-for="peer in selectedPeers">{{ peer }}</span>
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="accent" @click="closeRemoveDialog">{{ t('common.cancel') }}</v-btn>
              <v-btn color="error" @click="banPeers">{{ t('common.ok') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>