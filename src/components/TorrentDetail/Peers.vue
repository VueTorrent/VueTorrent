<script lang="ts" setup>
import { codeToFlag, formatData, formatPercent, formatSpeed, isWindows } from '@/helpers'
import { useMaindataStore, useVueTorrentStore } from '@/stores'
import { Peer } from '@/types/qbit/models'
import { Torrent } from '@/types/vuetorrent'
import { onBeforeMount, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

type PeerType = Peer & { host: string }

const { t } = useI18n()
const maindataStore = useMaindataStore()
const vuetorrentStore = useVueTorrentStore()

const loading = ref(false)
const torrentPeers = ref<PeerType[]>([])
const newPeers = ref('')
const timer = ref<NodeJS.Timeout | null>(null)
const addPeersDialog = ref(false)

async function updatePeers() {
  loading.value = true
  torrentPeers.value = Object.entries((await maindataStore.getTorrentPeers(props.torrent.hash)).peers).map(([host, peer]) => ({
    ...peer,
    host
  }))
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

async function banPeer(peer: PeerType) {
  await maindataStore.banPeers([peer.host])
  await updatePeers()
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
  <v-list>
    <template v-for="(peer, index) in torrentPeers">
      <v-divider v-if="index > 0" color="white" />

      <v-list-item>
        <div class="d-flex">
          <div>
            <v-list-item-title class="overflow-visible">
              <span v-if="peer.country_code">
                <img v-if="isWindows" :alt="codeToFlag(peer.country_code).char" :src="codeToFlag(peer.country_code).url" :title="peer.country" style="max-width: 32px" />
                <span v-else :title="peer.country">{{ codeToFlag(peer.country_code).char }}</span>
              </span>
              <span>{{ peer.ip }}</span>
              <span class="text-subtitle-2 text-grey"> :{{ peer.port }}</span>
            </v-list-item-title>

            <v-list-item-subtitle class="d-block">
              <div>
                Flags: <span class="cursor-help" :title="peer.flags_desc">{{ peer.flags }}</span>
              </div>

              <div>Progress: {{ formatPercent(peer.progress) }}</div>

              <div>
                <v-icon icon="mdi-arrow-down" color="download" />
                {{ formatSpeed(peer.dl_speed, vuetorrentStore.useBitSpeed) }}

                <v-icon icon="mdi-arrow-up" color="upload" />
                {{ formatSpeed(peer.up_speed, vuetorrentStore.useBitSpeed) }}
              </div>

              <div>
                {{ formatData(peer.downloaded, vuetorrentStore.useBinarySize) }}
                |
                {{ formatData(peer.uploaded, vuetorrentStore.useBinarySize) }}
              </div>

              <div>Relevance: {{ formatPercent(peer.relevance) }}</div>
            </v-list-item-subtitle>
          </div>

          <v-spacer />

          <div class="d-flex flex-column">
            <v-btn color="red" icon="mdi-cancel" variant="text" @click="banPeer(peer)" />
          </div>
        </div>
      </v-list-item>
    </template>

    <v-list-item v-if="torrentPeers.length === 0">
      {{ $t('torrentDetail.peers.emptyList') }}
    </v-list-item>

    <v-list-item>
      <div :class="['d-flex gap py-5', $vuetify.display.mobile ? 'flex-column' : 'justify-space-evenly']">
        <v-dialog v-model="addPeersDialog" max-width="750px">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="flat" :text="t('torrentDetail.peers.addPeers.title')" color="accent" />
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ t('torrentDetail.peers.addPeers.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newPeers"
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
      </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.gap {
  gap: 8px;
}

.cursor-help {
  cursor: help;
}
</style>
