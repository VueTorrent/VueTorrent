<template>
    <v-card flat>
        <v-card-text
            class="mx-auto mt-5"
            style="font-size: 1.1em; max-height: 500px; min-height: 300px;"
        >
            <v-flex class="mx-auto">
                <v-row>
                    <v-col cols="3">
                        <h3>Available Tags:</h3>
                    </v-col>
                    <v-col>
                        <v-chip
                            v-for="tag in availableTags"
                            :key="tag"
                            small
                            class="download white--text caption mx-2"
                            @click="addTag(tag)"
                        >
                            {{ tag }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-flex>
            <v-flex class="mt-12">
                <v-row>
                    <v-col cols="3">
                        <h3>Current Tags:</h3>
                    </v-col>
                    <v-col>
                        <v-chip
                            v-for="tag in torrent.tags"
                            :key="tag"
                            small
                            close
                            class="download white--text caption mx-2"
                            @click="deleteTag(tag)"
                            @click:close="deleteTag(tag)"
                            >{{ tag }}</v-chip
                        >
                    </v-col>
                </v-row>
            </v-flex>
        </v-card-text>
    </v-card>
</template>

<script>
import { difference } from 'lodash'
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
export default {
    name: 'Tags',
    props: {
        hash: String
    },
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
