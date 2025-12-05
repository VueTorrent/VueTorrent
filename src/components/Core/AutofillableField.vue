<script setup lang="ts">
defineProps<{
  title: string
  prependIcon?: string
  prependIconInner?: string
  appendIcon?: string
  appendIconInner?: string
}>()

defineEmits<{
  (e: 'click:prepend'): void
  (e: 'click:prependInner'): void
  (e: 'click:append'): void
  (e: 'click:appendInner'): void
  (e: 'submit'): void
}>()

defineOptions({
  inheritAttrs: false,
})

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <div class="my-2 border-0">
    <div>{{ title }}</div>
    <div class="d-flex flex-row ma-3 ga-2 align-center">
      <v-icon v-if="prependIcon" :icon="prependIcon" color="accent" @click.prevent="$emit('click:prepend')" />
      <div class="autofill-container d-flex flex-grow-1 align-center border border-opacity-50 pa-2 rounded-lg">
        <v-icon v-if="prependIconInner" :icon="prependIconInner" color="accent" @click.prevent="$emit('click:prependInner')" />
        <input v-model="modelValue" class="flex-grow-1" style="height: 32px" v-bind="$attrs" @keydown.enter.prevent="$emit('submit')" />
        <v-icon v-if="appendIconInner" :icon="appendIconInner" color="accent" @click.prevent="$emit('click:appendInner')" />
      </div>
      <v-icon v-if="appendIcon" :icon="appendIcon" color="accent" @click.prevent="$emit('click:append')" />
    </div>
  </div>
</template>

<style scoped>
div.autofill-container:focus-within {
  outline: white solid 1px;
}

input:focus {
  outline: none;
}
</style>
