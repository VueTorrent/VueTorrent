<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ hasInitialCategory ? 'Edit' : 'Create New' }} Category</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-form ref="categoryForm" class="px-6 mt-3">
          <v-container>
            <v-text-field
              v-model="category.name"
              :rules="nameRules"
              :counter="15"
              label="Category name"
              required
              :disabled="hasInitialCategory"
            />
            <v-text-field
              v-model="category.savePath"
              :rules="PathRules"
              :counter="40"
              label="Path"
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
          Create
        </v-btn>
        <v-btn
          v-else
          class="accent white--text elevation-0 px-4"
          @click="edit"
        >
          Edit
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="cancel"
        >
          Cancel
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
    hndlDialog: true,
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
    category: { name: '', savePath: '' },
    mdiCancel, mdiTagPlus, mdiPencil
  }),
  computed: {
    ...mapGetters(['getSelectedCategory']),
    hasInitialCategory() {
      return !!(this.initialCategory &&
          this.initialCategory.name)
    },
    dialog: {
      get: function () {
        return this.hndlDialog
      },
      set: function (e) {
        this.hndlDialog = e
        if (e === false)
          this.deleteModal()
      }
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
      Vue.$toast.success('Category edited successfully!')
      this.cancel()
    }
  }
}
</script>

<style></style>
