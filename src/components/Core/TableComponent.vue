<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { useTableResize } from '@/composables'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const rootId = computed(() => attrs.id as string | undefined)
const tableAttrs = computed<Record<string, any>>(() => attrs as Record<string, any>)

const rootRef = ref<HTMLElement | null>(null)
const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))
useTableResize(rootRef, rootId)
</script>

<template>
  <div ref="rootRef">
    <v-data-table v-bind="tableAttrs as any">
      <template v-for="name in slotNames" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss" scoped>
:deep(th),
:deep(td) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
