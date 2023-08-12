<script setup lang="ts">
import { useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { onBeforeMount, ref, watch } from 'vue'
import { VForm } from 'vuetify/components'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },

  initialFeed: {
    type: Object as () => Feed | null,
    required: false,
    default: null
  }
})
const emit = defineEmits(['update:modelValue'])

const rssStore = useRssStore()

const dialogVisible = ref(false)

const form = ref<VForm>()
const isFormValid = ref(false)
const name = ref('')
const url = ref('')

async function save() {
  if (props.initialFeed) {
    await rssStore.editFeed(props.initialFeed.name, name.value)
  } else {
    await rssStore.createFeed(name.value, url.value)
  }
  await rssStore.fetchFeeds()
  form.value?.reset()
  close()
}
const close = () => {
  dialogVisible.value = false
}

onBeforeMount(() => {
  if (props.initialFeed) {
    name.value = props.initialFeed.name
    url.value = props.initialFeed.url
  }
})

watch(() => dialogVisible.value, (value) => emit('update:modelValue', value))
</script>

<template>
  <v-dialog v-model="dialogVisible" activator="parent">
    <v-card>
      <v-card-title>{{ $t(`dialogs.rss.feed.title.${initialFeed ? 'edit' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-model="name"
                        :label="$t('dialogs.rss.feed.name')" />
          <v-text-field v-model="url"
                        :disabled="!!initialFeed"
                        :label="$t('dialogs.rss.feed.url')" />
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

<style scoped>

</style>