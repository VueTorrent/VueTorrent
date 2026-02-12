<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'
import { useDialog, useI18nUtils } from '@/composables'
import { useTagStore } from '@/stores'

const props = defineProps<{
  guid: string
  initialTag?: string
}>()

const emit = defineEmits<{
  submit: [string[]]
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const tagStore = useTagStore()

const isFormValid = ref(false)
const rules = ref([(v: string) => !!v || t('dialogs.tag.required'), (v: string) => !props.initialTag || (!!props.initialTag && !v.includes(',')) || t('dialogs.tag.comma')])

const tagName = ref('')

async function submit() {
  if (!isFormValid.value) return

  let tagSent
  if (props.initialTag) {
    tagSent = [tagName.value]
    await tagStore.editTag(props.initialTag, tagName.value)
  } else {
    tagSent = tagName.value.split(',')
    await tagStore.createTags(tagSent)
  }

  emit('submit', tagSent)

  close()
}

function close() {
  isOpened.value = false
}

onBeforeMount(() => {
  tagName.value = props.initialTag || ''
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t(`dialogs.tag.title.${initialTag ? 'rename' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent @keydown.enter.prevent="submit">
          <v-text-field v-if="initialTag" :model-value="initialTag" disabled :label="$t('dialogs.tag.oldName')" />
          <v-text-field v-model="tagName" :rules="rules" autofocus :hint="$t('dialogs.tag.hint')" :label="$t('dialogs.tag.name')" />
          <v-scroll-x-transition>
            <div v-if="!!initialTag && initialTag !== tagName" class="text-warning">
              <v-icon>mdi-alert</v-icon>
              {{ $t('dialogs.tag.warnEdit') }}
            </div>
          </v-scroll-x-transition>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="submit">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
