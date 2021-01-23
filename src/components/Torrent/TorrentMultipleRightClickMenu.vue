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
    <v-divider />
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
  </v-list>
</template>

<script>
import qbit from '@/services/qbit'
import { General, TorrentSelect } from '@/mixins'
import {
  mdiBullhorn, mdiArrowUp, mdiArrowDown, mdiPriorityLow,
  mdiDeleteForever, mdiDelete, mdiPlaylistCheck, mdiShape,
  mdiPlay, mdiPause, mdiSelect, mdiPriorityHigh, mdiFastForward,
  mdiChevronRight
} from '@mdi/js'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'TorrentMultipleRightClickMenu',
  mixins: [General, TorrentSelect],
  data: () => ({
    priority_options: [
      { name: 'top', icon: mdiPriorityHigh, action: 'topPrio' },
      { name: 'increase', icon: mdiArrowUp, action: 'increasePrio' },
      { name: 'decrease', icon: mdiArrowDown, action: 'decreasePrio' },
      { name: 'bottom', icon: mdiPriorityLow, action: 'bottomPrio' }
    ],
    mdiDelete, mdiPlay, mdiPause, mdiSelect, mdiFastForward,
    mdiDeleteForever, mdiBullhorn, mdiPlaylistCheck, mdiShape,
    mdiChevronRight
  }),
  computed: {
    ...mapState(['selected_torrents']),
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
      qbit.resumeTorrents(this.selected_torrents)
    },
    pause() {
      qbit.pauseTorrents(this.selected_torrents)
    },
    reannounce() {
      qbit.reannounceTorrents(this.selected_torrents)
    },
    deleteWithoutFiles() {
      qbit.deleteTorrents(this.selected_torrents, false)
    },
    deleteWithFiles() {
      qbit.deleteTorrents(this.selected_torrents, true)
    },
    recheck() {
      qbit.recheckTorrents(this.selected_torrents)
    },
    forceResume() {
      qbit.forceStartTorrents(this.selected_torrents)
    },
    setCategory(cat) {
      qbit.setCategory(this.selected_torrents, cat)
    }
  }
}
</script>
