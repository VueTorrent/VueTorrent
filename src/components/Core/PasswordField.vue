<script setup lang="ts">
import { computed, ref } from 'vue'
import AutofillableField from './AutofillableField.vue'

defineProps<{
  title: string
  hideIcon?: boolean
}>()

defineOptions({
  inheritAttrs: false,
})

const modelValue = defineModel<string>({ required: true })
const showPassword = ref(false)

function toggleShow() {
  showPassword.value = !showPassword.value
}

const type = computed(() => (showPassword.value ? 'text' : 'password'))
const icon = computed(() => (showPassword.value ? 'mdi-eye' : 'mdi-eye-off'))
</script>

<template>
  <AutofillableField v-model="modelValue" :append-icon-inner="hideIcon ? '' : icon" :title="title" :type="type" name="password" v-bind="$attrs" @click:append-inner="toggleShow" />
</template>
