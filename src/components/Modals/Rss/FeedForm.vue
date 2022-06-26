<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ hasInitialFeed ? $t('edit') : $t('createNew') }} {{ $t('feed') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-form ref="feedForm" class="px-6 mt-3">
          <v-container>
            <v-text-field
              v-model="feed.name"
              :rules="nameRules"
              :counter="15"
              :label="$t('modals.newFeed.feedName')"
              required
              :disabled="hasInitialFeed"
            />
            <v-text-field
              v-model="feed.url"
              :label="$t('modals.newFeed.url')"
              required
            />
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          v-if="!hasInitialFeed"
          class="accent white--text elevation-0 px-4"
          @click="create"
        >
          {{ $t('create') }}
        </v-btn>
        <v-btn
          v-else
          class="accent white--text elevation-0 px-4"
          @click="edit"
        >
          {{ $t('edit') }}
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="cancel"
        >
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { Modal } from '@/mixins'
import { mdiCancel, mdiTagPlus, mdiPencil } from '@mdi/js'
import Vue from 'vue'

export default {
  name: 'FeedForm',
  mixins: [Modal],
  props: {
    initialFeed: Object
  },
  data: () => ({
    feed: { name: '', savePath: '' },
    mdiCancel, mdiTagPlus, mdiPencil
  }),
  computed: {
    ...mapGetters(['getSelectedFeed']),
    hasInitialFeed() {
      return !!(this.initialFeed &&
          this.initialFeed.name)
    },
    nameRules() {
      return [
        v => !!v || this.$i18n.t('modals.newFeed.tipOnNoName'),
        v =>
          (v && v.length <= 15) ||
            this.$i18n.t('modals.newFeed.tipOnNameTooLong')
      ]
    }
    // urlRules() {
    //   return [
    //     v => !!v || this.$i18n.t('modals.newFeed.tipOnNoPath'),
    //     v => (v && v.length <= 40) || this.$i18n.t('modals.newFeed.TipOnPathTooLong')
    //   ]
    // }
  },
  created() {
    this.$store.commit('FETCH_FEEDS')
    if (this.hasInitialFeed) {
      this.feed = this.initialFeed
    }
  },
  methods: {
    create() {
      qbit.createfeed(this.feed)
      this.cancel()
    },
    cancel() {
      this.$store.commit('FETCH_FEEDS')
      this.dialog = false
    },
    edit() {
      qbit.editfeed(this.feed)
      Vue.$toast.success(this.$t('toast.feedSaved'))
      this.cancel()
    }
  }
}
</script>

<style></style>
