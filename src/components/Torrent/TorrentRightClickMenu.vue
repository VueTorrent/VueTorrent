<template>
  <v-list class="py-1">
    <v-list-item link @click="resume">
      <v-icon>{{ mdiPlay }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Resume
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="forceResume">
      <v-icon>{{ mdiFastForward }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Force Resume
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
      <v-icon>{{ mdiRenameBox }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Rename
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="recheck">
      <v-icon>{{ mdiPlaylistCheck }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        Force recheck
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="reannounce">
      <v-icon>{{ mdiBullhorn }}</v-icon>
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
          <v-icon>{{ mdiPriorityHigh }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Set Priority
            <v-icon>{{ mdiChevronRight }}</v-icon>
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
    <v-menu
      open-on-hover
      top
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiShape }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Set Category
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-list dense rounded>
        <v-list-item
          v-for="(item, index) in availableCategories"
          :key="index"
          link
          @click="setCategory(item.value)"
        >
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
      <v-icon>{{ mdiSelect }}</v-icon>
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
  mdiBullhorn, mdiPlaylistCheck, mdiArrowUp, mdiArrowDown, mdiPriorityLow,
  mdiInformation, mdiDeleteForever, mdiRenameBox, mdiFolder, mdiDelete,
  mdiPlay, mdiPause, mdiSelect, mdiPriorityHigh, mdiChevronRight,
  mdiFastForward, mdiShape
} from '@mdi/js'
import { mapGetters } from 'vuex'
export default {
  name: 'TorrentRightClickMenu',
  mixins: [General, TorrentSelect],
  props: {
    hash: String
  },
  data: () => ({
    priority_options: [
      { name: 'top', icon: mdiPriorityHigh, action: 'topPrio' },
      { name: 'increase', icon: mdiArrowUp, action: 'increasePrio' },
      { name: 'decrease', icon: mdiArrowDown, action: 'decreasePrio' },
      { name: 'bottom', icon: mdiPriorityLow, action: 'bottomPrio' }
    ],
    mdiDelete, mdiPlay, mdiPause, mdiSelect, mdiFastForward,
    mdiFolder, mdiRenameBox, mdiDeleteForever, mdiInformation,
    mdiPlaylistCheck, mdiPriorityHigh, mdiBullhorn, mdiChevronRight,
    mdiShape
  }),
  computed: {
    ...mapGetters(['getCategories']),
    availableCategories() {
      const categories = [
        { name: 'None', value: '' }]
      categories.push(...this.getCategories().map(c => {
        return { name: c.name, value: c.name }
      }))

      return categories
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
    },
    forceResume() {
      qbit.forceStartTorrents([this.hash])
    },
    setCategory(cat) {
      qbit.setCategory([this.hash], cat)
    }
  }
}
</script>
