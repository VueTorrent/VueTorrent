<template>
  <div class="px-1 px-sm-5 background noselect">
    <v-row no-gutters class="grey--text" align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ $t('search.title') }}
        </h1>
      </v-col>
      <v-col class="align-center justify-center">
        <v-card-actions class="justify-end">
          <v-btn small elevation="0" color="primary" @click="openPluginManager">
            <v-icon>{{ mdiToyBrick }}</v-icon>
          </v-btn>
          <v-btn small elevation="0" @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-container class="d-flex align-center justify-center ma-0 pa-0 primary" fluid>
        <v-tabs v-model="tab" align-with-title show-arrows background-color="primary" slider-color="white" class="overflow-auto">
          <v-tab v-for="t in tabs" :href="`#${t.value}`" class="white--text">
            <h4>{{ $t('search.tabHeaderTemplate').replace('$0', t.id) }}</h4>
          </v-tab>
        </v-tabs>
        <v-spacer />
        <v-btn icon @click="createNewTab" class="mr-1">
          <v-icon color="accent">{{ mdiPlusCircleOutline }}</v-icon>
        </v-btn>
        <v-btn icon @click="deleteTab" :disabled="tabs.length === 0" class="mx-1">
          <v-icon color="error">{{ mdiMinusCircleOutline }}</v-icon>
        </v-btn>
      </v-container>

      <v-tabs-items v-model="tab" touchless class="full-width">
        <v-tab-item v-for="t in tabs" :key="t.id" eager :value="t.value">
          <SearchTab />
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { mdiClose, mdiToyBrick, mdiPlusCircleOutline, mdiMinusCircleOutline } from '@mdi/js'
import { FullScreenModal, General } from '@/mixins'
import SearchTab from '@/components/SearchEngine/SearchTab.vue'

export default defineComponent({
  name: 'SearchEngine',
  components: { SearchTab },
  mixins: [General, FullScreenModal],
  data() {
    return {
      tabs: [] as { id: number; value: string }[],
      tabCount: 0,
      mdiClose,
      mdiToyBrick,
      mdiPlusCircleOutline,
      mdiMinusCircleOutline
    }
  },
  async mounted() {
    await this.$store.dispatch('FETCH_SEARCH_PLUGINS')
    document.addEventListener('keydown', this.handleKeyboardShortcut)
    this.createNewTab()
  },
  async beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardShortcut)
  },
  computed: {
    ...mapGetters(['getModals'])
  },
  methods: {
    openPluginManager() {
      this.createModal('SearchPluginManager')
    },
    createNewTab() {
      this.tabs.push({
        id: this.tabCount++,
        value: `tab-${this.tabCount}`
      })
    },
    deleteTab() {
      this.tabs.find((tab, index) => {
        if (tab.value === this.tab) {
          this.tabs.splice(index, 1)
          return true
        }
        return false
      })
    },
    close() {
      this.$router.back()
    },
    handleKeyboardShortcut(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.getModals().length === 0) {
        this.close()
      }
    }
  }
})
</script>

<style scoped lang="scss">
.full-width {
  width: 100%;
}
</style>
