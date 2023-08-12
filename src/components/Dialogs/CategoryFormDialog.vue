<script setup lang="ts">
import { useMaindataStore } from '@/stores'
import { Category } from '@/types/qbit/models'
import { PropType, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VForm } from 'vuetify/components'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },

  initialCategory: {
    type: Object as PropType<Category>,
    required: false,
    default: null
  }
})
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const maindataStore = useMaindataStore()

const dialogVisible = ref(false)

const form = ref<VForm>()
const isFormValid = ref(false)
const nameRules = [
  (v: string) => !!v || t('dialogs.category.nameRequired')
]

const formData = reactive<Category>({
  name: '',
  savePath: ''
})

async function submit() {
  if (!isFormValid.value) return

  if (!!props.initialCategory) {
    await maindataStore.editCategory(formData, props.initialCategory.name === formData.name ? undefined : props.initialCategory.name)
  } else {
    await maindataStore.createCategory(formData)
  }

  close()
}

const close = () => {
  dialogVisible.value = false
}

watch(() => dialogVisible.value, (value) => {
  emit('update:modelValue', value)

  if (value) {
    formData.name = props.initialCategory?.name || ''
    formData.savePath = props.initialCategory?.savePath || ''
  } else {
    form.value?.reset()
  }
})
</script>

<template>
  <v-dialog v-model="dialogVisible" activator="parent">
    <v-card>
      <v-card-title>{{ $t(`dialogs.category.title.${initialCategory ? 'edit' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent @keydown.enter.prevent="submit">
          <v-text-field v-if="!!initialCategory"
                        :model-value="initialCategory.name"
                        disabled
                        :label="$t('dialogs.category.oldName')" />
          <v-text-field
            v-model="formData.name"
            :rules="nameRules"
            :autofocus="!initialCategory"
            :label="$t('dialogs.category.name')" />
          <v-text-field
            v-model="formData.savePath"
            :autofocus="!!initialCategory"
            :label="$t('dialogs.category.savePath')" />
          <v-scroll-x-transition>
            <div class="text-warning" v-if="!!initialCategory && initialCategory.name !== formData.name">
              <v-icon>mdi-alert</v-icon>
              {{ $t('dialogs.category.warnEdit') }}
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

<style scoped>

</style>