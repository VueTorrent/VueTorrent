<template>
  <v-card flat>
    <v-row dense class="ma-0 pa-0">
      <v-col cols="12" md="6">
        <v-subheader>{{ $t('modals.settings.pageRss.pageFeeds.feeds') }}</v-subheader>
        <template v-for="(item, index) in availableFeeds">
          <v-list-item :key="item.uid">
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
            <v-list-item-action>
              <v-icon color="red" @click="deleteFeed(item)">
                {{ mdiDelete }}
              </v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < availableFeeds.length - 1"
            :key="index"
          />
        </template>
        <v-list-item>
          <v-btn
            class="mx-auto accent white--text elevation-0 px-4"
            @click="createFeed"
          >
            {{ $t('modals.settings.pageRss.pageFeeds.btnCreateNew') }}
          </v-btn>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { mdiDelete } from '@mdi/js'

import { Tab, General, FullScreenModal } from '@/mixins'

export default {
  name: 'Feeds',
  mixins: [Tab, General, FullScreenModal],
  data: () => ({
    mdiDelete
  }),
  computed: {
    ...mapGetters(['getFeeds']),
    availableFeeds() {
      return this.getFeeds()
    }
  },
  created() {
    this.$store.commit('FETCH_FEEDS')
  },
  methods: {
    activeMethod() {
      this.$store.commit('FETCH_FEEDS')
    },
    deleteFeed(item) {
      qbit.deleteFeed(item.name)
      this.$store.commit('FETCH_FEEDS')
    },
    createFeed() {
      this.createModal('FeedForm')
    }
  }
}
</script>