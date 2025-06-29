<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

defineProps<{
    hideIcon?: boolean
    prependIcon?: string
}>()

const attrs = useAttrs()
const showPassword = ref(false)

function toggleShow() {
    showPassword.value = !showPassword.value
}

const type = computed(() => (showPassword.value ? 'text' : 'password'))
const icon = computed(() => (showPassword.value ? 'mdi-eye' : 'mdi-eye-off'))
</script>

<template>
    <v-text-field
        v-bind="attrs"
        name="password"
        :type="type"
        :append-inner-icon="hideIcon ? '' : icon"
        @click:append-inner="toggleShow"
    >
        <template v-if="prependIcon" #prepend>
            <v-icon color="accent" :icon="prependIcon" />
        </template>
    </v-text-field>
</template>

<style scoped></style>
