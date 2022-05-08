<template>
  <v-dialog
    v-model="dialog"
    scrollable
    content-class="rounded-form"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="justify-center primarytext--text">
        <h2>{{ $t('modals.sort.title') }}</h2>
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
                {{ $t('modals.sort.reverse') }}
              </template>
            </v-switch>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { Modal } from '@/mixins'
export default {
  name: 'Sort',
  mixins: [Modal],
  data() {
    return {
      sortProperty: { value: 'added_on', name: 'Added On' },
      reverse: true
    }
  },
  computed: {
    ...mapState(['sort_options']),
    options() {
      return [
        { value: 'added_on', name: this.$i18n.t('modals.sort.sortBy.addedOn') },
        { value: 'availability', name: this.$i18n.t('modals.sort.sortBy.availability') },
        { value: 'category', name: this.$i18n.t('modals.sort.sortBy.category') },
        { value: 'completed', name: this.$i18n.t('modals.sort.sortBy.completed') },
        { value: 'dlspeed', name: this.$i18n.t('modals.sort.sortBy.downloadSpeed') },
        { value: 'downloaded', name: this.$i18n.t('modals.sort.sortBy.downloaded') },
        { value: 'eta', name: this.$i18n.t('modals.sort.sortBy.ETA') },
        { value: 'name', name: this.$i18n.t('modals.sort.sortBy.name') },
        { value: 'num_leechs', name: this.$i18n.t('modals.sort.sortBy.peers') },
        { value: 'priority', name: this.$i18n.t('modals.sort.sortBy.priority') },
        { value: 'progress', name: this.$i18n.t('modals.sort.sortBy.progress') },
        { value: 'ratio', name: this.$i18n.t('modals.sort.sortBy.ratio') },
        { value: 'size', name: this.$i18n.t('modals.sort.sortBy.size') },
        { value: 'state', name: this.$i18n.t('modals.sort.sortBy.state') },
        { value: 'time_active', name: this.$i18n.t('modals.sort.sortBy.timeActive') },
        { value: 'uploaded', name: this.$i18n.t('modals.sort.sortBy.uploaded') },
        { value: 'upspeed', name: this.$i18n.t('modals.sort.sortBy.uploadSpeed') }
      ]
    }
  },
  methods: {
    close() {
      this.dialog = false
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
  @import "src/styles/styles.scss";
  @include reverse-switch;
}
</style>
