<script setup lang="ts">
import RssRuleDialog from '@/components/Dialogs/RssRuleDialog.vue'
import { useDialogStore, useRssStore } from '@/stores'
import { FeedRule } from '@/types/qbit/models'

const dialogStore = useDialogStore()
const rssStore = useRssStore()

function openRuleFormDialog(initialRule?: FeedRule) {
  dialogStore.createDialog(RssRuleDialog, { initialRule })
}

async function deleteRule(rule: FeedRule) {
  await rssStore.deleteRule(rule.name!)
  await rssStore.fetchRules()
}
</script>

<template>
  <v-row class="mt-2">
    <v-col cols="12" sm="6" lg="3" v-for="rule in rssStore.rules">
      <v-sheet rounded="xl" class="d-flex align-center">
        <div class="pl-4">{{ rule.name }}</div>
        <v-spacer />
        <div>
          <v-btn icon="mdi-pencil" variant="plain" density="compact" @click="openRuleFormDialog(rule)" />
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
      <v-btn color="accent" @click="openRuleFormDialog()">
        {{ $t('settings.rss.rules.createNew') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
