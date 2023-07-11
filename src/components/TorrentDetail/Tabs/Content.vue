<template>
  <v-card flat :loading="loading">
    <v-treeview
        v-model="fileSelection"
        :open.sync="openedItems"
        :items="fileTree"
        activatable
        selectable
        item-key="fullName"
        @input="updateSelection"
    >
      <template v-slot:prepend="{ item: node, open }">
        <v-icon v-if="node.type === 'root'">
          {{ mdiFileTree }}
        </v-icon>
        <v-icon v-if="node.type === 'folder'">
          {{ open ? mdiFolderOpen : mdiFolder }}
        </v-icon>
        <v-icon v-else-if="node.type === 'file'">
          {{ node | fileIcon }}
        </v-icon>
      </template>
      <template #label="{ item: node }">
        <span class="item-name">{{ node.type === 'root' ? $t('modals.detail.pageContent.rootNode') : node.name }}</span>
      </template>
      <template #append="{ item: node }">
        <div v-if="node.type === 'root'">

        </div>
        <div v-else-if="node.type === 'folder'">
          <span class="ml-4">{{ node | nodeContent }}</span>
          <v-btn fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="renameNode(node)">
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <span v-if="!$vuetify.breakpoint.xsOnly">[{{ node.size | formatSize }}]</span>
          <span v-if="!$vuetify.breakpoint.xsOnly" class="ml-4">{{ node.progress | progress }}</span>
          <span v-if="!$vuetify.breakpoint.xsOnly" class="ml-4">[ {{ getNodePriority(node) }} ]</span>
          <v-menu open-on-hover offset-y>
            <template #activator="{ on }">
              <v-btn fab x-small class="accent white--text elevation-0 px-4 ml-2" v-on="on">
                <v-icon>{{ mdiTrendingUp }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="prio in filePriorityOptions" :key="prio.value" link
                           @click="setFilePrio(node, prio.value)">
                <v-icon>{{ prio.icon }}</v-icon>
                <v-list-item-title class="caption">
                  {{ prio.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="renameNode(node)">
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-treeview>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapGetters} from 'vuex'
import {
  mdiArrowDown,
  mdiArrowUp,
  mdiCodeJson,
  mdiFile,
  mdiFileDocumentOutline,
  mdiFileExcel,
  mdiFileImage,
  mdiFilePdfBox,
  mdiFileTree,
  mdiFolder,
  mdiFolderOpen,
  mdiLanguageHtml5,
  mdiLanguageMarkdown,
  mdiMovie,
  mdiNodejs,
  mdiPencil,
  mdiPriorityHigh,
  mdiPriorityLow,
  mdiTrendingUp
} from '@mdi/js'
import {TreeFile, TreeFolder, TreeNode, TreeRoot} from '@/types/vuetorrent'
import {Priority} from '@/enums/qbit'
import qbit from '@/services/qbit'
import i18n from "@/plugins/i18n";
import {TorrentFile} from "@/types/qbit/models";
import {genFileTree} from "@/helpers";
import {General} from "@/mixins";

export default defineComponent({
  name: "Content",
  props: {
    hash: String,
    isActive: Boolean
  },
  mixins: [General],
  data() {
    return {
      timer: null as NodeJS.Timeout | null,
      apiLock: false,
      loading: false,
      cachedFiles: [] as TorrentFile[],
      fileTree: [{}] as [TreeRoot],
      openedItems: [] as string[],
      fileSelection: [] as string[],
      filePriorityOptions: [
        {name: 'Max', icon: mdiPriorityHigh, value: Priority.MAXIMAL},
        {name: 'High', icon: mdiArrowUp, value: Priority.HIGH},
        {name: 'Normal', icon: mdiArrowDown, value: Priority.NORMAL},
        {name: 'Unwanted', icon: mdiPriorityLow, value: Priority.DO_NOT_DOWNLOAD}
      ],
      mdiFolderOpen,
      mdiFolder,
      mdiFileTree,
      mdiTrendingUp,
      mdiPencil
    }
  },
  computed: {
    ...mapGetters(['getApiRefreshInterval']),
    torrentHash(): string {
      return this.hash as string
    }
  },
  watch: {
    isActive(newValue: boolean) {
      if (newValue) {
        this.updateFileTree().then(() => this.openedItems.push(''))

        this.timer = setInterval(this.updateFileTree, this.getApiRefreshInterval())
      } else {
        clearInterval(this.timer as NodeJS.Timeout)
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer as NodeJS.Timeout)
  },
  filters: {
    fileIcon(file: TreeFile) {
      const types: Record<string, string> = {
        html: mdiLanguageHtml5,
        js: mdiNodejs,
        json: mdiCodeJson,
        md: mdiLanguageMarkdown,
        pdf: mdiFilePdfBox,
        png: mdiFileImage,
        txt: mdiFileDocumentOutline,
        sub: mdiFileDocumentOutline,
        idx: mdiFileDocumentOutline,
        xls: mdiFileExcel,
        xlsx: mdiFileExcel,
        avi: mdiMovie,
        mp4: mdiMovie,
        mkv: mdiMovie,
        mov: mdiMovie,
        wmv: mdiMovie
      }

      const type = file.name.split('.').pop() || ''
      return types[type] || mdiFile
    },
    nodeContent(node: TreeRoot | TreeFolder) {
      let fileCount = 0
      let folderCount = 0
      for (const child of node.children) {
        if (child.type === 'file') {
          fileCount++
        } else if (child.type === 'folder') {
          folderCount++
        }
      }

      const res = []
      if (fileCount > 0) {
        res.push(i18n.tc('modals.detail.pageContent.fileInfo', fileCount).toString())
      }
      if (folderCount > 0) {
        res.push(i18n.tc('modals.detail.pageContent.folderInfo', folderCount).toString())
      }

      return res.join(', ')
    }
  },
  methods: {
    getNodePriority(node: TreeFile) {
      const res = this.filePriorityOptions.find(el => el.value === node.priority)

      return res ? res.name : 'undefined'
    },
    async updateSelection(currentSelection: string[]) {
      const oldValue = this.cachedFiles.filter(f => f.priority !== Priority.DO_NOT_DOWNLOAD).map(f => f.index)
      const newValue = currentSelection.map(path => this.cachedFiles.find(f => f.name === path)).map(f => f.index)

      const filesToExclude = oldValue
          .filter(index => !newValue.includes(index))
          .map(index => this.cachedFiles.find(f => f.index === index))
          .filter(f => f.priority !== Priority.DO_NOT_DOWNLOAD)
          .map(f => f.index)
      const filesToInclude = newValue
          .filter(index => !oldValue.includes(index))
          .map(index => this.cachedFiles.find(f => f.index === index))
          .filter(f => f.priority === Priority.DO_NOT_DOWNLOAD)
          .map(f => f.index)

      if (filesToExclude.length) {
        await qbit.setTorrentFilePriority(this.torrentHash, filesToExclude, Priority.DO_NOT_DOWNLOAD)
      }
      if (filesToInclude.length) {
        await qbit.setTorrentFilePriority(this.torrentHash, filesToInclude, Priority.NORMAL)
      }
    },
    async renameNode(node: TreeNode) {
      this.createModal('RenameTorrentFileModal', {
        hash: this.torrentHash,
        isFolder: node.type === 'folder',
        oldName: node.fullName
      })

      // this.openedItems.forEach((el: string, index: number) => {
      //   if (el.startsWith(oldPath)) {
      //     this.openedItems[index] = el.substring(0, oldPath.length) + newPath
      //   }
      // })
    },
    async setFilePrio(file: TreeFile, prio: Priority) {
      await qbit.setTorrentFilePriority(this.torrentHash, [file.index], prio)
    },
    async updateFileTree() {
      if (this.apiLock) return
      this.apiLock = true
      this.loading = true

      this.cachedFiles = await qbit.getTorrentFiles(this.torrentHash)
      this.fileTree = [await genFileTree(this.cachedFiles)]
      this.fileSelection = this.cachedFiles.filter(f => f.priority !== Priority.DO_NOT_DOWNLOAD).map(f => f.name)

      await this.$nextTick()
      this.loading = false
      this.apiLock = false
    }
  }
})
</script>
