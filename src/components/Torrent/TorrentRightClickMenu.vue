<template>
  <v-list class="noselect">
    <v-list-item link @click="resume">
      <v-icon>{{ mdiPlay }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        {{ $t('rightClick.resume') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="forceResume">
      <v-icon>{{ mdiFastForward }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        {{ $t('rightClick.forceResume') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="pause">
      <v-icon>{{ mdiPause }}</v-icon>
      <v-list-item-title
        class="ml-2"
        style="font-size: 1em"
      >
        {{ $t('pause') | titleCase }}
      </v-list-item-title>
    </v-list-item>

    <v-divider />
    <v-list-item link @click="removeTorrent">
      <v-icon color="red">
        {{ mdiDelete }}
      </v-icon>
      <v-list-item-title
        class="ml-2 red--text"
        style="font-size: 1em;"
      >
        {{ $t('delete') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-menu
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiHeadCog }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.advanced.advanced') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item v-if="!multiple" link @click="location">
          <v-icon>{{ mdiFolder }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.advanced.changeLocation') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="rename">
          <v-icon>{{ mdiRenameBox }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.advanced.rename') | titleCase }}
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
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiPriorityHigh }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.prio.prio') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in priority_options"
          :key="index"
          link
          @click="setPriority(item.action)"
        >
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title class="ml-2" style="font-size: 12px">
            {{ $t('rightClick.prio.' + item.name ) | titleCase }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiShape }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.category') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
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
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiSpeedometerSlow }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.limit') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
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
        <v-list-item @click="setShareLimit()">
          <v-icon>{{ mdiAccountGroup }}</v-icon>
          <v-list-item-title class="ml-2">
            Share
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      v-if="!multiple"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiContentCopy }}</v-icon>
          <v-list-item-title
            class="ml-2"
            style="font-size: 1em"
          >
            {{ $t('rightClick.copy') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item @click="copyToClipBoard(torrent.name)">
          <v-icon>{{ mdiContentCopy }}</v-icon>
          <v-list-item-title class="ml-2">
            Name
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="copyToClipBoard(torrent.hash)">
          <v-icon>{{ mdiContentCopy }}</v-icon>
          <v-list-item-title class="ml-2">
            Hash
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="copyToClipBoard(torrent.magnet)">
          <v-icon>{{ mdiMagnet }}</v-icon>
          <v-list-item-title class="ml-2">
            Magnet
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-divider v-if="!multiple" />
    <v-list-item v-if="!multiple" link @click="showInfo">
      <v-icon>{{ mdiInformation }}</v-icon>
      <v-list-item-title class="ml-2">
        {{ $t('rightClick.info') | titleCase }}
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
  mdiInformation, mdiRenameBox, mdiFolder, mdiDelete, mdiAccountGroup,
  mdiPlay, mdiPause, mdiSelect, mdiPriorityHigh, mdiChevronRight,
  mdiFastForward, mdiShape, mdiHeadCog, mdiCheckboxMarked, mdiCheckboxBlankOutline,
  mdiSpeedometerSlow, mdiChevronUp, mdiChevronDown, mdiContentCopy, mdiMagnet
} from '@mdi/js'

export default {
  name: 'TorrentRightClickMenu',
  mixins: [General, TorrentSelect],
  props: {
    torrent: Object,
    touchmode: Boolean,
    x: Number
  },
  data() {
    return {
      isRightside: true,
      priority_options: [
        { name: 'top', icon: mdiPriorityHigh, action: 'topPrio' },
        { name: 'increase', icon: mdiArrowUp, action: 'increasePrio' },
        { name: 'decrease', icon: mdiArrowDown, action: 'decreasePrio' },
        { name: 'bottom', icon: mdiPriorityLow, action: 'bottomPrio' }
      ],
      mdiDelete, mdiPlay, mdiPause, mdiSelect, mdiFastForward,
      mdiFolder, mdiRenameBox, mdiInformation, mdiMagnet, mdiAccountGroup,
      mdiPlaylistCheck, mdiPriorityHigh, mdiBullhorn, mdiChevronRight,
      mdiShape, mdiHeadCog, mdiCheckboxMarked, mdiCheckboxBlankOutline,
      mdiSpeedometerSlow, mdiChevronUp, mdiChevronDown, mdiContentCopy
    }
  },
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
      return this.selected_torrents.length > 1
    }
  },
  watch: {
    x() {
      this.detectRightside()
    }
  },
  mounted() {
    this.detectRightside()
  },
  methods: {
    detectRightside() {
      this.isRightside = document.documentElement.clientWidth < this.x + 380
    },
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
    removeTorrent() {
      this.$store.state.selected_torrents = this.hashes

      return this.createModal('ConfirmDeleteModal')
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
    setShareLimit() {
      this.createModal('ShareLimitModal', { hash: this.torrent.hash })
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
    },
    copyToClipBoard(text) {
      navigator.clipboard.writeText(text)
    }
  }
}
</script>
