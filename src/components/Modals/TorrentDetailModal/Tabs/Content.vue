<template>
    <v-card flat>
        <perfect-scrollbar>
            <v-card-text style="max-height: 500px; min-height: 400px">
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
                            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                        </v-icon>
                        <v-icon v-else>{{ item.icon }}</v-icon>
                    </template>
                    <template v-slot:append="{ item }">
                        <span v-if="!item.icon"
                            >{{ item.children.length }} Files</span
                        >
                        <div v-else>
                            <span>[{{ item.size }}]</span>
                            <span class="ml-4">{{ item.progress }}%</span>
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
export default {
    name: 'Content',
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
            this.selected = data.filter(file => file.priority !== 0)
                .map(file => file.name)
        },
        openAllItems() {
            this.opened = [].concat(
                ...this.treeData.map(file => file.name.split('/'))
                    .filter(f => f.splice(-1, 1)))
                    .filter((f, index, self) => index === self.indexOf(f)
                )
        },
        async changeFilePriorities(newValue, oldValue) {
            if (newValue.length == oldValue.length) return

            const filesToExclude = oldValue.filter(f => !newValue.includes(f))
                .map(name => this.treeData.find(f => f.name === name))
                .filter(f => f.priority !== 0)
                .map(f => f.id)
            const filesToInclude = newValue.filter(f => !oldValue.includes(f))
                .map(name => this.treeData.find(f => f.name === name))
                .filter(f => f.priority === 0)
                .map(f => f.id)
            
            if (filesToExclude.length)
                await qbit.setTorrentFilePriority(this.hash, filesToExclude, 0)
            if (filesToInclude.length)
                await qbit.setTorrentFilePriority(this.hash, filesToInclude, 1)
            if (filesToExclude.length || filesToInclude.length)
                await this.getTorrentFiles()
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
        this.getTorrentFiles().then(() => this.openAllItems())
    }
}
</script>
