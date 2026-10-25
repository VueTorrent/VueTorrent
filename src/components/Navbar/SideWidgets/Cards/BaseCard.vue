<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { CardProps } from './CardProps'

const { active = false, title, icon, orientation = 'column', color, interactive = false } = defineProps<CardProps<T>>()

defineEmits<{
  click: [MouseEvent]
}>()

const cardColor = computed(() => {
  // Selected cards have a lighter background, which needs white text and icons for legibility.
  if (active) return 'white'
  if (color === 'download' || color === 'upload' || color === 'warning') return `sidebar-${color}`
  return color
})
const textColorClass = computed(() => (cardColor.value ? `text-${cardColor.value}` : ''))
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
    :tag="interactive ? 'button' : 'div'"
    :type="interactive ? 'button' : undefined"
    :aria-label="interactive ? title : undefined"
    :aria-pressed="interactive ? active : undefined"
    :class="['flex-grow-1', 'pa-2', interactive ? 'stat-card-button cursor-pointer' : '']"
    :color="active ? 'secondary-lighten-1' : 'secondary'"
    min-width="48px"
    rounded="lg"
    @click.stop="$emit('click', $event)">
    <div :class="['d-flex', 'align-center', 'justify-space-evenly', contentOrientation, 'ga-1', 'h-100', 'w-100']">
      <v-icon data-testid="card-icon" :color="cardColor">{{ icon }}</v-icon>

      <div data-testid="card-content" :class="['flex-row', 'text-center', 'text-select', 'wrap-anywhere', textColorClass]">
        <template v-if="Array.isArray(value)">
          <template v-for="(val, i) in value" :key="i">
            <v-divider v-if="i > 0" opacity=".75" thickness="2" style="border-top-style: dashed" />
            <div class="text-no-wrap">
              <slot :value="val"></slot>
            </div>
          </template>
        </template>
        <span v-else class="text-no-wrap">
          <slot :value="value"></slot>
        </span>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>
.stat-card-button:focus-visible {
  outline: 2px solid rgb(var(--v-theme-on-secondary));
  outline-offset: 2px;
}
</style>
