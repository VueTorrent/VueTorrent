<template>
  <v-card flat>
    <v-card-text
      class="mx-auto mt-4"
      style="font-size: 1.1em"
      :style="{ minHeight: phoneLayout ? '' : '75vh'}"
    >
      <v-row>
        <v-col :cols="12" :lg="6" :md="6" :sm="12">
          <v-layout class="mx-auto" row wrap>
            <v-flex xs12 sm12>
              <h3>Available Tags:</h3>
            </v-flex>
            <v-flex class="mt-3 d-flex flex-wrap justify-center" xs12 sm12>
              <v-chip
                v-for="tag in availableTags"
                :key="tag"
                small
                class="download white--text caption mx-2 my-1"
                style="font-size: 0.95em !important"
                @click="addTag(tag)"
              >
                {{ tag }}
              </v-chip>
            </v-flex>
          </v-layout>
          <v-layout class="mx-auto mt-12" row wrap>
            <v-flex xs12 sm12>
              <h3>Current Tags:</h3>
            </v-flex>
            <v-flex class="mt-3 d-flex flex-wrap justify-center" xs12 sm12>
              <div v-if="torrent.tags">
                <v-chip
                  v-for="tag in torrent.tags"
                  :key="tag"
                  small
                  close
                  class="download white--text caption mx-2 my-1"
                  style="font-size: 0.95em !important"
                  @click="deleteTag(tag)"
                  @click:close="deleteTag(tag)"
                  >{{ tag }}</v-chip
                >
              </div>
              <div v-else>None</div>
            </v-flex>
          </v-layout>
        </v-col>
        <v-col :cols="12" :lg="6" :md="6" :sm="12">
          <v-layout
            class="mx-auto"
            :class="this.$vuetify.breakpoint.smAndDown ? 'mt-12' : ''"
            row
            wrap
          >
            <v-flex xs12 sm12>
              <h3>Available Categories:</h3>
            </v-flex>
            <v-flex class="mt-3 d-flex flex-wrap justify-center" xs12 sm12>
              <v-chip
                v-for="cat in availableCategories"
                :key="cat.name"
                small
                class="upload white--text caption mx-2 my-1"
                style="font-size: 0.95em !important"
                @click="setCategory(cat.name)"
              >
                {{ cat.name }}
              </v-chip>
            </v-flex>
          </v-layout>
          <v-layout class="mx-auto mt-12" row wrap>
            <v-flex xs12 sm12>
              <h3>Current Category:</h3>
            </v-flex>
            <v-flex class="mt-3 d-flex justify-center" xs12 sm12>
              <v-chip
                v-if="torrent.category"
                small
                close
                class="upload white--text caption mx-2"
                style="font-size: 0.95em !important"
                @click="deleteCategory"
                @click:close="deleteCategory"
                >{{ torrent.category }}</v-chip
              >
              <div v-else>None</div>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { difference } from 'lodash'
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { FullScreenModal } from '@/mixins'

export default {
    name: 'TorrentTagsAndCategories',
    props: {
        hash: String
    },
    mixins: [FullScreenModal],
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
    },
    created() {
        this.$store.commit('FETCH_CATEGORIES')
    }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
