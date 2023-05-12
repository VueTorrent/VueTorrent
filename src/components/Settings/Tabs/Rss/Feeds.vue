<template>
  <v-card flat>
    <v-row dense class="ma-0 pa-0">
      <v-col cols="12" sm="6" lg="3" v-for="item in availableFeeds" :key="item.uid">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
          <v-list-item-action class="icon">
            <v-icon @click="updateFeed(item)">
              {{ mdiSync }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-action class="icon">
            <v-icon @click="editFeed(item)">
              {{ mdiPencil }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-action class="icon">
            <v-icon color="red" @click="deleteFeed(item)">
              {{ mdiDelete }}
            </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-btn class="mx-auto accent white--text elevation-0 px-4" @click="createFeed">
          {{ $t('modals.settings.rss.feeds.btnCreateNew') }}
        </v-btn>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-btn class="mx-auto accent white--text elevation-0 px-4" @click="refreshAll">
          {{ $t('modals.settings.rss.feeds.refreshAll') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { mdiDelete, mdiPencil, mdiSync } from '@mdi/js'
import qbit from '@/services/qbit'
import { Tab, General, FullScreenModal } from '@/mixins'
import { Feed } from '@/types/vuetorrent'

export default defineComponent({
  name: 'Feeds',
  mixins: [Tab, General, FullScreenModal],
  data: () => ({
    mdiPencil,
    mdiDelete,
    mdiSync
  }),
  computed: {
    ...mapGetters(['getFeeds']),
    availableFeeds(): Feed[] {
      // @ts-expect-error: TS2349: This expression is not callable. Type 'never' has no call signatures.
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
    async updateFeed(item: Feed) {
      await qbit.refreshFeed(item.name)
    },
    editFeed(item: Feed) {
      this.createModal('FeedForm', { initialFeed: { url: item.url, name: item.name } })
    },
    deleteFeed(item: Feed) {
      qbit.deleteFeed(item.name)
      this.$store.commit('FETCH_FEEDS')
    },
    createFeed() {
      this.createModal('FeedForm')
    },
    async refreshAll() {
      for (const feed of this.availableFeeds) {
        await this.updateFeed(feed)
      }
    }
  }
})
</script>

<style scoped>
.icon {
  margin-left: 16px;
}
</style>
