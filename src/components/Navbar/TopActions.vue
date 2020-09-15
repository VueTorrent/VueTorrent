<template>
    <div>
        <v-btn
            text
            small
            fab
            color="grey"
            class="mr-0 ml-0"
            @click="addModal('SortModal')"
        >
            <v-icon color="grey">sort</v-icon>
        </v-btn>
        <v-btn
            text
            small
            fab
            color="grey"
            class="mr-0 ml-0"
            @click="addModal('SearchModal')"
        >
            <v-icon color="grey">search</v-icon>
        </v-btn>
        <v-btn
            text
            small
            fab
            color="grey"
            class="mr-0 ml-0"
            @click="addModal('AddModal')"
        >
            <v-icon color="grey">add</v-icon>
        </v-btn>
        <v-btn
            v-if="showAll"
            small
            fab
            text
            class="mr-0 ml-0"
            @click="removeTorrents"
        >
            <v-icon color="grey">remove</v-icon>
        </v-btn>
        <v-btn
            v-if="showAll"
            small
            fab
            text
            class="mr-0 ml-0"
            @click="resumeTorrents"
        >
            <v-icon color="grey">play_arrow</v-icon>
        </v-btn>
        <v-btn
            v-if="showAll"
            small
            fab
            text
            class="mr-0 ml-0"
            @click="pauseTorrents"
        >
            <v-icon color="grey">pause</v-icon>
        </v-btn>
        <v-btn
            small
            fab
            text
            class="mr-0 ml-0"
            @click="addModal('SettingsModal')"
        >
            <v-icon color="grey">settings</v-icon>
        </v-btn>
    </div>
</template>

<script>
import qbit from '@/services/qbit'
import { mapState } from 'vuex'
import { General } from '@/mixins'

export default {
    name: 'TopActions',
    mixins: [General],
    props: ['showAll'],
    computed: {
        ...mapState(['selected_torrents'])
    },
    methods: {
        pauseTorrents() {
            qbit.pauseTorrents(this.selected_torrents)
        },
        resumeTorrents() {
            qbit.resumeTorrents(this.selected_torrents)
        },
        removeTorrents() {
            qbit.deleteTorrents(this.selected_torrents, false)
        },
        addModal(name) {
            this.createModal(name)
        }
    }
}
</script>
