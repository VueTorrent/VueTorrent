<script setup lang="ts">
import RightClickMenuEntry from '@/components/Dashboard/TRC/RightClickMenuEntry.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/ConfirmDeleteDialog.vue'
import MoveTorrentDialog from '@/components/Dialogs/MoveTorrentDialog.vue'
import RenameTorrentDialog from '@/components/Dialogs/RenameTorrentDialog.vue'
import ShareLimitDialog from '@/components/Dialogs/ShareLimitDialog.vue'
import SpeedLimitDialog from '@/components/Dialogs/SpeedLimitDialog.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useDialogStore } from '@/stores/dialog'
import { useMaindataStore } from '@/stores/maindata'
import { usePreferenceStore } from '@/stores/preferences'
import { TRCMenuEntry } from '@/types/vuetorrent'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const router = useRouter()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()

const trcVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const isMultiple = computed(() => dashboardStore.selectedTorrents.length > 1)
const hashes = computed(() => dashboardStore.selectedTorrents)
const hash = computed(() => hashes.value[0])
const torrent = computed(() => maindataStore.getTorrentByHash(hash.value))
const torrents = computed(() => dashboardStore.selectedTorrents.map(maindataStore.getTorrentByHash).filter(torrent => !!torrent))
const availableCategories = computed(() => [{ name: '' }, ...maindataStore.categories])

async function resumeTorrents() {
  await maindataStore.resumeTorrents(hashes)
}

async function forceResumeTorrents() {
  await maindataStore.forceResumeTorrents(hashes)
}

async function pauseTorrents() {
  await maindataStore.pauseTorrents(hashes)
}

function deleteTorrents() {
  dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [...dashboardStore.selectedTorrents] })
}

function moveTorrents() {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [...dashboardStore.selectedTorrents] })
}

function renameTorrents() {
  dialogStore.createDialog(RenameTorrentDialog, { hash: dashboardStore.selectedTorrents[0] })
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

function hasTag(tag: string) {
  return torrents.value.every(torrent => torrent && torrent.tags && torrent.tags.includes(tag))
}

async function toggleTag(tag: string) {
  if (hasTag(tag)) await maindataStore.removeTorrentTags(hashes.value, [tag])
  else await maindataStore.addTorrentTags(hashes.value, [tag])
}

async function copyValue(valueToCopy: string) {
  await navigator.clipboard.writeText(valueToCopy)
}

function setDownloadLimit() {
  dialogStore.createDialog(SpeedLimitDialog, { hash: hash.value, mode: 'download' })
}

function setUploadLimit() {
  dialogStore.createDialog(SpeedLimitDialog, { hash: hash.value, mode: 'upload' })
}

function setShareLimit() {
  dialogStore.createDialog(ShareLimitDialog, { hash: hash.value })
}

async function exportTorrents() {
  hashes.value.forEach(hash => {
    maindataStore.exportTorrent(hash).then(blob => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.style.opacity = '0'
      link.setAttribute('download', `${hash}.torrent`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  })
}

const menuData = computed<TRCMenuEntry[]>(() => [
  {
    text: t('dashboard.right_click.advanced.title'),
    icon: 'mdi-head-cog',
    children: [
      {
        text: t('dashboard.right_click.advanced.change_location'),
        icon: 'mdi-folder',
        action: moveTorrents
      },
      {
        text: t('dashboard.right_click.advanced.rename'),
        icon: 'mdi-rename-box',
        hidden: isMultiple.value,
        action: renameTorrents
      },
      {
        text: t('dashboard.right_click.advanced.recheck'),
        icon: 'mdi-playlist-check',
        action: forceRecheck
      },
      {
        text: t('dashboard.right_click.advanced.reannounce'),
        icon: 'mdi-bullhorn',
        action: forceReannounce
      },
      {
        text: t('dashboard.right_click.advanced.seq_dl'),
        icon: torrent.value?.seq_dl ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleSeqDl
      },
      {
        text: t('dashboard.right_click.advanced.f_l_prio'),
        icon: torrent.value?.f_l_piece_prio ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleFLPiecePrio
      },
      {
        text: t('dashboard.right_click.advanced.auto_tmm'),
        icon: torrent.value?.auto_tmm ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: toggleAutoTMM
      }
    ]
  },
  {
    text: t('dashboard.right_click.priority.title'),
    icon: 'mdi-priority-high',
    hidden: !preferenceStore.preferences!.queueing_enabled,
    children: [
      {
        text: t('dashboard.right_click.priority.top'),
        icon: 'mdi-priority-high',
        action: async () => await maindataStore.setTorrentPriority(hashes.value, 'topPrio')
      },
      {
        text: t('dashboard.right_click.priority.increase'),
        icon: 'mdi-arrow-up',
        action: async () => await maindataStore.setTorrentPriority(hashes.value, 'increasePrio')
      },
      {
        text: t('dashboard.right_click.priority.decrease'),
        icon: 'mdi-arrow-down',
        action: async () => await maindataStore.setTorrentPriority(hashes.value, 'decreasePrio')
      },
      {
        text: t('dashboard.right_click.priority.bottom'),
        icon: 'mdi-priority-low',
        action: async () => await maindataStore.setTorrentPriority(hashes.value, 'bottomPrio')
      }
    ]
  },
  {
    text: t('dashboard.right_click.tags.title'),
    icon: 'mdi-tag',
    disabled: maindataStore.tags.length === 0,
    disabledText: t('dashboard.right_click.tags.disabled_title'),
    disabledIcon: 'mdi-tag-off',
    children: maindataStore.tags.map(tag => ({
      text: tag,
      icon: hasTag(tag) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
      action: async () => await toggleTag(tag)
    }))
  },
  {
    text: t('dashboard.right_click.category.title'),
    icon: 'mdi-label',
    disabled: maindataStore.categories.length === 0,
    disabledText: t('dashboard.right_click.category.disabled_title'),
    disabledIcon: 'mdi-label-off',
    children: availableCategories.value.map(category => ({
      text: category.name === '' ? t('dashboard.right_click.category.clear') : category.name,
      action: async () => await maindataStore.setTorrentCategory(hashes.value, category.name)
    }))
  },
  {
    text: t('dashboard.right_click.speed_limit.title'),
    icon: 'mdi-speedometer-slow',
    children: [
      {
        text: t('dashboard.right_click.speed_limit.download'),
        icon: 'mdi-download',
        action: setDownloadLimit
      },
      {
        text: t('dashboard.right_click.speed_limit.upload'),
        icon: 'mdi-upload',
        action: setUploadLimit
      },
      {
        text: t('dashboard.right_click.speed_limit.share'),
        icon: 'mdi-account-group',
        action: setShareLimit
      }
    ]
  },
  {
    text: t('dashboard.right_click.copy.title'),
    icon: 'mdi-content-copy',
    hidden: isMultiple.value,
    children: [
      {
        text: t('dashboard.right_click.copy.name'),
        icon: 'mdi-alphabetical-variant',
        action: async () => torrent.value && (await copyValue(torrent.value.name))
      },
      {
        text: t('dashboard.right_click.copy.hash'),
        icon: 'mdi-pound',
        action: async () => await copyValue(hash.value)
      },
      {
        text: t('dashboard.right_click.copy.magnet'),
        icon: 'mdi-magnet',
        action: async () => torrent.value && (await copyValue(torrent.value.magnet))
      }
    ]
  },
  {
    text: t('dashboard.right_click.export', dashboardStore.selectedTorrents.length),
    icon: isMultiple.value ? 'mdi-download-multiple' : 'mdi-download',
    action: exportTorrents
  },
  {
    text: t('dashboard.right_click.info'),
    icon: 'mdi-information',
    hidden: isMultiple.value,
    action: () => router.push({ name: 'torrentDetail', params: { hash: hash.value } })
  }
])
</script>

<template>
  <v-menu v-if="trcVisible" v-model="trcVisible" activator="parent" :close-on-content-click="true" transition="slide-y-transition" scroll-strategy="none">
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
              <v-btn density="compact" variant="plain" icon="mdi-fast-forward" v-bind="props" @click="forceResumeTorrents" />
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
              <v-btn color="red" density="compact" variant="plain" icon="mdi-delete-forever" v-bind="props" @click="deleteTorrents" />
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
      </v-list-item>

      <RightClickMenuEntry v-for="entry in menuData" v-bind="entry" />
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
.menu-scrollable {
  max-height: 500px;
  overflow: visible;
}
</style>
