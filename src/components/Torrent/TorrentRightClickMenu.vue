<template>
  <v-list dense rounded>
    <v-list-item @click="resume" link>
      <v-icon >play_arrow</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Resume</v-list-item-title
      >
    </v-list-item>
    <v-list-item @click="pause" link>
      <v-icon>pause</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Pause</v-list-item-title
      >
    </v-list-item>
    <v-divider />
    <v-list-item @click="deleteWithoutFiles" link>
      <v-icon color="red">delete</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px; color: red"
      >Delete</v-list-item-title
      >
    </v-list-item>
    <v-list-item @click="deleteWithFiles" link>
      <v-icon color="red">delete</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px; color: red"
      >Delete with files</v-list-item-title
      >
    </v-list-item>
    <v-divider />
    <v-list-item @click="location" link>
      <v-icon>folder</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Change location</v-list-item-title
      >
    </v-list-item>
    <v-list-item @click="rename" link>
      <v-icon>edit</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Rename</v-list-item-title
      >
    </v-list-item>
    <v-list-item @click="recheck" link>
      <v-icon>widgets</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px;"
      >Force recheck</v-list-item-title
      >
    </v-list-item>
    <v-list-item @click="reannounce" link>
      <v-icon>record_voice_over</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Force reannounce</v-list-item-title
      >
    </v-list-item>
    <v-divider />
    <v-list-item @click="showInfo" link>
      <v-icon>info</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Show Info</v-list-item-title
      >
    </v-list-item>
    <v-list-item @click="selectTorrent(hash)" link>
      <v-icon>done</v-icon>
      <v-list-item-title class="ml-2" style="font-size: 12px"
      >Select</v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>

<script>
import qbit from '@/services/qbit'
import { General, TorrentSelect } from '@/mixins'
export default {
    name: 'TorrentRightClickMenu',
    mixins: [General, TorrentSelect],
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
        location() {
            this.createModal('ChangeLocationModal', { hash: this.hash })
        },
        rename() {
            this.createModal('RenameModal', { hash: this.hash })
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
        recheck() {
            qbit.recheckTorrents([this.hash])
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
