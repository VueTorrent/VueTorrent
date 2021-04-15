<template>
  <v-card flat>
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
      <template v-if="!$vuetify.breakpoint.smAndDown" #append="{ item }">
        <span v-if="!item.icon">{{ item.children.length }} Files</span>
        <div v-else>
          <span>[{{ item.size }}]</span>
          <span class="ml-4">{{ item.progress }}%</span>
          <span class="ml-4">[ {{ item.priority | priority }} ]</span>
          <v-menu
            open-on-hover
            offset-y
          >
            <template #activator="{ on }">
              <v-btn
                fab
                x-small
                class="accent white--text elevation-0 px-4 ml-2"
                v-on="on"
              >
                <v-icon>{{ mdiTrendingUp }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="prio in priority_options"
                :key="prio.value"
                link
                @click="setFilePrio(item.id, prio.value)"
              >
                <v-icon>{{ prio.icon }}</v-icon>
                <v-list-item-title class="caption">
                  {{ prio.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-if="!item.editing"
            fab
            x-small
            class="accent white--text elevation-0 px-4 ml-2"
            @click="edit(item)"
          >
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-btn>
          <v-btn
            v-if="item.editing"
            fab
            x-small
            class="accent white--text elevation-0 px-4 ml-2"
            @click="renameFile(item)"
          >
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
          <v-btn
            v-if="item.editing"
            fab
            x-small
            class="error white--text elevation-0 px-4 ml-2"
            @click="togleEditing(item)"
          >
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
      mdiClose,
      hWndContent: null,
      flagEdit: false
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
  mounted() {
    this.hWndContent = this.$parent.$parent.$parent.$el.getElementsByClassName('v-card__text')[0]
    document.addEventListener('keydown', this.handleKeyboardShortcut)
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
    },
    handleKeyboardShortcut(e) {
      if (this.flagEdit === true)
        return false
      if (!this.isActive)
        return false
      const treeNodes = this.$el.getElementsByClassName('v-treeview-node__root')
      var selectIndex = 0
      for (var i = 0; i < treeNodes.length; i++) {
        const className = treeNodes[i].className
        if (className) {
          if (treeNodes[i].className.indexOf('v-treeview-node--active') != -1) {
            selectIndex = i
          }
        }
      }
      const btnToggle = treeNodes[selectIndex].getElementsByClassName('v-treeview-node__toggle')[0]
      switch (e.code) {
        case 'ArrowDown':
          e.preventDefault()
          try {
            treeNodes[++selectIndex].click()
          } catch (e) {
            selectIndex--
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          try {
            treeNodes[--selectIndex].click()
          } catch (e) {
            selectIndex++
          }
          break
        case 'Space':
        case 'Enter':
          e.preventDefault()
          treeNodes[selectIndex].getElementsByClassName('v-treeview-node__checkbox')[0].click()
          break
        case 'ArrowRight':
          e.preventDefault()
          if (btnToggle) {
            if (btnToggle.className.indexOf('v-treeview-node__toggle--open') == -1) {
              btnToggle.click()
              break
            }
          }
          try {
            treeNodes[++selectIndex].click()
          } catch (e) {
            selectIndex--
          }
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (btnToggle) {
            if (btnToggle.className.indexOf('v-treeview-node__toggle--open') != -1) {
              btnToggle.click()
              break
            }
          }
          try {
            treeNodes[--selectIndex].click()
          } catch (e) {
            selectIndex++
          }
          break
        case 'End':
          e.preventDefault()
          if (selectIndex != treeNodes.length - 1) {
            treeNodes[treeNodes.length - 1].click()
            selectIndex = treeNodes.length - 1
          }
          break
        case 'Home':
          e.preventDefault()
          if (selectIndex != 0) {
            treeNodes[0].click()
            selectIndex = 0
          }
          break
        default:
      }
      const
        parentRect = this.hWndContent.getClientRects()[0],
        clientRect = treeNodes[selectIndex].getClientRects()[0],
        minTop = clientRect.height * selectIndex,
        maxTop = clientRect.height * (selectIndex + 1) - parentRect.height

      if (this.hWndContent.scrollTop > minTop)
        this.hWndContent.scrollTop = minTop
      if (this.hWndContent.scrollTop < maxTop)
        this.hWndContent.scrollTop = maxTop
    }
  }
}
</script>