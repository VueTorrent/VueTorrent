<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue'
import Rule from './Rule.vue'
import RssRuleDialog from '@/components/Dialogs/RssRuleDialog.vue'
import { useDialogStore, useRssStore } from '@/stores'
import { FeedRule } from '@/types/qbit/models'

defineProps<{
  height: number
}>()

const dialogStore = useDialogStore()
const rssStore = useRssStore()

function openRuleDialog(initialRule?: FeedRule) {
  dialogStore.createDialog(RssRuleDialog, { initialRule }, () => void rssStore.syncRules())
}

onBeforeMount(() => {
  rssStore.resumeRuleTimer()
})

onUnmounted(() => {
  rssStore.pauseRuleTimer()
})
</script>

<template>
  <v-card v-if="!rssStore.isRulesLoaded" :height="height">
    <v-empty-state :title="$t('rssArticles.loading')">
      <template #media>
        <v-progress-circular class="mb-3" indeterminate :size="100" :width="12" />
      </template>
    </v-empty-state>
  </v-card>

  <v-card v-else-if="!rssStore.rules.length" :height="height">
    <v-empty-state :title="$t('rssArticles.rules.empty.value')" icon="mdi-rss-off">
      <template #actions>
        <v-btn :text="$t('rssArticles.rules.empty.action')" color="accent" @click="openRuleDialog()" />
      </template>
    </v-empty-state>
  </v-card>

  <div v-else id="rss-rules" class="pa-3">
    <v-row class="mt-2">
      <v-col v-for="rule in rssStore.rules" :key="rule.name" cols="12" sm="6" lg="3">
        <Rule :value="rule" @open-rule="openRuleDialog" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-btn color="accent" @click="openRuleDialog()">
          {{ $t('rssArticles.rules.empty.action') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
