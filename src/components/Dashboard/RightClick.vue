<script setup lang="ts">
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import RightClickMenu from '@/components/Core/RightClickMenu'
import BulkUpdateTrackersDialog from '@/components/Dialogs/BulkUpdateTrackers/BulkUpdateTrackersDialog.vue'
import CategoryFormDialog from '@/components/Dialogs/CategoryFormDialog.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/Confirm/ConfirmDeleteDialog.vue'
import MoveTorrentDialog from '@/components/Dialogs/MoveTorrentDialog.vue'
import RenameTorrentDialog from '@/components/Dialogs/RenameTorrentDialog.vue'
import ShareLimitDialog from '@/components/Dialogs/ShareLimitDialog.vue'
import SpeedLimitDialog from '@/components/Dialogs/SpeedLimitDialog.vue'
import TagFormDialog from '@/components/Dialogs/TagFormDialog.vue'
import { useI18nUtils } from '@/composables'
import { downloadFile } from '@/helpers'
import { useAppStore, useCategoryStore, useDashboardStore, useDialogStore, useMaindataStore, usePreferenceStore, useTagStore, useTorrentStore } from '@/stores'
import { RightClickMenuEntryType } from '@/types/vuetorrent'

const rightClickProperties = defineModel<{ isVisible: boolean; offset: [number, number] }>({ required: true })

const { t } = useI18nUtils()
const router = useRouter()
const appStore = useAppStore()
const categoryStore = useCategoryStore()
const dashboardStore = useDashboardStore()
const dialogStore = useDialogStore()
const maindataStore = useMaindataStore()
const preferenceStore = usePreferenceStore()
const tagStore = useTagStore()
const torrentStore = useTorrentStore()

const isAllTorrentsSelected = computed(() => torrentStore.torrents.length <= dashboardStore.selectedTorrents.length)
const isMultiple = computed(() => dashboardStore.selectedTorrents.length > 1)
const hashes = computed(() => dashboardStore.selectedTorrents)
const hash = computed(() => hashes.value[0])
const torrent = computed(() => torrentStore.getTorrentByHash(hash.value))
const torrents = computed(() => dashboardStore.selectedTorrents.map(torrentStore.getTorrentByHash).filter(torrent => !!torrent))

async function resumeTorrents() {
  await torrentStore.resumeTorrents(hashes)
}

async function forceStartTorrents() {
  await torrentStore.forceStartTorrents(hashes)
}

async function pauseTorrents() {
  await torrentStore.pauseTorrents(hashes)
}

function deleteTorrents() {
  dialogStore.createDialog(ConfirmDeleteDialog, { hashes: [...dashboardStore.selectedTorrents] })
}

function setDownloadPath() {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [...dashboardStore.selectedTorrents], mode: 'dl' })
}

function setSavePath() {
  dialogStore.createDialog(MoveTorrentDialog, { hashes: [...dashboardStore.selectedTorrents], mode: 'save' })
}

function renameTorrents() {
  dialogStore.createDialog(RenameTorrentDialog, { hash: dashboardStore.selectedTorrents[0] })
}

async function forceRecheck() {
  await torrentStore.recheckTorrents(hashes)
}

async function forceReannounce() {
  await torrentStore.reannounceTorrents(hashes)
}

async function toggleSuperSeeding() {
  await torrentStore.setSuperSeeding(hashes, !torrent.value?.super_seeding)
}

async function toggleSeqDl() {
  await torrentStore.toggleSeqDl(hashes)
}

async function toggleFLPiecePrio() {
  await torrentStore.toggleFLPiecePrio(hashes)
}

async function toggleAutoTMM() {
  await torrentStore.toggleAutoTmm(hashes, !torrent.value?.auto_tmm)
}

function hasTag(tag: string) {
  return torrents.value.every(torrent => torrent && torrent.tags && torrent.tags.includes(tag))
}

function openNewTagFormDialog() {
  const selectedHashes = hashes.value
  dialogStore.createDialog(TagFormDialog, { onSubmit: tags => torrentStore.addTorrentTags(selectedHashes, tags) }, maindataStore.forceMaindataSync)
}

function deleteUnusedTags() {
  dialogStore.confirmListAction({
    title: t('dialogs.confirm.deleteUnusedTags'),
    items: tagStore.unusedTags,
    yesColor: 'error',
    onConfirm: async () => {
      await tagStore.deleteUnusedTags()
    }
  })
}

async function clearAllTags() {
  await torrentStore.removeTorrentTags(hashes.value)
}

function openNewCategoryFormDialog() {
  const selectedHashes = hashes.value
  dialogStore.createDialog(CategoryFormDialog, { onSubmit: cat => torrentStore.setTorrentCategory(selectedHashes, cat.name) }, maindataStore.forceMaindataSync)
}

function deleteUnusedCategories() {
  dialogStore.confirmListAction({
    title: t('dialogs.confirm.deleteUnusedCategories'),
    items: categoryStore.unusedCategories,
    yesColor: 'error',
    onConfirm: async () => {
      await categoryStore.deleteUnusedCategories()
    }
  })
}

async function clearCategory() {
  await torrentStore.setTorrentCategory(hashes.value, '').then(maindataStore.forceMaindataSync)
}

async function toggleTag(tag: string) {
  if (hasTag(tag)) await torrentStore.removeTorrentTags(hashes.value, [tag])
  else await torrentStore.addTorrentTags(hashes.value, [tag])
}

async function copyValue(valueToCopy: string) {
  try {
    await navigator.clipboard.writeText(valueToCopy)
  } catch (_) {
    toast.error(t('toast.copy.error'))
    return
  }

  toast.success(t('toast.copy.success'))
}

function setDownloadLimit() {
  dialogStore.createDialog(SpeedLimitDialog, { hashes: hashes.value, mode: 'download' })
}

function setUploadLimit() {
  dialogStore.createDialog(SpeedLimitDialog, { hashes: hashes.value, mode: 'upload' })
}

function setShareLimit() {
  dialogStore.createDialog(ShareLimitDialog, { hashes: hashes.value })
}

function bulkUpdatetrackers() {
  dialogStore.createDialog(BulkUpdateTrackersDialog, { hashes: hashes.value })
}

async function exportTorrents() {
  const ts = [...torrents.value]
  if (ts.length === 1) {
    const t = ts[0]
    const blob = await torrentStore.exportTorrent(t.hash)
    downloadFile(`${t.name}.torrent`, blob)
    return
  }

  const zipWriter = new ZipWriter(new BlobWriter('application/zip'), { bufferedWrite: true })
  await Promise.all(ts.map(t => torrentStore.exportTorrent(t.hash).then(blob => zipWriter.add(`${t.name}-${t.truncated_hash}.torrent`, new BlobReader(blob)))))
  downloadFile('torrents.zip', await zipWriter.close())
}

const menuData = computed<RightClickMenuEntryType[]>(() => [
  {
    text: t('dashboard.right_click.advanced.title'),
    icon: 'mdi-head-cog',
    children: [
      {
        text: t('dashboard.right_click.advanced.download_path'),
        icon: 'mdi-tray-arrow-down',
        action: setDownloadPath
      },
      {
        text: t('dashboard.right_click.advanced.save_path'),
        icon: 'mdi-content-save',
        action: setSavePath
      },
      {
        text: t('dashboard.right_click.advanced.edit_trackers'),
        icon: 'mdi-link-edit',
        action: bulkUpdatetrackers
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
        action: () => void forceRecheck()
      },
      {
        text: t('dashboard.right_click.advanced.reannounce'),
        icon: 'mdi-bullhorn',
        action: () => void forceReannounce()
      },
      {
        text: t('dashboard.right_click.advanced.super_seeding'),
        icon: torrent.value?.super_seeding ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => void toggleSuperSeeding()
      },
      {
        text: t('dashboard.right_click.advanced.seq_dl'),
        icon: torrent.value?.seq_dl ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => void toggleSeqDl()
      },
      {
        text: t('dashboard.right_click.advanced.f_l_prio'),
        icon: torrent.value?.f_l_piece_prio ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => void toggleFLPiecePrio()
      },
      {
        text: t('dashboard.right_click.advanced.auto_tmm'),
        icon: torrent.value?.auto_tmm ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
        action: () => void toggleAutoTMM()
      }
    ]
  },
  {
    text: t('dashboard.right_click.priority.title'),
    icon: 'mdi-priority-high',
    hidden: !(preferenceStore.preferences?.queueing_enabled || false),
    children: [
      {
        text: t('dashboard.right_click.priority.top'),
        icon: 'mdi-priority-high',
        action: () => void torrentStore.setTorrentPriority(hashes.value, 'topPrio')
      },
      {
        text: t('dashboard.right_click.priority.increase'),
        icon: 'mdi-arrow-up',
        action: () => void torrentStore.setTorrentPriority(hashes.value, 'increasePrio')
      },
      {
        text: t('dashboard.right_click.priority.decrease'),
        icon: 'mdi-arrow-down',
        action: () => void torrentStore.setTorrentPriority(hashes.value, 'decreasePrio')
      },
      {
        text: t('dashboard.right_click.priority.bottom'),
        icon: 'mdi-priority-low',
        action: () => void torrentStore.setTorrentPriority(hashes.value, 'bottomPrio')
      }
    ]
  },
  {
    text: t('dashboard.right_click.tags.title'),
    icon: 'mdi-tag',
    disabled: tagStore.tags.length === 0,
    disabledText: t('dashboard.right_click.tags.disabled_title'),
    disabledIcon: 'mdi-tag-off',
    children: tagStore.tags.map(tag => ({
      text: tag,
      icon: hasTag(tag) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline',
      action: async () => await toggleTag(tag).then(maindataStore.forceMaindataSync)
    })),
    slots: {
      top: [
        {
          text: t('settings.tagsAndCategories.createNewTag'),
          icon: 'mdi-plus',
          action: openNewTagFormDialog
        },
        {
          text: t('settings.tagsAndCategories.deleteUnusedTags'),
          icon: 'mdi-delete',
          hidden: tagStore.deleteUnusedTags.length === 0,
          action: () => {
            deleteUnusedTags()
            maindataStore.forceMaindataSync()
          }
        },
        {
          text: t('dashboard.right_click.tags.clear_all'),
          icon: 'mdi-playlist-remove',
          hidden: torrent.value?.tags.length === 0,
          action: () => void clearAllTags().then(maindataStore.forceMaindataSync)
        }
      ]
    }
  },
  {
    text: t('dashboard.right_click.category.title'),
    icon: 'mdi-label',
    disabled: categoryStore.categories.length === 0,
    disabledText: t('dashboard.right_click.category.disabled_title'),
    disabledIcon: 'mdi-label-off',
    children: categoryStore.categories.map(category => ({
      text: category.name,
      icon: torrent.value?.category === category.name ? 'mdi-label-variant' : undefined,
      action: async () => await torrentStore.setTorrentCategory(hashes.value, category.name).then(maindataStore.forceMaindataSync)
    })),
    slots: {
      top: [
        {
          text: t('settings.tagsAndCategories.createNewCategory'),
          icon: 'mdi-plus',
          action: openNewCategoryFormDialog
        },
        {
          text: t('settings.tagsAndCategories.deleteUnusedCategories'),
          icon: 'mdi-delete',
          hidden: categoryStore.deleteUnusedCategories.length === 0,
          action: () => {
            deleteUnusedCategories()
            maindataStore.forceMaindataSync()
          }
        },
        {
          text: t('dashboard.right_click.category.clear'),
          icon: 'mdi-backspace-reverse',
          hidden: torrent.value?.category.length === 0,
          action: () => void clearCategory().then(maindataStore.forceMaindataSync)
        }
      ]
    }
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
    disabled: !window.isSecureContext,
    hidden: isMultiple.value,
    children: [
      {
        text: t('dashboard.right_click.copy.name'),
        icon: 'mdi-alphabetical-variant',
        action: () => torrent.value && void copyValue(torrent.value.name)
      },
      {
        text: t('dashboard.right_click.copy.hash'),
        icon: 'mdi-pound',
        action: () => void copyValue(hash.value)
      },
      {
        text: t('dashboard.right_click.copy.magnet'),
        icon: 'mdi-magnet',
        action: () => torrent.value && void copyValue(torrent.value.magnet)
      },
      {
        text: t('dashboard.right_click.copy.comment'),
        icon: 'mdi-comment-text',
        hidden: !appStore.isFeatureAvailable('5.0.0'),
        disabled: !torrent.value?.comment,
        action: () => torrent.value && void copyValue(torrent.value.comment)
      }
    ]
  },
  {
    text: t('dashboard.right_click.selection.title'),
    icon: 'mdi-select',
    children: [
      {
        text: t('common.selectNone'),
        icon: 'mdi-select',
        hidden: !dashboardStore.isSelectionMultiple,
        action: () => dashboardStore.unselectAllTorrents()
      },
      {
        text: t('common.selectAll'),
        icon: 'mdi-select-all',
        hidden: isAllTorrentsSelected.value,
        action: () => dashboardStore.selectAllTorrents()
      },
      {
        text: t('dashboard.right_click.selection.disable_select_mode'),
        icon: 'mdi-checkbox-blank-outline',
        hidden: !dashboardStore.isSelectionMultiple,
        action: () => (dashboardStore.isSelectionMultiple = false)
      },
      {
        text: t('dashboard.right_click.selection.enable_select_mode'),
        icon: 'mdi-checkbox-marked',
        hidden: dashboardStore.isSelectionMultiple,
        action: () => (dashboardStore.isSelectionMultiple = true)
      }
    ]
  },
  {
    text: t('dashboard.right_click.export', dashboardStore.selectedTorrents.length),
    icon: isMultiple.value ? 'mdi-download-multiple' : 'mdi-download',
    action: () => void exportTorrents()
  },
  {
    text: t('dashboard.right_click.info'),
    icon: 'mdi-information',
    hidden: isMultiple.value,
    action: (): void => void router.push({ name: 'torrentDetail', params: { hash: hash.value } })
  }
])
</script>

<template>
  <div :style="`position: absolute; left: ${rightClickProperties.offset[0]}px; top: ${rightClickProperties.offset[1]}px;`">
    <RightClickMenu v-model="rightClickProperties.isVisible" :menu-data="menuData">
      <template #top>
        <v-list-item>
          <div class="d-flex justify-space-around">
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn density="compact" variant="plain" icon="mdi-play" v-bind="props" @click="resumeTorrents" />
              </template>
              <span>{{ t('dashboard.right_click.top.resume') }}</span>
            </v-tooltip>

            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn density="compact" variant="plain" icon="mdi-fast-forward" v-bind="props" @click="forceStartTorrents" />
              </template>
              <span>{{ t('dashboard.right_click.top.force_resume') }}</span>
            </v-tooltip>

            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn density="compact" variant="plain" icon="mdi-pause" v-bind="props" @click="pauseTorrents" />
              </template>
              <span>{{ t('dashboard.right_click.top.pause') }}</span>
            </v-tooltip>

            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn color="red" density="compact" variant="plain" icon="mdi-delete-forever" v-bind="props" @click="deleteTorrents" />
              </template>
              <span>{{ t('dashboard.right_click.top.delete') }}</span>
            </v-tooltip>
          </div>
        </v-list-item>
      </template>
    </RightClickMenu>
  </div>
</template>

<style scoped></style>
