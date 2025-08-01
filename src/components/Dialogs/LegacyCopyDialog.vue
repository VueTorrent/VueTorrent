<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VTextarea } from 'vuetify/components'
import { useDialog } from '@/composables'

const props = defineProps<{
  guid: string
  value: string
}>()
const emit = defineEmits<{
  submit: []
}>()

const { isOpened } = useDialog(props.guid)

const inputRef = ref<VTextarea>()

function selectContent() {
  inputRef.value?.select()
}

function close() {
  emit('submit')
  isOpened.value = false
}

onMounted(() => {
  selectContent()
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ $t('dialogs.legacy_copy.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-textarea ref="inputRef" :value="value" readonly @mousedown.prevent="selectContent" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="close">{{ $t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
