<script setup lang="ts">
import HistoryField from '@/components/Core/HistoryField.vue'
import { useDialog } from '@/composables'
import { HistoryKey } from '@/constants/vuetorrent'
import { getFileIcon } from '@/helpers'
import { useContentStore } from '@/stores'
import { TreeFolder, TreeNode } from '@/types/vuetorrent'
import { computed, onMounted, reactive, readonly, ref, watch } from 'vue'
import { useI18nUtils } from '@/composables'
import { toast } from 'vue3-toastify'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps<{
  guid: string
  node: TreeFolder
  hash: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const contentStore = useContentStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const hasDuplicated = ref(false)
const regexpInput = ref('')
const regexpEl = ref<typeof HistoryField>()
const regexpFlagsInput = ref([])
const targetInput = ref('')
const targetEl = ref<typeof HistoryField>()
const running = ref(false)

const rules = [(v: string) => !!v]
const headers = readonly([
  { fixed: true, sortable: false, key: 'selected', width: '50px' },
  { title: t('dialogs.bulkRenameFiles.col_origin_name'), sortable: false, key: 'name' },
  { title: t('dialogs.bulkRenameFiles.col_result_name'), sortable: false, key: 'targetName' }
])

type ItemRow<T extends TreeNode = TreeNode> = Pick<T, 'name' | 'fullName' | 'type'> & {
  indent: number
  selected: boolean
  show: boolean
  folded?: boolean // folder only
  indeterminate?: boolean // folder only
  parentItem?: ItemRow
  duplicated?: boolean
  notChanged?: boolean
  targetName?: string
  targetFullName?: string
  node: T
}
const items = reactive<ItemRow[]>([])
const candidateItems = computed(() => items.filter(item => item.type === 'file' && item.selected && item.targetName && item.name !== item.targetName))

/** parse TreeNode to plain list */
const parseNode = (node: TreeNode, parentItem?: ItemRow, indent: number = 0) => {
  const item: ItemRow = {
    indent,
    name: node.name,
    fullName: node.fullName,
    parentItem,
    show: true,
    folded: false,
    selected: false,
    type: node.type,
    /** keep the corresponding node, for expand/collapse folder */
    node
  }
  items.push(item)
  if (node.type === 'folder') {
    for (const child of node.children) {
      parseNode(child, item, indent + 1)
    }
  }
}

const toggleFolderFolded = (item: ItemRow, folded: boolean) => {
  item.folded = folded
  ;(item as ItemRow<TreeFolder>).node.children.forEach(node => {
    const correspondence = items.find(item => item.node.id === node.id)!
    correspondence.show = !folded
    if (correspondence.type === 'folder') {
      if (folded) {
        toggleFolderFolded(correspondence, folded)
      }
    }
  })
}

/**
 * @return
 *  * -1: not selected
 *  * 0: indeterminate(folder only)
 *  * 1: selected
 */
const detectIndeterminate = (node: TreeNode): -1 | 0 | 1 => {
  const correspondence = items.find(item => item.node.id === node.id)!
  if (node.type === 'folder') {
    let selectedLength = 0
    let indeterminateLength = 0
    node.children.forEach(item => {
      switch (detectIndeterminate(item)) {
        case 1:
          selectedLength++
          break
        case 0:
          indeterminateLength++
          break
      }
    })
    if (selectedLength === 0 && indeterminateLength === 0) {
      correspondence.selected = false
      correspondence.indeterminate = false
      return -1
    } else if (selectedLength === node.children.length) {
      correspondence.selected = true
      correspondence.indeterminate = false
      return 1
    } else {
      correspondence.indeterminate = true
      return 0
    }
  } else {
    correspondence.indeterminate = false
    return correspondence.selected ? 1 : -1
  }
}

const folderCheckChange = (item: ItemRow) => {
  const fn = (item: ItemRow) => {
    ;(item as ItemRow<TreeFolder>).node.children.forEach(child => {
      const foundRow = items.find(row => row.node.id === child.id)
      if (foundRow) {
        foundRow.selected = item.selected
        if (foundRow.selected) {
          // unfold all children when selected
          foundRow.show = true
          foundRow.folded = false
        }
        if (foundRow.type === 'folder') {
          fn(foundRow as ItemRow<TreeFolder>)
        }
      }
    })
    // unfold when selected
    if (item.selected) {
      item.show = true
      item.folded = false
    }
  }
  fn(item)
  detectIndeterminate(props.node)
  dryRunRename()
}

const fileCheckChange = (item: ItemRow) => {
  detectIndeterminate(props.node)
  dryRunRename([item])
}

const dryRunRename = async (partialItems?: ItemRow[]) => {
  await form.value?.validate()
  if (!isFormValid.value) {
    return
  }
  let regexp: RegExp
  try {
    regexp = new RegExp(regexpInput.value, regexpFlagsInput.value.join(''))
  } catch {
    return
  }
  ;(partialItems ? partialItems : items).forEach(item => {
    if (item.type === 'file') {
      if (item.selected && regexp.test(item.name)) {
        item.targetName = item.name.replace(regexp, targetInput.value)
        item.targetFullName = (item.parentItem!.fullName === '' ? '' : item.parentItem!.fullName + '/') + item.targetName
      } else {
        item.targetName = undefined
        item.targetFullName = undefined
      }
      item.notChanged = item.name === item.targetName
    }
  })
  hasDuplicated.value = false
  const allTarget = new Map()
  items
    .filter(item => !!item.targetFullName)
    .forEach(item => {
      allTarget.set(item.targetFullName, (allTarget.get(item.targetFullName) || 0) + 1)
    })
  items.forEach(item => {
    item.duplicated = allTarget.get(item.targetFullName) > 1
    if (item.duplicated) {
      hasDuplicated.value = true
    }
  })
}

const run = async () => {
  if (!candidateItems.value.length) {
    return toast.warn(t('dialogs.bulkRenameFiles.nothing_to_do'))
  }
  const reqList = []
  for (const item of candidateItems.value) {
    reqList.push(contentStore.renameTorrentFile(props.hash, item.fullName, item.targetFullName!))
  }
  running.value = true
  Promise.all(reqList)
    .then(() => {
      toast.success(t('dialogs.bulkRenameFiles.success'))
      regexpEl.value?.saveValueToHistory()
      targetEl.value?.saveValueToHistory()
    })
    .catch(e => {
      toast.error(e.toString())
    })
    .finally(() => {
      running.value = false
      contentStore.updateFileTreeTask.perform()
      // close dialog, because haven't a good way to refresh torrent files after rename
      // because bulkRenameFilesDialog can be create with subfolder
      close()
    })
}

const close = () => {
  isOpened.value = false
}

watch([regexpInput, regexpFlagsInput, targetInput], () => {
  dryRunRename()
})

onMounted(() => {
  parseNode(props.node)
})
</script>

<template>
  <v-dialog v-model="isOpened" persistent fullscreen>
    <v-card density="compact">
      <v-card-title>
        <v-toolbar density="compact" color="transparent">
          <v-toolbar-title>{{ $t('dialogs.bulkRenameFiles.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close()" />
        </v-toolbar>
      </v-card-title>
      <v-card-text class="d-flex flex-column">
        <v-form v-model="isFormValid" ref="form">
          <v-row no-gutters align="center" justify="center">
            <v-col :cols="$vuetify.display.mobile ? 9 : undefined">
              <HistoryField
                :historyKey="HistoryKey.BULK_RENAME_REGEXP"
                ref="regexpEl"
                hide-details
                density="compact"
                v-model="regexpInput"
                :rules="rules"
                :label="$t('dialogs.bulkRenameFiles.regexp')" />
            </v-col>
            <v-col :cols="$vuetify.display.mobile ? 3 : 'auto'">
              <v-select
                class="ml-2"
                v-model="regexpFlagsInput"
                :items="['d', 'g', 'i', 'm', 's', 'u', 'v', 'y']"
                :placeholder="t('dialogs.bulkRenameFiles.select_regex_flags')"
                :label="$t('dialogs.bulkRenameFiles.flags')"
                density="compact"
                multiple
                hide-details />
            </v-col>
            <v-col cols="auto">
              <v-icon class="mx-2" :icon="`mdi-arrow-${$vuetify.display.mobile ? 'down' : 'right'}`" />
            </v-col>
            <v-col :cols="$vuetify.display.mobile ? 12 : undefined">
              <HistoryField
                :historyKey="HistoryKey.BULK_RENAME_TARGET"
                ref="targetEl"
                hide-details
                density="compact"
                v-model="targetInput"
                :rules="rules"
                :label="$t('dialogs.bulkRenameFiles.target')" />
            </v-col>
            <v-col cols="auto">
              <v-badge :class="$vuetify.display.mobile ? 'mt-2' : 'ml-5'" color="success" location="top left" :content="candidateItems.length">
                <v-btn :loading="running" :disabled="!isFormValid || hasDuplicated" color="primary" @click="run()">
                  {{ $t('dialogs.bulkRenameFiles.run') }}
                </v-btn>
              </v-badge>
            </v-col>
          </v-row>
        </v-form>

        <v-data-table-virtual v-if="!$vuetify.display.mobile" :headers="headers" :items="items" density="compact" fixed-header>
          <template v-slot:item="{ internalItem }">
            <v-data-table-row v-if="internalItem.raw.show" :item="internalItem">
              <template v-slot:[`item.selected`]="{ item }">
                <v-checkbox-btn
                  v-model="item.selected"
                  :color="item.targetName && 'accent'"
                  :indeterminate="item.type === 'folder' && item.indeterminate"
                  @change="item.type === 'file' ? fileCheckChange(item) : folderCheckChange(item)" />
              </template>
              <template v-slot:[`item.name`]="{ item }">
                <span
                  class="fold-toggle"
                  :class="{ 'cursor-pointer': item.type === 'folder' }"
                  :style="{ 'padding-left': `${item.indent * 16}px` }"
                  @click="item.type === 'folder' && toggleFolderFolded(item, !item.folded)">
                  <v-tooltip v-if="item.type === 'folder'" location="top" activator="parent">
                    {{ t(`dialogs.bulkRenameFiles.${item.folded ? 'unfold' : 'fold'}`) }}
                  </v-tooltip>

                  <v-icon v-if="item.type === 'folder'">{{ `mdi-chevron-${item.folded ? 'down' : 'up'}` }}</v-icon>
                  <v-icon v-else />

                  <v-icon v-if="item.fullName === ''" icon="mdi-file-tree" />
                  <v-icon v-else-if="item.type === 'file'" :icon="getFileIcon(item.name)" />
                  <v-icon v-else-if="!item.folded" icon="mdi-folder-open" color="#ffe476" />
                  <v-icon v-else icon="mdi-folder" color="#ffe476" />

                  {{ item.name }}
                </span>
              </template>
              <template v-slot:[`item.targetName`]="{ item }">
                <span v-if="item.type === 'file'" class="target-name" :class="{ duplicated: item.duplicated, 'not-changed': item.notChanged }">
                  <v-tooltip v-if="item.duplicated || item.notChanged" activator="parent">
                    {{ t(`dialogs.bulkRenameFiles.${item.duplicated ? 'duplicated' : 'not_changed'}`) }}
                  </v-tooltip>
                  <span v-else>
                    {{ item.targetName }}
                  </span>
                </span>
                <span v-else>
                  <v-icon icon="mdi-cancel" color="grey-lighten-1" />
                  <v-tooltip activator="parent">
                    {{ t('dialogs.bulkRenameFiles.notForFolder') }}
                  </v-tooltip>
                </span>
              </template>
            </v-data-table-row>
          </template>
        </v-data-table-virtual>

        <v-list v-else>
          <template v-for="(item, index) in items">
            <v-list-item v-if="item.show">
              <v-divider v-if="index > 0" class="my-2" />
              <div class="d-flex align-center" :style="{ 'padding-left': `${item.indent * 16}px` }">
                <v-checkbox-btn
                  v-model="item.selected"
                  inline
                  :color="item.targetName && 'accent'"
                  :indeterminate="item.type === 'folder' && item.indeterminate"
                  @change="item.type === 'file' ? fileCheckChange(item) : folderCheckChange(item)" />

                <v-icon v-if="item.type === 'folder'" @click="item.type === 'folder' && toggleFolderFolded(item, !item.folded)">{{
                  `mdi-chevron-${item.folded ? 'down' : 'up'}`
                }}</v-icon>

                <v-icon v-if="item.fullName === ''" icon="mdi-file-tree" />
                <v-icon v-else-if="item.type === 'file'" :icon="getFileIcon(item.name)" />
                <v-icon v-else-if="!item.folded" icon="mdi-folder-open" color="#ffe476" />
                <v-icon v-else icon="mdi-folder" color="#ffe476" />

                <div class="d-flex flex-column pl-3">
                  <span :class="{ 'text-grey strikethrough': item.targetName }">{{ item.name }}</span>
                  <span>{{ item.targetName }}</span>
                </div>
              </div>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.strikethrough {
  text-decoration: line-through;
}

.target-name {
  &.duplicated {
    color: red;
  }

  &.not-changed {
    color: #ff9595;
  }
}

.fold-toggle,
.target-name {
  word-break: keep-all;
  white-space: pre;
}
</style>
