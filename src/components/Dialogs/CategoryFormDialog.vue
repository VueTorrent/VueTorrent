<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'
import { useDialog, useI18nUtils } from '@/composables'
import { useCategoryStore } from '@/stores'
import { Category } from '@/types/qbit/models'

const props = defineProps<{
  guid: string
  initialCategory?: Category
}>()

const emit = defineEmits<{
  submit: [Category]
}>()

const { t } = useI18nUtils()
const categoryStore = useCategoryStore()
const { isOpened } = useDialog(props.guid)

const isFormValid = ref(false)
const nameRules = [(v: string) => !!v || t('dialogs.category.nameRequired')]

const formData = reactive<Category>({
  name: '',
  savePath: '',
})

async function submit() {
  if (!isFormValid.value) return

  if (props.initialCategory) {
    await categoryStore.editCategory(formData, props.initialCategory.name === formData.name ? undefined : props.initialCategory.name)
  } else {
    await categoryStore.createCategory(formData)
  }

  emit('submit', formData)

  close()
}

function close() {
  isOpened.value = false
}

onBeforeMount(() => {
  formData.name = props.initialCategory?.name || ''
  formData.savePath = props.initialCategory?.savePath || ''
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t(`dialogs.category.title.${initialCategory ? 'edit' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent @keydown.enter.prevent="submit">
          <v-text-field v-if="!!initialCategory" :model-value="initialCategory.name" disabled :label="$t('dialogs.category.oldName')" />
          <v-text-field v-model="formData.name" :rules="nameRules" :autofocus="!initialCategory" :label="$t('dialogs.category.name')" />
          <v-text-field v-model="formData.savePath" :autofocus="!!initialCategory" :label="$t('dialogs.category.savePath')" />
          <v-scroll-x-transition>
            <div v-if="!!initialCategory && initialCategory.name !== formData.name" class="text-warning">
              <v-icon>mdi-alert</v-icon>
              {{ $t('dialogs.category.warnEdit') }}
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
