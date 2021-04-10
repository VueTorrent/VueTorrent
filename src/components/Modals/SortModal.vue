<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <v-card>
      <v-container :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>{{ $t('sort.title') }}</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-6 mt-3 justify-center mx-auto">
            <v-container class="sortmodal">
              <v-select
                v-model="sort_options.sort"
                :value="sortProperty"
                flat
                class="ml-2 mr-2"
                :items="options"
                item-text="name"
                item-value="value"
                dense
                solo
                height="55"
              />
              <v-switch
                v-model="sort_options.reverse"
                class="v-input--reverse v-input--expand pa-0 ma-0"
                inset
                color="accent"
                style="padding-left: 10px !important"
              >
                <template #label>
                  {{ $t('sort.reverse') }}
                </template>
              </v-switch>
            </v-container>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { Modal } from '@/mixins'
import i18n from '@/locales'
export default {
  name: 'Sort',
  mixins: [Modal],
  data() {
    return {
      sortProperty: { value: 'added_on', name: i18n.tc('torrent.detail.info.addedOn') },
      reverse: true,
      options: [
        { value: 'added_on', name: i18n.tc('torrent.detail.info.addedOn') },
        { value: 'availability', name: i18n.tc('torrent.detail.info.availability') },
        { value: 'category', name: i18n.tc('torrent.detail.info.category') },
        { value: 'completed', name: i18n.tc('download.status.completed') },
        { value: 'dlspeed', name: i18n.tc('torrent.detail.info.download.speed') },
        { value: 'downloaded', name: i18n.tc('torrent.detail.info.downloaded') },
        { value: 'eta', name: i18n.tc('torrent.detail.info.ETA') },
        { value: 'name', name: i18n.tc('torrent.detail.info.title') },
        { value: 'num_leechs', name: i18n.tc('torrent.detail.info.peers') },
        { value: 'priority', name: i18n.tc('torrent.detail.info.priority') },
        { value: 'progress', name: i18n.tc('torrent.detail.info.progress') },
        { value: 'ratio', name: i18n.tc('torrent.detail.info.ratio') },
        { value: 'size', name: i18n.tc('torrent.detail.info.size') },
        { value: 'state', name: i18n.tc('torrent.detail.info.status') },
        { value: 'time_active', name: i18n.tc('torrent.detail.info.timeActive') },
        { value: 'uploaded', name: i18n.tc('torrent.detail.info.uploaded') },
        { value: 'upspeed', name: i18n.tc('torrent.detail.info.upload.speed') }
      ]
    }
  },
  computed: {
    ...mapState(['sort_options'])
  },
  methods: {
    close() {
      this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>

<style lang="scss" scoped>
.sortmodal .v-select__selection,
.v-input__icon i {
    color: var(--search) !important;
}
// Reversed input variant
::v-deep .v-input--reverse .v-input__slot {
    flex-direction: row-reverse;
    justify-content: flex-end;
    .v-application--is-ltr & {
        .v-input--selection-controls__input {
            margin-right: 0;
            margin-left: 8px;
        }
    }
    .v-application--is-rtl & {
        .v-input--selection-controls__input {
            margin-left: 0;
            margin-right: 8px;
        }
    }
}
</style>
