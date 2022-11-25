<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.newTag.createNewTag') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-form ref="tagForm" v-model="valid" class="px-6 mt-3">
          <v-container>
            <v-text-field v-model="tagname" :rules="rules" :label="$t('modals.newTag.tagName')" required />
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn class="accent white--text elevation-0 px-4" @click="create" :disabled="!valid">
          {{ $t('create') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="cancel">
          {{ $t('cancel') }}
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
    rules: [v => !!v || 'Tag is required'],
    valid: false
  }),
  methods: {
    create() {
      qbit.createTag(this.tagname)
      this.cancel()
    },
    cancel() {
      this.dialog = false
    }
  }
}
</script>

<style></style>
