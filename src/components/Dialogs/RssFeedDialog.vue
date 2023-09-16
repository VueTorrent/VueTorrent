<script setup lang="ts">
import { useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  modelValue: boolean
  disableActivator?: boolean
  initialFeed?: Feed
}>()
const emit = defineEmits(['update:modelValue'])

const rssStore = useRssStore()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive({
  name: '',
  url: ''
})

async function save() {
  if (props.initialFeed) {
    await rssStore.editFeed(props.initialFeed.name, formData.name)
  } else {
    await rssStore.createFeed(formData.name, formData.url)
  }
  await rssStore.fetchFeeds()
  close()
}

const close = () => {
  dialogVisible.value = false
}

onBeforeMount(() => {
  if (props.initialFeed) {
    formData.name = props.initialFeed.name
    formData.url = props.initialFeed.url
  }
})
</script>

<template>
  <v-dialog v-model="dialogVisible" :activator="disableActivator ? undefined : 'parent'">
    <v-card>
      <v-card-title>{{ $t(`dialogs.rss.feed.title.${initialFeed ? 'edit' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-model="formData.name" :label="$t('dialogs.rss.feed.name')" />
          <v-text-field v-model="formData.url" :disabled="!!initialFeed" :label="$t('dialogs.rss.feed.url')" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" @click="save">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
