<template>
  <v-card flat>
    <v-row dense class="ma-0 pa-0">
      <v-col cols="12" md="6">
        <v-subheader>{{ $t('modals.settings.pageTagsAndCategories.subHeaderTags') }}</v-subheader>
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
        <v-list-item>
          <v-btn
            class="mx-auto accent white--text elevation-0 px-4"
            @click="createTag"
          >
            {{ $t('modals.settings.pageTagsAndCategories.btnCreateNew') }}
          </v-btn>
        </v-list-item>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-subheader>{{ $t('modals.settings.pageTagsAndCategories.subHeaderCategories') }}</v-subheader>
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
        <v-list-item>
          <v-btn
            class="mx-auto accent white--text elevation-0 px-4"
            @click="createCategory"
          >
            {{ $t('modals.settings.pageTagsAndCategories.btnCreateNew') }}
          </v-btn>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
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

