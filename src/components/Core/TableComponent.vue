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

    .vt-resizable-column-handle {
      position: absolute;
      right: 0px;
      width: 6px;
      top: 0;
      height: 100%;
      cursor: col-resize;
      user-select: none;
      touch-action: none;
    }

    &[data-resizable-key] {
      .vt-resizable-column-handle {
        &::after {
          content: '';
          position: absolute;
          right: 0px;
          top: 18%;
          bottom: 18%;
          width: 1px;
          background: rgba(var(--v-theme-on-surface), 0.25);
        }
      }

      > :not(.vt-resizable-column-handle) {
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
