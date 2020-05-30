<template>
    <v-card flat>
        <perfect-scrollbar>
            <v-card-text style="max-height: 500px; min-height: 400px;">
                <v-treeview
                    v-model="tree"
                    :items="fileTree"
                    activatable
                    item-key="name"
                    open-on-click
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
            tree: [],
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
            this.treeData = data
        }
    },
    watch: {
        isActive(active) {
            if (active) {
                this.getTorrentFiles()
            }
        }
    }
}
</script>

<style></style>
