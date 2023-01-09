<template>
  <v-card flat>
    <v-treeview v-model="selected" :items="fileTree" :open.sync="opened" activatable selectable item-key="fullName" open-all>
      <template #prepend="{ item, open }">
        <v-icon v-if="!item.icon">
          {{ open ? mdiFolderOpen : mdiFolderOpen }}
        </v-icon>
        <v-icon v-else>
          {{ item.icon }}
        </v-icon>
      </template>
      <template #label="{ item }">
        <span v-if="!item.editing">{{ item.name }}</span>
        <v-text-field v-if="item.editing" v-model="item.newName" autofocus />
      </template>
      <template v-if="!$vuetify.breakpoint.smAndDown" #append="{ item }">
        <div v-if="!item.icon">
          <span class="ml-4">{{ item.children.length }} Files</span>
          <v-btn v-if="!item.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="edit(item)">
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
          <v-btn v-if="item.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="renameFolder(item)">
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn v-if="item.editing" fab x-small class="error white--text elevation-0 px-4 ml-2" @click="toggleEditing(item)">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <span>[{{ item.size }}]</span>
          <span class="ml-4">{{ item.progress }}%</span>
          <span class="ml-4">[ {{ item.priority | priority }} ]</span>
          <v-menu open-on-hover offset-y>
            <template #activator="{ on }">
              <v-btn fab x-small class="accent white--text elevation-0 px-4 ml-2" v-on="on">
                <v-icon>{{ mdiTrendingUp }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="prio in priority_options" :key="prio.value" link @click="setFilePrio(item.id, prio.value)">
                <v-icon>{{ prio.icon }}</v-icon>
                <v-list-item-title class="caption">
                  {{ prio.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-if="!item.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="edit(item)">
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
          <v-btn v-if="item.editing" fab x-small class="accent white--text elevation-0 px-4 ml-2" @click="renameFile(item)">
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn v-if="item.editing" fab x-small class="error white--text elevation-0 px-4 ml-2" @click="toggleEditing(item)">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-treeview>
  </v-card>
</template>

<script>
import qbit from '@/services/qbit'
import { treeify } from '@/helpers'
import { FullScreenModal } from '@/mixins'
import { mdiClose, mdiContentSave, mdiPencil, mdiFolderOpen, mdiFolder, mdiFile, mdiTrendingUp, mdiPriorityHigh, mdiArrowUp, mdiArrowDown, mdiPriorityLow } from '@mdi/js'
import Vue from 'vue'

const FILE_PRIORITY_OPTIONS = [
  { name: 'max', icon: mdiPriorityHigh, value: 7 },
  { name: 'high', icon: mdiArrowUp, value: 6 },
  { name: 'normal', icon: mdiArrowDown, value: 1 },
  { name: 'unwanted', icon: mdiPriorityLow, value: 0 }
]

export default {
  name: 'Content',
  filters: {
    priority(value) {
      if (value === 4) return 'normal'
      const res = FILE_PRIORITY_OPTIONS.find(el => el.value === value)

      return res ? res.name : 'undefined'
    }
  },
  mixins: [FullScreenModal],
  props: {
    hash: String,
    isActive: Boolean
  },
  data() {
    return {
      inited: false,
      opened: null,
      selected: [],
      treeData: null,
      priority_options: FILE_PRIORITY_OPTIONS,
      mdiFolderOpen,
      mdiFolder,
      mdiFile,
      mdiTrendingUp,
      mdiPencil,
      mdiContentSave,
      mdiClose
    }
  },
  computed: {
    fileTree() {
      if (this.treeData) {
        return treeify(this.treeData)
      }

      return []
    }
  },
  watch: {
    isActive(active) {
      if (active) {
        if (this.inited) {
          this.getTorrentFiles()
        } else {
          this.initFiles()
          this.inited = true
        }
      }
    },
    selected(newValue, oldValue) {
      this.changeFilePriorities(newValue, oldValue)
    }
  },
  created() {},
  methods: {
    initFiles() {
      this.getTorrentFiles().then(() => {
        this.opened = []
        this.selected = this.treeData.filter(file => file.priority !== 0).map(file => file.name)
      })
    },
    async getTorrentFiles() {
      const { data } = await qbit.getTorrentFiles(this.hash)
      data.forEach((d, i) => {
        d.id = i
        d.name = d.name.replace('.unwanted/', '')
      })
      this.treeData = data
    },
    async changeFilePriorities(newValue, oldValue) {
      if (newValue.length === oldValue.length) return

      const filesToExclude = oldValue
        .filter(f => !newValue.includes(f))
        .map(name => this.treeData.find(f => f.name === name))
        .filter(f => f.priority !== 0)
        .map(f => f.id)
      const filesToInclude = newValue
        .filter(f => !oldValue.includes(f))
        .map(name => this.treeData.find(f => f.name === name))
        .filter(f => f.priority === 0)
        .map(f => f.id)

      if (filesToExclude.length) {
        await qbit.setTorrentFilePriority(this.hash, filesToExclude, 0)
      }
      if (filesToInclude.length) {
        await qbit.setTorrentFilePriority(this.hash, filesToInclude, 1)
      }
      if (filesToExclude.length || filesToInclude.length) {
        await this.getTorrentFiles()
      }
    },
    toggleEditing(item) {
      item.editing = !item.editing
    },
    edit(item) {
      item.newName = item.name
      this.toggleEditing(item)
    },
    renameFile(item) {
      const lastPathSep = item.fullName.lastIndexOf('/')
      const args = [this.hash]

      if (lastPathSep === -1) args.push(item.name, item.newName)
      else {
        const prefix = item.fullName.substring(0, lastPathSep)
        args.push(`${prefix}/${item.name}`, `${prefix}/${item.newName}`)
      }

      qbit.renameFile(...args).catch(() => Vue.$toast.error(this.$t('toast.renameFileFailed')))

      item.name = item.newName
      this.toggleEditing(item)
    },
    renameFolder(item) {
      const lastPathSep = item.fullName.lastIndexOf('/')
      const args = [this.hash]

      if (lastPathSep === -1) args.push(item.name, item.newName)
      else {
        const prefix = item.fullName.substring(0, lastPathSep)
        args.push(`${prefix}/${item.name}`, `${prefix}/${item.newName}`)
      }

      qbit.renameFolder(...args).catch(() => Vue.$toast.error(this.$t('toast.renameFolderFailed')))

      item.name = item.newName
      this.toggleEditing(item)
    },
    setFilePrio(fileId, priority) {
      qbit.setTorrentFilePriority(this.hash, [fileId], priority).then(() => this.initFiles())
    }
  }
}
</script>
