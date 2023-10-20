<script setup lang="ts">
import RssRuleDialog from '@/components/Dialogs/RssRuleDialog.vue'
import { useDialogStore } from '@/stores/dialog'
import { useRssStore } from '@/stores/rss'
import { FeedRule } from '@/types/qbit/models'
import { useIntervalFn } from '@vueuse/core'
import { onBeforeMount, ref, watch } from 'vue'

const dialogStore = useDialogStore()
const rssStore = useRssStore()

const loading = ref(false)
const ruleDialog = ref('')

async function deleteRule(rule: FeedRule) {
  await rssStore.deleteRule(rule.name!)
  await rssStore.fetchRules()
}

async function updateRuleList() {
  if (loading.value) return

  loading.value = true
  await rssStore.fetchRules()
  loading.value = false
}

function openRuleDialog(initialRule?: FeedRule) {
  ruleDialog.value = dialogStore.createDialog(RssRuleDialog, { initialRule })
}

onBeforeMount(() => {
  updateRuleList()
  useIntervalFn(updateRuleList, 5000)
})

watch(
  () => dialogStore.isDialogOpened(ruleDialog.value),
  value => {
    if (!value) {
      updateRuleList()
    }
  }
)
</script>

<template>
  <v-row class="mt-2">
    <v-col cols="12" sm="6" lg="3" v-for="rule in rssStore.rules">
      <v-sheet rounded="xl" class="d-flex align-center">
        <div class="pl-4">{{ rule.name }}</div>
        <v-spacer />
        <div>
          <v-btn icon="mdi-pencil" variant="plain" density="compact" @click="openRuleDialog(rule)" />
          <v-btn icon="mdi-delete" color="red" variant="plain" @click="deleteRule(rule)" />
        </div>
      </v-sheet>
    </v-col>
    <v-col v-if="rssStore.rules.length === 0" cols="12">
      <v-card>
        <v-card-text>{{ $t('settings.rss.rules.noRules') }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex align-center justify-center">
      <v-btn color="accent" @click="openRuleDialog()">
        {{ $t('settings.rss.rules.createNew') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
