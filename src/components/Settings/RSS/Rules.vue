<script setup lang="ts">
import RssRuleDialog from '@/components/Dialogs/RssRuleDialog.vue'
import { useRssStore } from '@/stores'
import { FeedRule } from '@/types/qbit/models'
import { ref } from 'vue'

const rssStore = useRssStore()

const dialog = ref(false)

async function deleteRule(rule: FeedRule) {
  await rssStore.deleteRule(rule.name!)
  await rssStore.fetchRules()
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" lg="3" v-for="rule in rssStore.rules">
      <v-sheet rounded="xl" class="d-flex align-center">
        <div class="pl-4">{{ rule.name }}</div>
        <v-spacer />
        <div>
          <v-btn icon variant="plain" density="compact">
            <v-icon>mdi-pencil</v-icon>
            <RssRuleDialog v-model="dialog" :initial-rule="rule" />
          </v-btn>
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
      <v-btn color="accent"
             @click.prevent>
        {{ $t('settings.rss.rules.createNew')}}
        <RssRuleDialog v-model="dialog" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

</style>