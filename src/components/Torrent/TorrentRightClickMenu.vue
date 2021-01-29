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
    <v-menu
      open-on-hover
      top
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiHeadCog }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Advanced
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-list dense rounded>
        <v-list-item v-if="!multiple" link @click="location">
          <v-icon>{{ mdiFolder }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Change location
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="rename">
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
        <v-list-item v-if="!multiple" link @click="toggleSeq">
          <v-icon> {{ torrent.seq_dl ? mdiCheckboxMarked : mdiCheckboxBlankOutline }} </v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Sequential Download
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="toggleFL">
          <v-icon> {{ torrent.f_l_piece_prio ? mdiCheckboxMarked : mdiCheckboxBlankOutline }} </v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            First/Last priority
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="toggleAutoTMM">
          <v-icon> {{ torrent.auto_tmm ? mdiCheckboxMarked : mdiCheckboxBlankOutline }} </v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Auto TMM
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
    <v-menu
      v-if="!multiple"
      open-on-hover
      top
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiSpeedometerSlow }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            Set Limit
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-list dense rounded>
        <v-list-item @click="setLimit('download')">
          <v-icon>{{ mdiChevronDown }}</v-icon>
          <v-list-item-title class="ml-2">
            Download
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="setLimit('upload')">
          <v-icon>{{ mdiChevronUp }}</v-icon>
          <v-list-item-title class="ml-2">
            Upload    
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-divider v-if="!multiple" />
    <v-list-item v-if="!multiple" link @click="showInfo">
      <v-icon>{{ mdiInformation }}</v-icon>
      <v-list-item-title class="ml-2">
        Show Info
      </v-list-item-title>
    </v-list-item>
    <v-list-item v-if="!multiple" link @click="selectTorrent(hash)">
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
import { mapGetters, mapState } from 'vuex'
import qbit from '@/services/qbit'
import { General, TorrentSelect } from '@/mixins'
import {
  mdiBullhorn, mdiPlaylistCheck, mdiArrowUp, mdiArrowDown, mdiPriorityLow,
  mdiInformation, mdiDeleteForever, mdiRenameBox, mdiFolder, mdiDelete,
  mdiPlay, mdiPause, mdiSelect, mdiPriorityHigh, mdiChevronRight,
  mdiFastForward, mdiShape, mdiHeadCog, mdiCheckboxMarked, mdiCheckboxBlankOutline,
  mdiSpeedometerSlow, mdiChevronUp, mdiChevronDown
} from '@mdi/js'

export default {
  name: 'TorrentRightClickMenu',
  mixins: [General, TorrentSelect],
  props: {
    torrent: Object
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
    mdiShape, mdiHeadCog, mdiCheckboxMarked, mdiCheckboxBlankOutline,
    mdiSpeedometerSlow, mdiChevronUp, mdiChevronDown
  }),
  computed: {
    ...mapGetters(['getCategories']),
    ...mapState(['selected_torrents']),
    availableCategories() {
      const categories = [
        { name: 'None', value: '' }]
      categories.push(...this.getCategories().map(c => {
        return { name: c.name, value: c.name }
      }))

      return categories
    },
    hashes() {
      if (this.multiple) return this.selected_torrents
      
      return [this.torrent.hash]
    },
    multiple() {
      return this.selected_torrents.length
    }
  },
  methods: {
    resume() {
      qbit.resumeTorrents(this.hashes)
    },
    pause() {
      qbit.pauseTorrents(this.hashes)
    },
    location() {
      this.createModal('ChangeLocationModal', { hash: this.torrent.hash })
    },
    rename() {
      this.createModal('RenameModal', { hash: this.torrent.hash })
    },
    reannounce() {
      qbit.reannounceTorrents(this.hashes)
    },
    deleteWithoutFiles() {
      qbit.deleteTorrents(this.hashes, false)
    },
    deleteWithFiles() {
      qbit.deleteTorrents(this.hashes, true)
    },
    recheck() {
      qbit.recheckTorrents(this.hashes)
    },
    showInfo() {
      this.createModal('TorrentDetailModal', { hash: this.torrent.hash })
    },
    setPriority(priority) {
      qbit.setTorrentPriority(this.hashes, priority)
    },
    setLimit(mode) {
      this.createModal('SpeedLimitModal', { hash: this.torrent.hash, mode })
    },
    forceResume() {
      qbit.forceStartTorrents(this.hashes)
    },
    setCategory(cat) {
      qbit.setCategory(this.hashes, cat)
    },
    toggleSeq() {
      qbit.toggleSequentialDownload(this.hashes)
    },
    toggleFL() {
      qbit.toggleFirstLastPiecePriority(this.hashes)
    },
    toggleAutoTMM() {
      qbit.setAutoTMM(this.hashes, !this.torrent.auto_tmm)
    }
  }
}
</script>
