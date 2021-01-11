<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-container style="min-height: 200px" :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>{{ hasInitialCategory ? 'Edit' : 'Create New' }} Category</h2>
        </v-card-title>

        <v-form ref="categoryForm" class="px-6 mt-3">
          <v-container>
            <v-text-field
              v-model="category.name"
              class="mx-auto"
              style="max-width: 200px"
              :rules="nameRules"
              :counter="15"
              label="Category name"
              required
              :disabled="hasInitialCategory"
            />
            <v-text-field
              v-model="category.savePath"
              class="mx-auto"
              style="max-width: 200px"
              :rules="PathRules"
              :counter="40"
              label="Path"
              required
            />
          </v-container>
        </v-form>
      </v-container>
      <v-card-actions class="justify-center pb-5 project done">
        <v-btn
          text
          class="error white--text mt-3"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="!hasInitialCategory"
          text
          class="accent white--text mt-3"
          @click="create"
        >
          Save
        </v-btn>
        <v-btn
          v-else
          text
          class="accent white--text mt-3"
          @click="edit"
        >
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { Modal } from '@/mixins'
import Vue from 'vue'

export default {
  name: 'CreateNewCategoryDialog',
  mixins: [Modal],
  props: {
    initialCategory: Object
  },
  data: () => ({
    nameRules: [
      v => !!v || 'Category name is required',
      v =>
        (v && v.length <= 15) ||
          'Category name must be less than 15 characters'
    ],
    PathRules: [
      v => !!v || 'Path is required',
      v => (v && v.length <= 40) || 'Path must be less than 40 characters'
    ],
    category: { name: '', savePath: '' }
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
      this.deleteModal()
    },
    edit() {
      qbit.editCategory(this.category)
      Vue.$toast.success('Category edited successfully!')
      this.cancel()
    }
  }
}
</script>

<style></style>
