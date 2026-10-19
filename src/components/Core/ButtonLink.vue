<template>
  <v-btn :href="link" rel="noopener noreferrer" tag="a" @click.stop="onClick" />
</template>

<script setup lang="ts">
import { openLink } from '@/helpers'

const props = defineProps<{
  link: string
}>()

function onClick(event: MouseEvent) {
  event.preventDefault()
  openLink(props.link)
}
</script>
