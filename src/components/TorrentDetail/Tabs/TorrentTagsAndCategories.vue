<template>
  <v-card flat>
    <v-row dense class="ma-0 pa-0">
      <v-col cols="12" md="6">
        <v-subheader>{{ $t('modals.detail.tagsAndCategories.subHeaderTag') }}</v-subheader>
        <v-list-item-group :value="activeTags" active-class="accent--text" multiple>
          <template v-for="(item, index) in availableTags">
            <v-list-item link @click="addTag(item)" :key="item.title">
              <v-list-item-content>
                <v-list-item-title v-text="item" />
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index < availableTags.length - 1" :key="index" />
          </template>
        </v-list-item-group>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader>{{ $t('modals.detail.tagsAndCategories.subHeaderCategories') }}</v-subheader>
        <v-list-item-group :value="activeCategory" active-class="accent--text">
          <template v-for="(item, index) in availableCategories">
            <v-list-item link @click="setCategory(item)" :key="item.title">
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="index < availableCategories.length - 1" :key="index" />
          </template>
        </v-list-item-group>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'TorrentTagsAndCategories',
  mixins: [FullScreenModal],
  props: {
    hash: String,
    torrent: Object
  },
  data: () => ({
    categories: []
  }),
  computed: {
    ...mapGetters(['getAvailableTags', 'getCategories']),
    availableTags() {
      return this.getAvailableTags()
    },
    availableCategories() {
      return this.getCategories()
    },
    activeCategory() {
      return this.availableCategories.map(el => el.name).indexOf(this.torrent.category)
    },
    activeTags() {
      const active = []
      const tags = this.torrent.tags
      if (tags && tags.length) {
        tags.forEach(t => {
          const index = this.availableTags.indexOf(t)
          if (index !== -1) active.push(index)
        })
      }

      return active
    }
  },
  created() {
    this.$store.commit('FETCH_CATEGORIES')
    this.$store.commit('FETCH_TAGS')
  },
  methods: {
    async addTag(tag) {
      if (this.activeTags.includes(this.availableTags.indexOf(tag))) {
        await this.deleteTag(tag)
      }

      await qbit.addTorrentTag([this.hash], [tag])
    },
    async deleteTag(tag) {
      await qbit.removeTorrentTag([this.hash], [tag])
    },
    async setCategory(cat) {
      if (this.torrent.category === cat.name) {
        await this.deleteCategory()
      }

      await qbit.setCategory([this.hash], cat.name)
    },
    async deleteCategory() {
      await qbit.setCategory([this.hash], '')
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>