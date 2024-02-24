<script lang="ts" setup>
import AddTorrentParamsForm from './AddTorrentParamsForm.vue'
import { AddTorrentParams } from '@/types/qbit/models'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const addTorrentParams = defineModel<AddTorrentParams>({ required: true })
const isOpened = defineModel<boolean>('isOpened')

const { t } = useI18n()

const form = ref<typeof AddTorrentParamsForm>()

function close() {
  form.value?.saveFields()
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" :class="$vuetify.display.mobile ? '' : 'w-75'" :fullscreen="$vuetify.display.mobile" scrollable>
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.add.params.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <AddTorrentParamsForm v-model="addTorrentParams" />
      </v-card-text>

      <v-card-actions class="mb-2">
        <v-spacer />
        <v-btn :text="$t('common.close')" color="" variant="flat" @click="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
