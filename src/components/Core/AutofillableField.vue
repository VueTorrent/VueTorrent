<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

const {
  title,
  prependIcon,
  prependIconInner,
  appendIcon,
  appendIconInner,
  disabled = false,
} = defineProps<{
  title: string
  prependIcon?: string
  prependIconInner?: string
  appendIcon?: string
  appendIconInner?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
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

function hasListenerFor(eventName: string) {
  const handlerKey = 'on' + eventName

  const inst = getCurrentInstance()
  const vnodeProps = (inst && inst.vnode && (inst.vnode as any).props) || {}

  return (
    !!vnodeProps[handlerKey] ||
    Object.keys(vnodeProps).some(k => {
      const lk = k.toLowerCase()
      const lowerEvent = eventName.toLowerCase()
      return lk.endsWith(lowerEvent) || lk.endsWith(lowerEvent.replace(':', ''))
    })
  )
}

function optionalClick(eventName: string) {
  return computed(() => {
    if (disabled) return {}
    if (!hasListenerFor(eventName)) return {}
    return {
      click: (event: MouseEvent) => {
        event.preventDefault()
        emit(eventName as any)
      },
    }
  })
}

const onPrepend = optionalClick('click:prepend')
const onPrependInner = optionalClick('click:prependInner')
const onAppendInner = optionalClick('click:appendInner')
const onAppend = optionalClick('click:append')
</script>

<template>
  <div :class="{ 'autofill-container--disabled': disabled }" class="my-2 border-0">
    <div>{{ title }}</div>
    <div class="d-flex flex-row mt-2 ga-2 align-center">
      <v-icon v-if="prependIcon" :icon="prependIcon" color="accent" v-on="onPrepend" />
      <div class="autofill-container d-flex flex-grow-1 align-center border border-opacity-50 pa-2 rounded-lg">
        <v-icon v-if="prependIconInner" :icon="prependIconInner" color="accent" v-on="onPrependInner" />
        <input v-model="modelValue" :disabled="disabled" class="flex-grow-1" style="height: 32px" v-bind="$attrs" @keydown.enter.prevent="!disabled && $emit('submit')" />
        <v-icon v-if="appendIconInner" :icon="appendIconInner" color="accent" v-on="onAppendInner" />
      </div>
      <v-icon v-if="appendIcon" :icon="appendIcon" color="accent" v-on="onAppend" />
    </div>
  </div>
</template>

<style scoped>
div.autofill-container:focus-within {
  outline: white solid 1px;
}

div.autofill-container--disabled {
  opacity: 0.5;
  pointer-events: none;
}

input:focus {
  outline: none;
}
</style>
