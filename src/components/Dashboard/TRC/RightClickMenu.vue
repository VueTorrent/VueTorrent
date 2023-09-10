<script setup lang="ts">
import RightClickMenuEntry from '@/components/Dashboard/TRC/RightClickMenuEntry.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import MoveTorrentDialog from '@/components/Dialogs/MoveTorrentDialog.vue'
import RenameTorrentDialog from '@/components/Dialogs/RenameTorrentDialog.vue'
import { useDashboardStore, useMaindataStore, usePreferenceStore } from '@/stores'
import { TRCMenuEntry } from '@/types/VueTorrent'
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()

const trcVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isMultiple = computed(() => dashboardStore.selectedTorrents.length > 1)
const hashes = computed(() => dashboardStore.selectedTorrents)
const hash = computed(() => hashes.value[0])
const torrent = computed(() => maindataStore.getTorrentByHash(hash.value))

async function resumeTorrents() {
  await maindataStore.resumeTorrents(hashes)
}

async function forceResumeTorrents() {
  await maindataStore.forceResumeTorrents(hashes)
}

async function pauseTorrents() {
  await maindataStore.pauseTorrents(hashes)
}

const deleteDialogVisible = ref(false)
const deleteHashes = ref<string[]>([])

function deleteTorrents() {
  deleteHashes.value = [...dashboardStore.selectedTorrents]
  deleteDialogVisible.value = true
}

const moveDialogVisible = ref(false)
const moveHashes = ref<string[]>([])

function moveTorrents() {
  moveHashes.value = [...dashboardStore.selectedTorrents]
  moveDialogVisible.value = true
}

const renameDialogVisible = ref(false)
const renameHash = ref<string>('')

function renameTorrents() {
  renameHash.value = dashboardStore.selectedTorrents[0]
  renameDialogVisible.value = true
}

async function forceRecheck() {
  await maindataStore.recheckTorrents(hashes)
}

async function forceReannounce() {
  await maindataStore.reannounceTorrents(hashes)
}

async function toggleSeqDl() {
  await maindataStore.toggleSeqDl(hashes)
}

async function toggleFLPiecePrio() {
  await maindataStore.toggleFLPiecePrio(hashes)
}

async function toggleAutoTMM() {
  await maindataStore.toggleAutoTmm(hashes, !torrent.value?.auto_tmm)
}

const menuData = computed<TRCMenuEntry[]>(() => [
  {
    text: 'Advanced',
    icon: 'mdi-head-cog',
    children: [
      {
        text: 'Change Location',
        icon: 'mdi-folder',
        action: moveTorrents
      },
      {
        text: 'Rename Torrent',
        icon: 'mdi-rename-box',
        hidden: isMultiple.value,
        action: renameTorrents
      },
      {
        text: 'Force Recheck',
        icon: 'mdi-playlist-check',
        action: forceRecheck
      },
      {
        text: 'Force Reannounce',
        icon: 'mdi-bullhorn',
        action: forceReannounce
      },
      {
        text: 'Sequential Download',
        icon: torrent.value?.seq_dl ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleSeqDl
      },
      {
        text: 'First / Last Priority',
        icon: torrent.value?.f_l_piece_prio ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleFLPiecePrio
      },
      {
        text: 'Auto TMM',
        icon: torrent.value?.auto_tmm ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleAutoTMM
      }
    ]
  },
  {
    text: 'Set Priority',
    icon: 'mdi-priority-high',
    hidden: !preferenceStore.preferences!.queueing_enabled,
    children: [
      {
        text: 'Top Prio',
        icon: 'mdi-priority-high',
        action: () => {
        }
      },
      {
        text: 'Increase Prio',
        icon: 'mdi-arrow-up',
        action: () => {
        }
      },
      {
        text: 'Decrease Prio',
        icon: 'mdi-arrow-down',
        action: () => {
        }
      },
      {
        text: 'Bottom Prio',
        icon: 'mdi-priority-low',
        action: () => {
        }
      }
    ]
  },
  {
    text: 'Set tags',
    icon: 'mdi-tag',
    disabled: maindataStore.tags.length === 0,
    disabledText: 'No tags',
    disabledIcon: 'mdi-tag-off',
    children: maindataStore.tags.map(tag => ({
      text: tag,
      icon: 'mdi-tag',
      action: () => {
      }
    }))
  },
  {
    text: 'Set category',
    icon: 'mdi-label',
    disabled: maindataStore.categories.length === 0,
    disabledText: 'No categories',
    disabledIcon: 'mdi-label-off',
    children: maindataStore.categories.map(category => ({
      text: category.name,
      icon: 'mdi-label',
      action: () => {
      }
    }))
  },
  {
    text: 'Set speed limit',
    icon: 'mdi-speedometer-slow',
    children: [
      {
        text: 'Set download limit',
        icon: 'mdi-download',
        action: () => {
        }
      },
      {
        text: 'Set upload limit',
        icon: 'mdi-upload',
        action: () => {
        }
      },
      {
        text: 'Set share limit',
        icon: 'mdi-account-group',
        action: () => {
        }
      }
    ]
  },
  {
    text: 'Copy',
    icon: 'mdi-content-copy',
    children: [
      {
        text: 'Name',
        icon: 'mdi-alphabetical-variant',
        action: () => {
        }
      },
      {
        text: 'Hash',
        icon: 'mdi-pound',
        action: () => {
        }
      },
      {
        text: 'Magnet',
        icon: 'mdi-magnet',
        action: () => {
        }
      }
    ]
  },
  {
    text: isMultiple.value ? 'Export torrents' : 'Export torrent',
    icon: isMultiple.value ? 'mdi-download-multiple' : 'mdi-download',
    action: () => {
    }
  },
  {
    text: 'Show Info',
    icon: 'mdi-information',
    disabled: isMultiple.value,
    action: () => {
    }
  }
])
</script>

<template>
  <v-menu v-if="trcVisible"
          v-model="trcVisible"
          activator="parent"
          :close-on-content-click="true"
          transition="slide-y-transition"
          scroll-strategy="none">
    <v-list>
      <v-list-item>
        <div class="d-flex justify-space-around">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-play" v-bind="props" @click="resumeTorrents" />
            </template>
            <span>Resume</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-fast-forward" v-bind="props"
                     @click="forceResumeTorrents" />
            </template>
            <span>Force Resume</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-pause" v-bind="props" @click="pauseTorrents" />
            </template>
            <span>Pause</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn color="red"
                     density="compact"
                     variant="plain"
                     icon="mdi-delete-forever"
                     v-bind="props"
                     @click="deleteTorrents" />
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
      </v-list-item>

      <RightClickMenuEntry v-for="entry in menuData" v-bind="entry" />
    </v-list>
  </v-menu>
  <ConfirmDeleteDialog v-model="deleteDialogVisible"
                       disable-activator
                       :hashes="deleteHashes" />
  <MoveTorrentDialog v-model="moveDialogVisible"
                     disable-activator
                     :hashes="moveHashes" />
  <RenameTorrentDialog v-model="renameDialogVisible"
                       disable-activator
                       :hash="renameHash" />
</template>

<style scoped lang="scss">
.menu-scrollable {
  max-height: 500px;
  overflow: visible;
}
</style>