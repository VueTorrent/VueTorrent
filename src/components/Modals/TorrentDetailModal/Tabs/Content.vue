<template>
  <v-card flat>
    <perfect-scrollbar>
      <v-card-text  :style="{ minHeight: phoneLayout ? '' : '75vh', maxHeight: '75vh'}">
        <v-treeview
          v-model="selected"
          :items="fileTree"
          :open.sync="opened"
          activatable
          selectable
          item-key="fullName"
          open-all
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.icon">
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </template>
          <template v-slot:label="{ item }">
            <span v-if="!item.editing">{{ item.name }}</span>
            <v-text-field
              autofocus
              v-if="item.editing"
              v-model="item.newName"
            />
          </template>
          <template v-slot:append="{ item }">
            <span v-if="!item.icon">{{ item.children.length }} Files</span>
            <div v-else>
              <span>[{{ item.size }}]</span>
              <span class="ml-4">{{ item.progress }}%</span>
              <v-btn
                v-if="!item.editing"
                class="mb-2 ml-4"
                x-small
                fab
                @click="edit(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-if="item.editing"
                class="mb-2 ml-4"
                x-small
                fab
                @click="renameFile(item)"
              >
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn
                v-if="item.editing"
                class="mb-2 ml-2"
                x-small
                fab
                @click="togleEditing(item)"
              >
                <v-icon>close</v-icon>
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
export default {
    name: 'Content',
    mixins: [FullScreenModal],
    props: {
        hash: String,
        isActive: Boolean
    },
    data() {
        return {
            opened: null,
            selected: [],
            treeData: null
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
    methods: {
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

            if (filesToExclude.length)
                await qbit.setTorrentFilePriority(this.hash, filesToExclude, 0)
            if (filesToInclude.length)
                await qbit.setTorrentFilePriority(this.hash, filesToInclude, 1)
            if (filesToExclude.length || filesToInclude.length)
                await this.getTorrentFiles()
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
    }
}
</script>
