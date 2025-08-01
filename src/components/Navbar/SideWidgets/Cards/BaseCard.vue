<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { CardProps } from './CardProps'

const { active = false, title, icon, orientation = 'column', color } = defineProps<CardProps<T>>()

defineEmits<{
  click: [MouseEvent]
}>()

const textColorClass = computed(() => (color ? `text-${color}` : ''))
const contentOrientation = computed(() => {
  switch (orientation) {
    case 'row':
      return 'flex-row'
    case 'column':
    default:
      return 'flex-column'
  }
})
</script>

<template>
  <v-sheet
    :title="title"
    :class="['flex-grow-1', 'pa-2', !!$.vnode.props?.onClick ? 'cursor-pointer' : '']"
    :color="active ? 'secondary-lighten-1' : 'secondary'"
    min-width="48px"
    rounded="lg"
    @click.stop="$emit('click', $event)">
    <div :class="['d-flex', 'align-center', 'justify-space-evenly', contentOrientation, 'ga-1', 'h-100', 'w-100']">
      <v-icon data-testid="card-icon" :color="color">{{ icon }}</v-icon>

      <div data-testid="card-content" :class="['flex-row', 'text-center', 'text-select', 'wrap-anywhere', textColorClass]">
        <template v-if="Array.isArray(value)">
          <template v-for="(val, i) in value" :key="i">
            <v-divider v-if="i > 0" opacity=".75" thickness="2" style="border-top-style: dashed" />
            <div>
              <slot :value="val"></slot>
            </div>
          </template>
        </template>
        <slot v-else :value="value"></slot>
      </div>
    </div>
  </v-sheet>
</template>
