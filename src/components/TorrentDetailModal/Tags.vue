<template>
    <v-card flat>
        <v-card-text
            class="mx-auto mt-5"
            style="font-size: 1.1em; max-height: 500px; min-height: 300px;"
        >
            <v-layout class="mx-auto" row wrap>
                <v-flex xs12 sm12>
                    <h3>Available Tags:</h3>
                </v-flex>
                <v-flex xs12 sm12 class="mt-3">
                    <v-chip
                        v-for="tag in availableTags"
                        :key="tag"
                        small
                        class="download white--text caption mx-2"
                        style="font-size: 0.95em !important;"
                        @click="addTag(tag)"
                    >
                        {{ tag }}
                    </v-chip>
                </v-flex>
            </v-layout>
            <v-layout class="mx-auto mt-12" row wrap>
                <v-flex xs12 sm12>
                    <h3>Current Tags:</h3>
                </v-flex>
                <v-flex xs12 sm12 class="mt-3">
                    <v-chip
                        v-for="tag in torrent.tags"
                        :key="tag"
                        small
                        close
                        class="download white--text caption mx-2"
                        style="font-size: 0.95em !important;"
                        @click="deleteTag(tag)"
                        @click:close="deleteTag(tag)"
                        >{{ tag }}</v-chip
                    >
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions class="justify-center pb-5">
            <v-btn
                text
                class="error white--text mt-3"
                @click="DeleteDialog = true"
                >Delete</v-btn
            >
            <v-btn
                text
                class="green_accent white--text mt-3"
                @click="CreateNewDialog = true"
                >Create new</v-btn
            >
        </v-card-actions>
        <CreateNewTagDialog
            :dialog="CreateNewDialog"
            @close="CreateNewDialog = false"
        />
        <DeleteTagDialog
            :dialog="DeleteDialog"
            @close="DeleteDialog = false"
            :tags="availableTags"
        />
    </v-card>
</template>

<script>
import { difference } from 'lodash'
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import CreateNewTagDialog from './CreateNewTagDialog'
import DeleteTagDialog from './DeleteTagDialog'
export default {
    name: 'Tags',
    components: { CreateNewTagDialog, DeleteTagDialog },
    props: {
        hash: String
    },
    data: () => ({
        CreateNewDialog: false,
        DeleteDialog: false
    }),
    computed: {
        ...mapGetters(['getTorrent', 'getAvailableTags']),
        torrent() {
            return this.getTorrent(this.hash)
        },
        availableTags() {
            let availableTags = this.getAvailableTags()
            let currentTags = this.getTorrent(this.hash).tags
            return difference(availableTags, currentTags)
        }
    },
    methods: {
        addTag(tag) {
            qbit.addTorrentTag(this.hash, tag)
        },
        deleteTag(tag) {
            qbit.removeTorrentTag(this.hash, tag)
        }
    }
}
</script>
