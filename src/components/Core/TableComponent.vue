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
  --vt-resizable-column-handle-line-offset: 6px;
  --vt-resizable-table-cell-padding-x: 16px;

  .v-table__wrapper > table {
    > thead > tr > th:not(.px-1),
    > thead > tr > td:not(.px-1),
    > tbody > tr > th:not(.pa-0),
    > tbody > tr > td:not(.pa-0) {
      padding-left: calc(var(--vt-resizable-table-cell-padding-x) - var(--vt-resizable-column-handle-line-offset));
      padding-right: calc(var(--vt-resizable-table-cell-padding-x) + var(--vt-resizable-column-handle-line-offset));
    }
  }

  th {
    position: relative;

    .vt-resizable-column-handle {
      position: absolute;
      right: 0px;
      width: 12px;
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
          right: var(--vt-resizable-column-handle-line-offset);
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
