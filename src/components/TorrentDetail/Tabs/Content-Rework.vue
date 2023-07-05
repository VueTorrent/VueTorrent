<template>
  <v-card flat>
    <v-treeview
        :open.sync="openedItems"
        :items="fileTree"
        activatable
        selectable
        item-key="fullName"
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
        <v-text-field v-if="node.editing" v-model="node.newName" autofocus />
        <span class="item-name" v-else>{{ node.type === 'root' ? $t('modals.detail.pageContent.rootNode') : node.name }}</span>
      </template>
      <template #append="{ item: node }">
        <div v-if="node.type === 'root'"></div>
        <div v-else-if="node.type === 'folder'">
          <span class="ml-4">{{ node | nodeContent }}</span>
          <v-btn v-if="!node.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="toggleEditing(node)">
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
          <v-btn v-if="node.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="renameNode(node)">
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn v-if="node.editing" fab x-small class="error white--text elevation-0 px-4 ml-2" @click="toggleEditing(node)">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <span v-if="!$vuetify.breakpoint.xsOnly && !node.editing">[{{ node.size | formatSize }}]</span>
          <span v-if="!$vuetify.breakpoint.xsOnly && !node.editing" class="ml-4">{{ node.progress | progress }}</span>
          <span v-if="!$vuetify.breakpoint.xsOnly && !node.editing" class="ml-4">[ {{ getNodePriority(node) }} ]</span>
          <v-menu open-on-hover offset-y>
            <template #activator="{ on }">
              <v-btn fab x-small class="accent white--text elevation-0 px-4 ml-2" v-on="on">
                <v-icon>{{ mdiTrendingUp }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="prio in filePriorityOptions" :key="prio.value" link @click="setFilePrio(node, prio.value)">
                <v-icon>{{ prio.icon }}</v-icon>
                <v-list-item-title class="caption">
                  {{ prio.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-if="!node.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="toggleEditing(node)">
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
          <v-btn v-if="node.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="renameNode(node)">
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn v-if="node.editing" fab x-small class="error white--text elevation-0 px-4 ml-2" @click="toggleEditing(node)">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-treeview>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {
  mdiFolder,
  mdiFolderOpen,
  mdiFileTree,
  mdiLanguageHtml5,
  mdiFileDocumentOutline,
  mdiNodejs,
  mdiFilePdfBox,
  mdiFileExcel,
  mdiCodeJson,
  mdiFileImage,
  mdiMovie,
  mdiLanguageMarkdown,
  mdiFile,
  mdiPriorityHigh,
  mdiArrowUp,
  mdiArrowDown,
  mdiPriorityLow,
  mdiTrendingUp,
  mdiPencil,
  mdiContentSave,
  mdiClose
} from '@mdi/js'
import {TreeFile, TreeFolder, TreeNode, TreeRoot} from '@/types/vuetorrent'
import {Priority} from '@/enums/qbit'
import qbit from '@/services/qbit'
import i18n from "@/plugins/i18n";

export default defineComponent({
  name: "Content-Rework",
  props: {
    hash: String,
    isActive: Boolean
  },
  data() {
    return {
      firstMount: true,
      fileTree: [] as TreeRoot[],
      openedItems: [] as string[],
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
      mdiPencil,
      mdiContentSave,
      mdiClose
    }
  },
  watch: {
    openedItems(val) {
      console.log(val)
    }
  },
  computed: {
    torrentHash(): string {
      return this.hash as string
    }
  },
  mounted() {
    this.updateFileTree()
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
    async genFileTree() {
      const files = await qbit.getTorrentFiles(this.torrentHash)

      const rootNode = {
        type: 'root',
        name: '',
        fullName: '',
        editing: false,
        newName: '',
        children: []
      } as TreeRoot

      for (const file of files) {
        let cursor = rootNode as TreeRoot | TreeFolder
        file.name.replace('\\', '/').split('/').reduce((parentPath, nodeName) => {
          const nextPath = parentPath === '' ? nodeName : parentPath + '/' + nodeName

          if (file.name.endsWith(nodeName)) {
            cursor.children.push({
              type: 'file',
              name: nodeName,
              fullName: nextPath,
              editing: false,
              newName: nodeName,
              availability: file.availability,
              index: file.index,
              is_seed: file.is_seed,
              priority: file.priority,
              progress: file.progress,
              size: file.size
            } as TreeFile)
          } else {
            const folder = cursor.children.find(el => el.name === nodeName)
            if (folder) {
              cursor = folder as TreeFolder
            } else {
              // if not found, create folder and set cursor to folder
              const newFolder: TreeFolder = {
                type: 'folder',
                name: nodeName,
                fullName: nextPath,
                editing: false,
                newName: nodeName,
                children: []
              }
              cursor.children.push(newFolder)
              cursor = newFolder
            }
          }

          return nextPath
        }, '')
      }

      return rootNode
    },
    getNodePriority(node: TreeFile) {
      const res = this.filePriorityOptions.find(el => el.value === node.priority)

      return res ? res.name : 'undefined'
    },
    toggleEditing(node: TreeNode) {
      if (!node.editing) {
        node.newName = node.name
      }
      node.editing = !node.editing
    },
    async renameNode(node: TreeNode) {
      if (node.type === 'root') return

      const lastPathSep = node.fullName.lastIndexOf('/')
      let oldPath, newPath

      if (lastPathSep === -1) {
        [oldPath, newPath] = [node.name, node.newName]
      } else {
        const prefix = node.fullName.substring(0, lastPathSep);
        [oldPath, newPath] = [`${prefix}/${node.name}`, `${prefix}/${node.newName}`]
      }

      let res = false
      if (node.type === 'file') {
        res = await qbit.renameFile(this.torrentHash, oldPath, newPath)
            .then(() => true, () => false)
      }
      else if (node.type === 'folder') {
        res = await qbit.renameFolder(this.torrentHash, oldPath, newPath)
            .then(() => true, () => false)
      }

      if (!res) {
        this.$toast.error(this.$t('toast.renameFailed'))
        return
      }

      this.openedItems.forEach((el: string, index: number) => {
        if (el.startsWith(node.fullName)) {
          this.openedItems[index] = node.fullName.replace(node.name, node.newName)
        }
      })

      this.toggleEditing(node)
      await this.updateFileTree()
    },
    async setFilePrio(file: TreeFile, prio: Priority) {
      await qbit.setTorrentFilePriority(this.torrentHash, [file.index], prio)
      await this.updateFileTree()
    },
    async updateFileTree() {
      this.fileTree = [await this.genFileTree()]
    }
  }
})
</script>
