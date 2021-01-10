<template>
  <v-card flat>
    <perfect-scrollbar>
      <v-card-text :style="{ minHeight: phoneLayout ? '' : '70vh', maxHeight: '70vh'}">
        <v-layout class="mx-auto" row wrap>
          <v-flex xs12 sm12 md6>
            <v-card flat class="ma-1">
              <v-card-title>
                <h3 class="mx-auto">
                  Available Tags:
                </h3>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <template v-for="(item, index) in availableTags">
                    <v-list-item :key="item.title">
                      <v-list-item-content>
                        <v-list-item-title v-text="item" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="index < availableTags.length - 1"
                      :key="index"
                    />
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-card flat class="ma-1">
              <v-card-title>
                <h3 class="mx-auto">
                  Available Categories:
                </h3>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <template v-for="(item, index) in availableCategories">
                    <v-list-item :key="item.title">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="index < availableCategories.length - 1"
                      :key="index"
                    />
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </perfect-scrollbar>
  </v-card>
</template>

<script>
import { difference } from 'lodash'
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'TorrentTagsAndCategories',
  mixins: [FullScreenModal],
  props: {
    hash: String
  },
  data: () => ({
    categories: []
  }),
  computed: {
    ...mapGetters(['getTorrent', 'getAvailableTags', 'getCategories']),
    torrent() {
      return this.getTorrent(this.hash)
    },
    availableTags() {
      const availableTags = this.getAvailableTags()
      const currentTags = this.getTorrent(this.hash).tags
      
      return difference(availableTags, currentTags)
    },
    availableCategories() {
      return this.getCategories()
    }
  },
  created() {
    this.$store.commit('FETCH_CATEGORIES')
  },
  methods: {
    addTag(tag) {
      qbit.addTorrentTag(this.hash, tag)
    },
    deleteTag(tag) {
      qbit.removeTorrentTag(this.hash, tag)
    },
    setCategory(cat) {
      qbit.setCategory(this.hash, cat)
    },
    deleteCategory() {
      qbit.setCategory(this.hash, '')
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
