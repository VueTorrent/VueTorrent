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
                <v-list-item-group
                  :value="activeTags"
                  active-class="accent--text"
                  multiple
                >
                  <template v-for="(item, index) in availableTags">
                    <v-list-item :key="item" @click="addTag(item)">
                      <v-list-item-content>
                        <v-list-item-title v-text="item" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="index < availableTags.length - 1"
                      :key="index"
                    />
                  </template>
                </v-list-item-group>
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
                <v-list-item-group
                  :value="activeCategory"
                  active-class="accent--text"
                >
                  <template v-for="(item, index) in availableCategories">
                    <v-list-item :key="item.title" @click="setCategory(item)">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="index < availableCategories.length - 1"
                      :key="index"
                    />
                  </template>
                </v-list-item-group>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </perfect-scrollbar>
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
  },
  methods: {
    addTag(tag) {
      if (this.activeTags.includes(this.availableTags.indexOf(tag))) {
        return this.deleteTag(tag)
      }
      qbit.addTorrentTag(this.hash, tag)
    },
    deleteTag(tag) {
      qbit.removeTorrentTag(this.hash, tag)
    },
    setCategory(cat) {
      if (this.torrent.category === cat.name) {
        return qbit.setCategory([this.hash], '')
      }
      qbit.setCategory([this.hash], cat.name)
    },
    deleteCategory() {
      qbit.setCategory([this.hash], '')
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
