<script setup lang="ts">
import RightClickMenuEntry from '@/components/Dashboard/TRC/RightClickMenuEntry.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import { useDashboardStore, useMaindataStore, usePreferenceStore } from '@/stores'
import { TRCMenuEntry } from '@/types/VueTorrent'
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
  anchor?: string
}>()
const emit = defineEmits(['update:modelValue'])

const dashboardStore = useDashboardStore()
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()

const trcVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const deleteDialogVisible = ref(false)
const deleteHashes = ref<string[]>()

const isMultiple = computed(() => dashboardStore.selectedTorrents.length > 1)
const torrent = computed(() => maindataStore.getTorrentByHash(dashboardStore.selectedTorrents[0]))

const menuData = computed<TRCMenuEntry[]>(() => [
  {
    text: 'Advanced',
    icon: 'mdi-head-cog',
    children: [
      {
        text: 'Change Location',
        icon: 'mdi-folder',
        action: () => {
        }
      },
      {
        text: 'Rename Torrent',
        icon: 'mdi-rename-box',
        action: () => {
        }
      },
      {
        text: 'Force Recheck',
        icon: 'mdi-playlist-check',
        action: () => {
        }
      },
      {
        text: 'Force Reannounce',
        icon: 'mdi-bullhorn',
        action: () => {
        }
      },
      {
        text: 'Sequential Download',
        icon: torrent.value?.seq_dl ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => {
        }
      },
      {
        text: 'First / Last Priority',
        icon: torrent.value?.f_l_piece_prio ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => {
        }
      },
      {
        text: 'Auto TMM',
        icon: torrent.value?.auto_tmm ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => {
        }
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
        action: () => {}
      },
      {
        text: 'Increase Prio',
        icon: 'mdi-arrow-up',
        action: () => {}
      },
      {
        text: 'Decrease Prio',
        icon: 'mdi-arrow-down',
        action: () => {}
      },
      {
        text: 'Bottom Prio',
        icon: 'mdi-priority-low',
        action: () => {}
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

function onDelete() {
  deleteHashes.value = [...dashboardStore.selectedTorrents]
  deleteDialogVisible.value = true
}
</script>

<template>
  <v-menu v-model="trcVisible"
          :attach="anchor"
          :close-on-content-click="true"
          max-height="500"
          transition="slide-y-transition"
          z-index="999">
    <v-list>
      <v-list-item>
        <div class="d-flex justify-space-around">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-play" v-bind="props" />
            </template>
            <span>Resume</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-fast-forward" v-bind="props" />
            </template>
            <span>Force Resume</span>
          </v-tooltip>

          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn density="compact" variant="plain" icon="mdi-pause" v-bind="props" />
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
                     @click="onDelete" />
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
      </v-list-item>

      <RightClickMenuEntry v-for="entry in menuData" v-bind="entry" />
    </v-list>
  </v-menu>
  <ConfirmDeleteDialog v-if="deleteDialogVisible" v-model="deleteDialogVisible" disable-activator :hashes="deleteHashes" />
</template>

<style scoped lang="scss">
.menu-scrollable {
  max-height: 500px;
  overflow: visible;
}
</style>