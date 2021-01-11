<template>
  <v-container>
    <v-card flat>
      <perfect-scrollbar>
        <v-card-text :style="{ minHeight: phoneLayout ? '' : '70vh', maxHeight: '70vh'}">
          <v-layout row wrap>
            <v-flex class="mx-auto" xs12 md6>
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

                        <v-list-item-action>
                          <v-icon color="red" @click="deleteTag(item)">
                            {{ mdiDelete }}
                          </v-icon>
                        </v-list-item-action>
                      </v-list-item>

                      <v-divider
                        v-if="index < availableTags.length - 1"
                        :key="index"
                      />
                    </template>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    class="accent white--text mx-auto"
                    @click="createTag"
                  >
                    Create new
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex class="mx-auto" xs12 md6>
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

                        <v-list-item-action>
                          <v-icon @click="editCategory(item)">
                            {{ mdiPencil }}
                          </v-icon>
                        </v-list-item-action>
                        <v-list-item-action>
                          <v-icon color="red" @click="deleteCategory(item)">
                            {{ mdiDelete }}
                          </v-icon>
                        </v-list-item-action>
                      </v-list-item>

                      <v-divider
                        v-if="index < availableCategories.length - 1"
                        :key="index"
                      />
                    </template>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    class="accent white--text mx-auto"
                    @click="createCategory"
                  >
                    Create new
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </perfect-scrollbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { mdiDelete, mdiPencil } from '@mdi/js'

import { Tab, General, FullScreenModal } from '@/mixins'

export default {
  name: 'TagsAndCategories',
  mixins: [Tab, General, FullScreenModal],
  props: {
    hash: String
  },
  data: () => ({
    selectedCategory: null,
    mdiDelete,
    mdiPencil
  }),
  computed: {
    ...mapGetters(['getTorrent', 'getAvailableTags', 'getCategories']),
    availableTags() {
      return this.getAvailableTags()
    },
    availableCategories() {
      return this.getCategories()
    }
  },
  created() {
    this.$store.commit('FETCH_CATEGORIES')
  },
  methods: {
    activeMethod() {
      this.$store.commit('FETCH_CATEGORIES')
    },
    deleteTag(item) {
      qbit.deleteTag(item)
    },
    createTag() {
      this.createModal('CreateTagDialog')
    },
    createCategory() {
      this.createModal('CreateCategoryDialog')
    },
    deleteCategory(category) {
      qbit.deleteCategory(category.name)
      this.$store.commit('FETCH_CATEGORIES')
    },
    editCategory(cat) {
      this.createModal('CreateCategoryDialog', { initialCategory: cat })
    }
  }
}
</script>

