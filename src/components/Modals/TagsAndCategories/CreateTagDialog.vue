<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-container style="min-height: 200px" :class="`pa-0 project done`">
        <v-card-title class="justify-center">
          <h2>Create New Tag</h2>
        </v-card-title>

        <v-form class="px-6 mt-3">
          <v-container>
            <v-text-field
              v-model="tagname"
              class="mx-auto"
              style="max-width: 200px"
              :rules="rules"
              :counter="10"
              label="Tag name"
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
          text
          class="accent white--text mt-3"
          @click="create"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import qbit from '@/services/qbit'
import { Modal } from '@/mixins'
export default {
  name: 'CreateTagDialog',
  mixins: [Modal],
  data: () => ({
    tagname: '',
    rules: [
      v => !!v || 'Tag is required',
      v => v.length <= 10 || 'Tag must be less than 10 characters'
    ]
  }),
  methods: {
    create() {
      qbit.createTag(this.tagname)
      this.cancel()
    },
    cancel() {
      this.deleteModal()
    }
  }
}
</script>

<style></style>
