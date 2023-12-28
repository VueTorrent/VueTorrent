<script setup lang="ts">
import { useDialog } from '@/composables'
import { useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { onBeforeMount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  guid: string
  initialFeed?: Feed
}>()

const { t } = useI18n()
const { isOpened } = useDialog(props.guid)
const rssStore = useRssStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive({
  name: '',
  url: ''
})

const nameRules = [(v: string) => !!v || t('dialogs.rss.feed.rules.name_required')]
const urlRules = [(v: string) => !!v || t('dialogs.rss.feed.rules.url_required')]

async function save() {
  await form.value?.validate()
  if (!isFormValid.value) return

  if (props.initialFeed) {
    if (formData.url !== props.initialFeed.url) {
      await rssStore.setFeedUrl(props.initialFeed.name, formData.url)
    }
    if (formData.name !== props.initialFeed.name) {
      await rssStore.renameFeed(props.initialFeed.name, formData.name)
    }
  } else {
    await rssStore.createFeed(formData.name, formData.url)
  }
  await rssStore.fetchFeeds()
  close()
}

const close = () => {
  isOpened.value = false
}

onBeforeMount(() => {
  if (props.initialFeed) {
    formData.name = props.initialFeed.name
    formData.url = props.initialFeed.url
  }
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t(`dialogs.rss.feed.title.${initialFeed ? 'edit' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-model="formData.name" :rules="nameRules" :label="$t('dialogs.rss.feed.name')" @keydown.enter="save" />
          <v-text-field v-model="formData.url" :rules="urlRules" :label="$t('dialogs.rss.feed.url')" @keydown.enter="save" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="save">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
