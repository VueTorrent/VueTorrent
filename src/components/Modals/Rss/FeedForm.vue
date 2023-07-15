<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px" @keydown.enter.prevent="submit">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ hasInitialFeed ? $t('edit') : $t('createNew') }} {{ $t('feed') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-form ref="feedForm" class="px-6 mt-3">
          <v-container v-if="!hasInitialFeed">
            <v-text-field v-model="feed.url" :rules="rules" :label="$t('modals.newFeed.url')" autofocus required />
          </v-container>
          <v-container>
            <v-text-field v-model="feed.name" :rules="rules" :label="$t('modals.newFeed.feedName')" autofocus required />
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn class="accent white--text elevation-0 px-4" @click="submit">
          {{ $t(hasInitialFeed ? 'edit' : 'create') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="cancel">
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import qbit from '@/services/qbit'
import { Modal } from '@/mixins'
import { mdiCancel, mdiPencil, mdiTagPlus } from '@mdi/js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FeedForm',
  mixins: [Modal],
  props: {
    initialFeed: Object
  },
  data: () => ({
    feed: { url: '', name: '' },
    rules: [(v: string) => !!v || 'Required'],
    mdiCancel,
    mdiTagPlus,
    mdiPencil
  }),
  computed: {
    hasInitialFeed() {
      return !!(this.initialFeed && this.initialFeed.name && this.initialFeed.url)
    }
  },
  created() {
    if (this.hasInitialFeed) {
      this.feed = { ...this.initialFeed }
    }
  },
  methods: {
    cancel() {
      this.$store.commit('FETCH_FEEDS')
      this.dialog = false
    },
    async create() {
      await qbit.createFeed(this.feed)
      this.cancel()
    },
    async edit() {
      await qbit.editFeed(this.initialFeed.name, this.feed.name)
      this.$toast.success(this.$t('toast.feedSaved'))
      this.cancel()
    },
    async submit() {
      if (this.feed.name === '' || this.feed.url === '') return
      if (this.hasInitialFeed) await this.edit()
      else await this.create()
    }
  }
})
</script>
