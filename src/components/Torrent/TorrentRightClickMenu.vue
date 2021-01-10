<template>
  <v-list>
    <v-list-item link @click="resume">
      <v-icon>{{ mdiPlay }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Resume
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="pause">
      <v-icon>{{ mdiPause }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Pause
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-list-item link @click="deleteWithoutFiles">
      <v-icon color="red">
        {{ mdiDelete }}
      </v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em; color: red"
      >
        Delete
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="deleteWithFiles">
      <v-icon color="red">
        {{ mdiDeleteForever }}
      </v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em; color: red"
      >
        Delete with files
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-list-item link @click="location">
      <v-icon>{{ mdiFolder }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Change location
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="rename">
      <v-icon>{{ mdiPencil }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Rename
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="recheck">
      <v-icon>{{ mdiWidgets }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Force recheck
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="reannounce">
      <v-icon>{{ mdiAccountVoice }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Force reannounce
      </v-list-item-title>
    </v-list-item>
    <v-menu
      open-on-hover
      top
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiTrendingUp }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Set Priority
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-list dense rounded>
        <v-list-item
          v-for="(item, index) in priority_options"
          :key="index"
          link
          @click="setPriority(item.action)"
        >
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title class="ml-2" style="font-size: 12px">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-divider />
    <v-list-item link @click="showInfo">
      <v-icon>{{ mdiInformation }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Show Info
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="selectTorrent(hash)">
      <v-icon>{{ mdiCheck }}</v-icon>
      <v-list-item-title
        class="ml-2"
      >
        Select
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import qbit from '@/services/qbit'
import { General, TorrentSelect } from '@/mixins'
import {
  mdiAccountVoice, mdiWidgets, mdiTrendingUp,
  mdiInformation, mdiDeleteForever, mdiPencil, mdiFolder, mdiDelete,
  mdiPlay, mdiPause, mdiCheck
} from '@mdi/js'
export default {
  name: 'TorrentRightClickMenu',
  mixins: [General, TorrentSelect],
  props: {
    hash: String
  },
  data: () => ({
    priority_options: [
      { name: 'top', icon: 'upgrade', action: 'topPrio' },
      { name: 'increase', icon: 'arrow_drop_up', action: 'increasePrio' },
      { name: 'decrease', icon: 'arrow_drop_down', action: 'decreasePrio' },
      { name: 'bottom', icon: 'vertical_align_bottom', action: 'bottomPrio' }
    ],
    mdiDelete, mdiPlay, mdiPause, mdiCheck,
    mdiFolder, mdiPencil, mdiDeleteForever, mdiInformation,
    mdiWidgets, mdiTrendingUp, mdiAccountVoice
  }),
  computed: {
    dark() {
      return this.$vuetify.dark
    }
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
    },
    setPriority(priority) {
      qbit.setTorrentPriority(this.hash, priority)
    }
  }
}
</script>
