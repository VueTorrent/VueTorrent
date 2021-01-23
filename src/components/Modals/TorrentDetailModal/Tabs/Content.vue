<template>
  <v-card flat>
    <perfect-scrollbar>
      <v-card-text :style="{ minHeight: phoneLayout ? '' : '75vh', maxHeight: '75vh'}">
        <v-treeview
          v-model="selected"
          :items="fileTree"
          :open.sync="opened"
          activatable
          selectable
          item-key="fullName"
          open-all
        >
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
            <v-text-field
              v-if="item.editing"
              v-model="item.newName"
              autofocus
            />
          </template>
          <template #append="{ item }">
            <span v-if="!item.icon">{{ item.children.length }} Files</span>
            <div v-else>
              <span>[{{ item.size }}]</span>
              <span class="ml-4">{{ item.progress }}%</span>
              <span class="ml-4">[ {{ item.priority | priority }} ]</span>
              <v-menu
                open-on-hover
                top
              >
                <template #activator="{ on }">
                  <v-btn
                    class="mb-2 ml-4"
                    x-small
                    fab
                    v-on="on"
                  >
                    <v-icon>{{ mdiTrendingUp }}</v-icon>
                  </v-btn>
                </template>
                <v-list dense rounded>
                  <v-list-item
                    v-for="prio in priority_options"
                    :key="prio.value"
                    link
                    class="black--text"
                    @click="setFilePrio(item.id, prio.value)"
                  >
                    <v-icon>{{ prio.icon }}</v-icon>
                    <v-list-item-title class="ml-2 black--text" style="font-size: 12px">
                      {{ prio.name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn
                v-if="!item.editing"
                class="mb-2 ml-4"
                x-small
                fab
                @click="edit(item)"
              >
                <v-icon>{{ mdiPencil }}</v-icon>
              </v-btn>
              <v-btn
                v-if="item.editing"
                class="mb-2 ml-4"
                x-small
                fab
                @click="renameFile(item)"
              >
                <v-icon>{{ mdiContentSave }}</v-icon>
              </v-btn>
              <v-btn
                v-if="item.editing"
                class="mb-2 ml-2"
                x-small
                fab
                @click="togleEditing(item)"
              >
                <v-icon>{{ mdiClose }}</v-icon>
              </v-btn>
            </div>
          </template>
        </v-treeview>
      </v-card-text>
    </perfect-scrollbar>
  </v-card>
</template>

<script>
import qbit from '@/services/qbit'
import { treeify } from '@/helpers'
import { FullScreenModal } from '@/mixins'
import { 
  mdiClose, mdiContentSave, mdiPencil, mdiFolderOpen,
  mdiFolder, mdiFile, mdiTrendingUp, mdiPriorityHigh,
  mdiArrowUp, mdiArrowDown, mdiPriorityLow
} from '@mdi/js'

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
        this.getTorrentFiles()
      }
    },
    selected(newValue, oldValue) {
      this.changeFilePriorities(newValue, oldValue)
    }
  },
  created() {
    this.initFiles()
  },
  methods: {
    initFiles() {
      this.getTorrentFiles().then(() => {
        this.opened = []
          .concat(
            ...this.treeData
              .map(file => file.name.split('/'))
              .filter(f => f.splice(-1, 1))
          )
          .filter((f, index, self) => index === self.indexOf(f))
        this.selected = this.treeData
          .filter(file => file.priority !== 0)
          .map(file => file.name)
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
      if (newValue.length == oldValue.length) return

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
    togleEditing(item) {
      item.editing = !item.editing
    },
    edit(item) {
      item.newName = item.name
      this.togleEditing(item)
    },
    renameFile(item) {
      qbit.renameFile(this.hash, item.id, item.newName)
      item.name = item.newName
      this.togleEditing(item)
    },
    setFilePrio(fileId, priority) {
      qbit.setTorrentFilePriority(this.hash, [fileId], priority)
        .then(() => this.initFiles())
    }
  }
}
</script>