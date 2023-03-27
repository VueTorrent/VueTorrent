<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card flat>
      <v-container class="pa-0 project done">
        <v-card-title class="justify-center">
          <v-toolbar flat dense class="transparent">
            <v-toolbar-title class="mx-auto">
              <h2>{{ $t('modals.matchingArticles.title') }}</h2>
            </v-toolbar-title>
            <v-btn fab small class="transparent elevation-0" @click="close">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-list subheader>
            <template v-for="item in matchingArticles" :key="item">
              <v-divider inset v-if="item.type === 'divider'" />
              <v-subheader inset v-else-if="item.type === 'subheader'">{{ item.value }}</v-subheader>
              <v-list-item v-else class="mb-3">{{ item.value }}</v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import qbit from '@/services/qbit'
import { mdiClose } from '@mdi/js'
import { Modal } from '@/mixins'

export default defineComponent({
  name: 'MatchingArticles',
  mixins: [Modal],
  props: {
    ruleName: String
  },
  data() {
    return {
      matchingArticles: [] as { type: string; value?: string }[],
      mdiClose
    }
  },
  async mounted() {
    if (this.ruleName === undefined) {
      this.close()
      return
    }

    const articles = await qbit.getMatchingArticles(this.ruleName)
    for (const feedName in articles) {
      const feedArticles = articles[feedName]
      if (this.matchingArticles.length > 0) this.matchingArticles.push({ type: 'divider' })

      this.matchingArticles.push({ type: 'subheader', value: feedName })

      for (const i in feedArticles) {
        const article = feedArticles[i]
        this.matchingArticles.push({ type: 'item', value: article })
      }
    }
  },
  methods: {
    close() {
      this.dialog = false
    }
  }
})
</script>
