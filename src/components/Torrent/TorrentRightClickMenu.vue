<template>
  <v-list class="noselect">
    <v-list-item link @click="resume">
      <v-icon>{{ mdiPlay }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
        {{ $t('rightClick.resume') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="forceResume">
      <v-icon>{{ mdiFastForward }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
        {{ $t('rightClick.forceResume') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="pause">
      <v-icon>{{ mdiPause }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
        {{ $t('pause') | titleCase }}
      </v-list-item-title>
    </v-list-item>

    <v-divider />
    <v-list-item link @click="removeTorrent">
      <v-icon color="red">
        {{ mdiDelete }}
      </v-icon>
      <v-list-item-title class="ml-2 red--text list-item__title">
        {{ $t('delete') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-menu :open-on-hover="!touchmode" top offset-x :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'" :left="isRightside">
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiHeadCog }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.advanced') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item link @click="location">
          <v-icon>{{ mdiFolder }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.changeLocation') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="rename">
          <v-icon>{{ mdiRenameBox }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.rename') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item link @click="recheck">
          <v-icon>{{ mdiPlaylistCheck }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.forceRecheck') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item link @click="reannounce">
          <v-icon>{{ mdiBullhorn }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.forceReannounce') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="toggleSeq">
          <v-icon>
            {{ torrent.seq_dl ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
          </v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.sequentialDownload') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="toggleFL">
          <v-icon>
            {{ torrent.f_l_piece_prio ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
          </v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.firstLastPriority') | titleCase }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!multiple" link @click="toggleAutoTMM">
          <v-icon>
            {{ torrent.auto_tmm ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
          </v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.advanced.automaticTorrentManagement') | titleCase }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu :open-on-hover="!touchmode" top offset-x :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'" :left="isRightside">
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiPriorityHigh }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.prio.prio') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in priority_options" :key="index" link @click="setPriority(item.action)">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.prio.' + item.name) | titleCase }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      v-if="availableTags.length > 0"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiTag }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.tags') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item v-for="(tag, index) in availableTags" :key="index" link @click="setTag(tag)">
          <v-icon>
            {{ torrent.tags !== null && torrent.tags.includes(tag) ? mdiCheckboxMarked : mdiCheckboxBlankOutline }}
          </v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ tag }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-list-item v-else>
      <v-icon>{{ mdiTagOff }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
        {{ $t('rightClick.notags') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-menu
      v-if="availableCategories.length > 1"
      :open-on-hover="!touchmode"
      top
      offset-x
      :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'"
      :left="isRightside"
    >
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiLabel }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('rightClick.category') | titleCase }}
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in availableCategories" :key="index" link @click="setCategory(item.value)">
          <v-list-item-title class="ml-2 list-item__title">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-list-item v-else>
      <v-icon>{{ mdiLabelOff }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
        {{ $t('rightClick.nocategory') | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-menu v-if="!multiple" :open-on-hover="!touchmode" top offset-x :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'" :left="isRightside">
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiSpeedometerSlow }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
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
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('download') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="setLimit('upload')">
          <v-icon>{{ mdiChevronUp }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('upload') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="setShareLimit()">
          <v-icon>{{ mdiAccountGroup }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('share') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu v-if="!multiple" :open-on-hover="!touchmode" top offset-x :transition="isRightside ? 'slide-x-reverse-transition' : 'slide-x-transition'" :left="isRightside">
      <template #activator="{ on }">
        <v-list-item link v-on="on">
          <v-icon>{{ mdiContentCopy }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
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
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('name') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="copyToClipBoard(torrent.hash)">
          <v-icon>{{ mdiContentCopy }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('hash') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="copyToClipBoard(torrent.magnet)">
          <v-icon>{{ mdiMagnet }}</v-icon>
          <v-list-item-title class="ml-2 list-item__title">
            {{ $t('magnet') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-list-item link @click="exportTorrents">
      <v-icon>{{ multiple ? mdiDownloadMultiple : mdiDownload }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
        {{ $tc('rightClick.export', multiple ? 2 : 1) | titleCase }}
      </v-list-item-title>
    </v-list-item>
    <v-divider v-if="!multiple" />
    <v-list-item v-if="!multiple" link @click="showInfo">
      <v-icon>{{ mdiInformation }}</v-icon>
      <v-list-item-title class="ml-2 list-item__title">
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
  mdiAccountGroup,
  mdiArrowDown,
  mdiArrowUp,
  mdiBullhorn,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiChevronDown,
  mdiChevronRight,
  mdiChevronUp,
  mdiContentCopy,
  mdiDelete,
  mdiFastForward,
  mdiFolder,
  mdiHeadCog,
  mdiInformation,
  mdiLabel,
  mdiLabelOff,
  mdiMagnet,
  mdiPause,
  mdiPlay,
  mdiPlaylistCheck,
  mdiPriorityHigh,
  mdiPriorityLow,
  mdiRenameBox,
  mdiSelect,
  mdiSpeedometerSlow,
  mdiTag,
  mdiTagOff,
  mdiDownload,
  mdiDownloadMultiple
} from '@mdi/js'

export default {
  name: 'TorrentRightClickMenu',
  mixins: [General, TorrentSelect],
  props: {
    hash: String,
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
      mdiDelete,
      mdiPlay,
      mdiPause,
      mdiSelect,
      mdiFastForward,
      mdiFolder,
      mdiRenameBox,
      mdiInformation,
      mdiMagnet,
      mdiAccountGroup,
      mdiPlaylistCheck,
      mdiPriorityHigh,
      mdiBullhorn,
      mdiChevronRight,
      mdiLabel,
      mdiLabelOff,
      mdiTag,
      mdiTagOff,
      mdiHeadCog,
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline,
      mdiSpeedometerSlow,
      mdiChevronUp,
      mdiChevronDown,
      mdiContentCopy,
      mdiDownload,
      mdiDownloadMultiple
    }
  },
  computed: {
    ...mapGetters(['getCategories', 'getAvailableTags', 'getTorrent']),
    ...mapState(['selected_torrents']),
    availableCategories() {
      const categories = [{ name: 'None', value: '' }]
      categories.push(
        ...this.getCategories().map(c => {
          return { name: c.name, value: c.name }
        })
      )

      return categories
    },
    availableTags() {
      return this.getAvailableTags()
    },
    hashes() {
      if (this.multiple) return this.selected_torrents

      return [this.torrent.hash]
    },
    multiple() {
      return this.selected_torrents.length > 1
    },
    torrent() {
      return this.getTorrent(this.hash)
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
      this.createModal('ChangeLocationModal', { hashes: this.multiple ? this.selected_torrents : [this.torrent.hash] })
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
      this.$router.push({ name: 'torrentDetail', params: { hash: this.torrent.hash } })
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
    setTag(tag) {
      if (this.torrent.tags && this.torrent.tags.includes(tag)) this.removeTag(tag)
      else this.addTag(tag)
    },
    addTag(tag) {
      qbit.addTorrentTag(this.hashes, [tag])
    },
    removeTag(tag) {
      qbit.removeTorrentTag(this.hashes, [tag])
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
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        if (!document.execCommand('copy')) {
          this.$toast.error(this.$t('toast.copyNotSupported').toString())
          return
        }
        document.body.removeChild(textArea)
      }
      this.$toast.success(this.$t('toast.copySuccess').toString())
    },
    async exportTorrents() {
      this.hashes.forEach(hash => {
        qbit.exportTorrent(hash).then(blob => {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.style.opacity = '0'
          link.setAttribute('download', `${hash}.torrent`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.list-item {
  &__title {
    font-size: 1em;
  }
}

.v-menu__content {
  max-height: 720px;
  overflow-y: auto !important;
}
</style>
