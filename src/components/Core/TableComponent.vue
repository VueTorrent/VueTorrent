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
  <div ref="rootRef" class="vt-resizable-table">
    <v-data-table v-bind="tableAttrs as any">
      <template v-for="name in slotNames" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss">
.vt-resizable-table {
  th {
    position: relative;

    &[data-resizable-key] {
      .vt-resizable-column-handle {
        right: 0 !important;
        width: 12px !important;
      }

      &::after {
        content: '';
        position: absolute;
        top: 18%;
        bottom: 18%;
        right: 6px;
        width: 1px;
        background: rgba(var(--v-theme-on-surface), 0.25);
      }

      > * {
        overflow: hidden;
      }
    }
  }

  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
