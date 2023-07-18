<template>
  <v-card flat>
    <v-simple-table>
      <tbody>
        <tr id="torrentTimeActive">
          <td :class="commonStyle">
            {{ $t('torrent.properties.time_active') | titleCase }}
          </td>
          <td>
            {{ torrent.time_active }}
            <span>{{ seedingTime }}</span>
          </td>
        </tr>
        <tr id="torrentEta">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.eta') }}
          </td>
          <td>
            {{ torrent.eta }}
          </td>
        </tr>
        <tr id="torrentLastActivity">
          <td :class="commonStyle">
            {{ $t('torrent.properties.last_activity') }}
          </td>
          <td>
            {{ torrent.last_activity }}
          </td>
        </tr>
        <tr id="torrentPeers">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.peers') }}
          </td>
          <td>
            {{ torrent.num_leechs }}<span :class="commonStyle">/{{ torrent.available_peers }}</span>
          </td>
        </tr>
        <tr id="torrentSeeds">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.seeds') }}
          </td>
          <td>
            {{ torrent.num_seeds }}<span :class="commonStyle">/{{ torrent.available_seeds }}</span>
          </td>
        </tr>
        <tr id="torrentAddedOn">
          <td :class="commonStyle">
            {{ $t('torrent.properties.added_on') | titleCase }}
          </td>
          <td>
            {{ torrent.added_on }}
          </td>
        </tr>
        <tr id="torrentCreationDate">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.creation_date') | titleCase }}
          </td>
          <td>
            {{ creationDate }}
          </td>
        </tr>
        <tr id="torrentTrackers" v-if="torrent?.tracker">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.trackers') }}
          </td>
          <td>
            <span v-for="trackersPart in splitString(torrent.tracker)" :key="trackersPart">
              <a v-if="stringContainsUrl(trackersPart)" target="_blank" :href="trackersPart">{{ trackersPart }}</a>
              <span v-else>{{ trackersPart }}</span>
            </span>
          </td>
        </tr>
        <tr id="torrentCreatedBy" v-if="createdBy">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.createdBy') }}
          </td>
          <td>
            <span v-for="createdByPart in splitString(createdBy)" :key="createdByPart">
              <a v-if="stringContainsUrl(createdByPart)" target="_blank" :href="createdByPart">{{ createdByPart }}</a>
              <span v-else>{{ createdByPart }}</span>
            </span>
          </td>
        </tr>

        <tr id="torrentFLPiecePrio">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.firstLastPiecePriority') }}
          </td>
          <td>
            {{ torrent.f_l_piece_prio }}
          </td>
        </tr>
        <tr id="torrentSeqDl">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.sequentialDownload') }}
          </td>
          <td>
            {{ torrent.seq_dl }}
          </td>
        </tr>
        <tr id="torrentAutoTMM">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.autoTMM') }}
          </td>
          <td>
            {{ torrent.auto_tmm }}
          </td>
        </tr>
        <tr id="torrentRatioLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.shareRatioLimit') }}
          </td>
          <td>
            {{ torrent.ratio_limit | limitToValue }}
          </td>
        </tr>
        <tr id="torrentRatioTimeLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.shareTimeLimit') }}
          </td>
          <td>
            {{ torrent.ratio_time_limit | limitToValue }}
          </td>
        </tr>
        <tr id="torrentDlLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.downloadLimit') }}
          </td>
          <td v-if="torrent?.dl_limit > 0">
            {{ torrent.dl_limit | formatSpeedValue(shouldUseBitSpeed()) }}
            <span>{{ torrent.dl_limit | formatSpeedUnit(shouldUseBitSpeed()) }}</span>
          </td>
          <td v-else>∞</td>
        </tr>
        <tr id="torrentUpLimit">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.uploadLimit') }}
          </td>
          <td v-if="torrent?.up_limit > 0">
            {{ torrent.up_limit | formatSpeedValue(shouldUseBitSpeed()) }}
            <span>{{ torrent.up_limit | formatSpeedUnit(shouldUseBitSpeed()) }}</span>
          </td>
          <td v-else>∞</td>
        </tr>
        <tr id="torrentAvailability">
          <td :class="commonStyle">
            {{ $t('torrent.properties.availability') | titleCase }}
          </td>
          <td>
            {{ torrent.availability }}
          </td>
        </tr>
        <tr id="torrentPrivate">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.is_private') | titleCase }}
          </td>
          <td>
            {{ isPrivateTorrent }}
          </td>
        </tr>
        <tr id="torrentWastedSize">
          <td :class="commonStyle">
            {{ $t('modals.detail.pageInfo.wasted_size') | titleCase }}
          </td>
          <td>
            {{ wastedSize | formatData(shouldUseBinaryData()) }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import {FullScreenModal, TorrentDashboardItem} from '@/mixins'
import qbit from '@/services/qbit'
import { splitByUrl, stringContainsUrl } from '@/helpers'
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Info',
  mixins: [FullScreenModal, TorrentDashboardItem],
  props: {
    isActive: Boolean
  },
  data() {
    return {
      commonStyle: 'caption',
      comment: '',
      createdBy: '',
      creationDate: '',
      isPrivateTorrent: false,
      wastedSize: 0
    }
  },
  async mounted() {
    await this.getTorrentProperties()
  },
  computed: {
    ...mapState(['webuiSettings']),
    seedingTime() {
      if (!this.torrent?.seeding_time) return ''

      const content = this.$t('modals.detail.pageInfo.seededFor').toString().replace('$0', this.torrent.seeding_time)
      return `(${content})`
    }
  },
  methods: {
    async getTorrentProperties() {
      const props = await qbit.getTorrentProperties(this.torrent?.hash as string)
      this.comment = props.comment
      this.createdBy = props.created_by
      // @ts-expect-error: TS2339: Property 'dateFormat' does not exist on type 'never'.
      this.creationDate = dayjs(props.creation_date * 1000).format(this.webuiSettings.dateFormat)
      this.isPrivateTorrent = props.is_private
      this.wastedSize = props.total_wasted
    },
    stringContainsUrl(string: string) {
      return stringContainsUrl(string)
    },
    splitString(string: string) {
      return splitByUrl(string)
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.v-data-table thead th),
:deep(.v-data-table tbody td) {
  padding: 0 !important;
  height: 3em;

  &:first-child {
    padding: 0 0 0 8px !important;
  }

  &:last-child {
    padding-right: 8px !important;
  }
}

:deep(.v-data-table tbody td.caption) {
  width: 20%;
}

#pieceStates {
  display: block;

  canvas {
    height: 100%;
    width: 75%;
    border: 1px dotted;
  }
}
</style>
