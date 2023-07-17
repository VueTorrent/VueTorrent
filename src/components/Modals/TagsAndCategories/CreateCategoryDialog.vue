<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px" @keydown.enter.prevent="submit">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ hasInitialCategory ? $t('edit') : $t('createNew') }} {{ $t('category') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            v-model="category.name"
            :rules="nameRules"
            :label="$t('modals.newCategory.categoryName')"
            required
            :autofocus="!hasInitialCategory"
            :disabled="hasInitialCategory"
          />
          <v-text-field v-model="category.savePath" :label="$t('path')" :autofocus="hasInitialCategory" />
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn v-if="!hasInitialCategory" class="accent white--text elevation-0 px-4" :disabled="!isValid" @click="create">
          {{ $t('create') }}
        </v-btn>
        <v-btn v-else class="accent white--text elevation-0 px-4" :disabled="!isValid" @click="edit">
          {{ $t('edit') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="cancel">
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
import { mdiCancel, mdiPencil, mdiTagPlus } from '@mdi/js'
import Vue from 'vue'

export default {
  name: 'CreateNewCategoryDialog',
  mixins: [Modal],
  props: {
    initialCategory: Object
  },
  data: () => ({
    category: { name: '', savePath: '' },
    mdiCancel,
    mdiTagPlus,
    mdiPencil
  }),
  computed: {
    ...mapGetters(['getSelectedCategory']),
    hasInitialCategory() {
      return !!(this.initialCategory && this.initialCategory.name)
    },
    nameRules() {
      return [v => !!v || this.$t('modals.newCategory.tipOnNoName')]
    },
    isValid() {
      return !!this.category.name
    }
  },
  created() {
    this.$store.commit('FETCH_CATEGORIES')
    if (this.hasInitialCategory) {
      this.category = this.initialCategory
    }
  },
  methods: {
    async submit() {
      if (this.hasInitialCategory) {
        await this.edit()
      } else {
        await this.create()
      }
    },
    async create() {
      if (!this.isValid) return
      await qbit.createCategory(this.category)
      this.cancel()
    },
    async edit() {
      if (!this.isValid) return
      await qbit.editCategory(this.category)
      Vue.$toast.success(this.$t('toast.categorySaved'))
      this.cancel()
    },
    cancel() {
      this.$store.commit('FETCH_CATEGORIES')
      this.dialog = false
    }
  }
}
</script>
