<script setup lang="ts">
import RssRuleDialog from '@/components/Dialogs/RssRuleDialog.vue'
import { useDialogStore, useRssStore } from '@/stores'
import { FeedRule } from '@/types/qbit/models'
import { onBeforeMount, onUnmounted } from 'vue'
import Rule from './Rule.vue'

defineProps<{
  height: number
}>()

const dialogStore = useDialogStore()
const rssStore = useRssStore()

function openRuleDialog(initialRule?: FeedRule) {
  dialogStore.createDialog(RssRuleDialog, { initialRule }, rssStore.resumeRuleTimer)
}

onBeforeMount(() => {
  rssStore.resumeRuleTimer()
})

onUnmounted(() => {
  rssStore.pauseRuleTimer()
})
</script>

<template>
  <v-card v-if="!rssStore.rules.length" :height="height">
    <v-empty-state :title="$t('rssArticles.rules.empty.value')" icon="mdi-rss-off">
      <template #actions>
        <v-btn :text="$t('rssArticles.rules.empty.action')" color="accent" @click="openRuleDialog()" />
      </template>
    </v-empty-state>
  </v-card>

  <template v-else id="rss-rules" class="pa-3">
    <v-row class="mt-2">
      <v-col cols="12" sm="6" lg="3" v-for="rule in rssStore.rules">
        <Rule :value="rule" @openRule="openRuleDialog" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-btn color="accent" @click="openRuleDialog()">
          {{ $t('rssArticles.rules.empty.action') }}
        </v-btn>
      </v-col>
    </v-row>
  </template>
</template>
