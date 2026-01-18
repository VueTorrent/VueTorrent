<script setup lang="ts">
import { useI18nUtils } from '@/composables'
import { useDialogStore, useRssStore } from '@/stores'
import { FeedRule } from '@/types/qbit/models'

defineProps<{
  value: FeedRule
}>()

defineEmits<{
  openRule: [rule: FeedRule]
}>()

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const rssStore = useRssStore()

async function toggleRule(rule: FeedRule) {
  await rssStore.setRule(rule.name, { ...rule, enabled: !rule.enabled })
  rssStore.fetchRulesTask.perform()
}

function deleteRule(rule: FeedRule) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteRule'),
    text: rule.name,
    yesColor: 'error',
    onConfirm: async () => {
      await rssStore.deleteRule(rule.name)
      await rssStore.fetchRulesTask.perform()
    },
  })
}
</script>

<template>
  <v-sheet rounded="xl" class="d-flex align-center">
    <div class="pl-4">
      {{ value.name }}
    </div>
    <v-spacer />
    <div>
      <v-btn
        class="my-2 mr-2"
        :icon="value.enabled ? 'mdi-check' : 'mdi-cancel'"
        :color="value.enabled ? 'accent' : 'red'"
        variant="plain"
        density="compact"
        @click="toggleRule(value)" />

      <v-tooltip :text="$t('common.edit')" location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props" class="my-2 mr-2" icon="mdi-pencil" variant="plain" density="compact" @click="$emit('openRule', value)" />
        </template>
      </v-tooltip>

      <v-tooltip :text="$t('common.delete')" location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props" class="my-2 mr-2" icon="mdi-delete" color="red" variant="plain" density="compact" @click="deleteRule(value)" />
        </template>
      </v-tooltip>
    </div>
  </v-sheet>
</template>

<style scoped></style>
