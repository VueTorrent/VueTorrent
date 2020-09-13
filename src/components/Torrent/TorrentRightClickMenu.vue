<template>
    <v-list dense rounded>
        <v-list-item @click="showInfo" link>
            <v-icon>info</v-icon>
            <v-list-item-title class="ml-2" style="font-size: 15px"
                >Show Info</v-list-item-title
            >
        </v-list-item>
        <v-divider />
        <v-list-item @click="resume" link>
            <v-icon>play_arrow</v-icon>
            <v-list-item-title class="ml-2" style="font-size: 15px"
                >Resume</v-list-item-title
            >
        </v-list-item>
        <v-list-item @click="pause" link>
            <v-icon>pause</v-icon>
            <v-list-item-title class="ml-2" style="font-size: 15px"
                >Pause</v-list-item-title
            >
        </v-list-item>
        <v-divider />
        <v-list-item @click="reannounce" link>
            <v-icon>record_voice_over</v-icon>
            <v-list-item-title class="ml-2" style="font-size: 15px"
                >reannounce</v-list-item-title
            >
        </v-list-item>
        <v-divider />
        <v-list-item @click="deleteWithoutFiles" link>
            <v-icon color="red">delete</v-icon>
            <v-list-item-title class="ml-2" style="font-size: 15px; color: red"
                >Delete</v-list-item-title
            >
        </v-list-item>
        <v-list-item @click="deleteWithFiles" link>
            <v-icon color="red">delete</v-icon>
            <v-list-item-title class="ml-2" style="font-size: 15px; color: red"
                >Delete with files</v-list-item-title
            >
        </v-list-item>
    </v-list>
</template>

<script>
import qbit from '@/services/qbit'
import { General } from '@/mixins'
export default {
    name: 'TorrentRightClickMenu',
    mixins: [General],
    props: {
        hash: String
    },
    methods: {
        resume() {
            qbit.resumeTorrents([this.hash])
        },
        pause() {
            qbit.pauseTorrents([this.hash])
        },
        reannounce() {
            qbit.reannounceTorrents([this.hash])
        },
        deleteWithoutFiles() {
            qbit.deleteTorrents([this.hash], false)
        },
        deleteWithFiles() {
            qbit.deleteTorrents([this.hash], true)
        },
        showInfo() {
            this.createModal('TorrentDetailModal', { hash: this.hash })
        }
    },
    computed: {
        dark() {
            return this.$vuetify.dark
        }
    }
}
</script>
