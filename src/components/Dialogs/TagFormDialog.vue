<script setup lang="ts">
import { useMaindataStore } from '@/stores'
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  modelValue: boolean
  disableActivator?: boolean
  initialTag?: string
}>()
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const maindataStore = useMaindataStore()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const form = ref<VForm>()
const isFormValid = ref(false)
const rules = ref([(v: string) => !!v || t('dialogs.tag.required'), (v: string) => !props.initialTag || (!!props.initialTag && !v.includes(',')) || t('dialogs.tag.comma')])

const tagName = ref('')

async function submit() {
  if (!isFormValid.value) return

  if (!!props.initialTag) {
    await maindataStore.editTag(props.initialTag, tagName.value)
  } else {
    await maindataStore.createTags(tagName.value.split(','))
  }

  close()
}
const close = () => {
  dialogVisible.value = false
}

onBeforeMount(() => {
  tagName.value = props.initialTag || ''
})
</script>

<template>
  <v-dialog v-model="dialogVisible" :activator="disableActivator ? undefined : 'parent'">
    <v-card>
      <v-card-title>{{ $t(`dialogs.tag.title.${initialTag ? 'rename' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent @keydown.enter.prevent="submit">
          <v-text-field v-if="initialTag" :model-value="initialTag" disabled :label="$t('dialogs.tag.oldName')" />
          <v-text-field v-model="tagName" :rules="rules" autofocus :hint="$t('dialogs.tag.hint')" :label="$t('dialogs.tag.name')" />
          <v-scroll-x-transition>
            <div class="text-warning" v-if="!!initialTag && initialTag !== tagName">
              <v-icon>mdi-alert</v-icon>
              {{ $t('dialogs.tag.warnEdit') }}
            </div>
          </v-scroll-x-transition>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="submit">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
