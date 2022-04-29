<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ hasInitialCategory ? $t('edit') : $t('createNew') }} {{ $t('category') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-form ref="categoryForm" class="px-6 mt-3">
          <v-container>
            <v-text-field
              v-model="category.name"
              :rules="nameRules"
              :counter="15"
              :label="$t('modals.newCategory.categoryName')"
              required
              :disabled="hasInitialCategory"
            />
            <v-text-field
              v-model="category.savePath"
              :rules="PathRules"
              :counter="40"
              :label="$t('path')"
              required
            />
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          v-if="!hasInitialCategory"
          class="accent white--text elevation-0 px-4"
          @click="create"
        >
          {{ $t('create') }}
        </v-btn>
        <v-btn
          v-else
          class="accent white--text elevation-0 px-4"
          @click="edit"
        >
          {{ $t('edit') }}
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="cancel"
        >
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
import { mdiCancel, mdiTagPlus, mdiPencil } from '@mdi/js'
import Vue from 'vue'

export default {
  name: 'CreateNewCategoryDialog',
  mixins: [Modal],
  props: {
    initialCategory: Object
  },
  data: () => ({
    nameRules: [
      v => !!v || this.$i18n.t('modals.newCategory.tipOnNoName'),
      v =>
        (v && v.length <= 15) ||
          this.$i18n.t('modals.newCategory.tipOnNameTooLong')
    ],
    PathRules: [
      v => !!v || this.$i18n.t('modals.newCategory.tipOnNoPath'),
      v => (v && v.length <= 40) || this.$i18n.t('modals.newCategory.TipOnPathTooLong')
    ],
    category: { name: '', savePath: '' },
    mdiCancel, mdiTagPlus, mdiPencil
  }),
  computed: {
    ...mapGetters(['getSelectedCategory']),
    hasInitialCategory() {
      return !!(this.initialCategory &&
          this.initialCategory.name)
    }
  },
  created() {
    this.$store.commit('FETCH_CATEGORIES')
    if (this.hasInitialCategory) {
      this.category = this.initialCategory
    }
  },
  methods: {
    create() {
      qbit.createCategory(this.category)
      this.cancel()
    },
    cancel() {
      this.$store.commit('FETCH_CATEGORIES')
      this.dialog = false
    },
    edit() {
      qbit.editCategory(this.category)
      Vue.$toast.success(this.$t('toast.categorySaved'))
      this.cancel()
    }
  }
}
</script>

<style></style>
