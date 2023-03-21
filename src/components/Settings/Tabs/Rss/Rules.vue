<template>
  <v-card flat>
    <v-row dense class="ma-0 pa-0">
      <v-col cols="12" md="6">
        <v-subheader>{{ $t('modals.settings.pageRss.pageRules.rules') }}</v-subheader>
        <template v-for="(item, index) in availableRules">
          <v-list-item :key="item.uid">
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
            <v-list-item-action class="icon">
              <v-icon @click="previewMatchingArticles(item.name)">
                {{ mdiEye }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-action class="icon">
              <v-icon @click="editRule(item)">
                {{ mdiPencil }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-action>
              <v-icon color="red" @click="deleteRule(item)">
                {{ mdiDelete }}
              </v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < availableRules.length - 1" :key="index" />
        </template>
        <v-list-item>
          <v-btn class="mx-auto accent white--text elevation-0 px-4" @click="createRule">
            {{ $t('modals.settings.pageRss.pageRules.btnCreateNew') }}
          </v-btn>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { mdiEye, mdiPencil, mdiDelete } from '@mdi/js'

import { Tab, General, FullScreenModal } from '@/mixins'

export default {
  name: 'Rules',
  mixins: [Tab, General, FullScreenModal],
  data: () => ({
    mdiEye,
    mdiPencil,
    mdiDelete
  }),
  computed: {
    ...mapGetters(['getRules']),
    availableRules() {
      return this.getRules()
    }
  },
  created() {
    this.$store.commit('FETCH_RULES')
  },
  methods: {
    activeMethod() {
      this.$store.commit('FETCH_RULES')
    },
    deleteRule(item) {
      qbit.deleteRule(item.name)
      this.$store.commit('FETCH_RULES')
    },
    createRule() {
      this.createModal('RuleForm')
    },
    editRule(item) {
      this.createModal('RuleForm', {initialRule: item})
    },
    previewMatchingArticles(ruleName) {
      this.createModal('MatchingArticles', {ruleName})
    }
  }
}
</script>

<style scoped>
.icon {
  margin-left: 16px;
}
</style>
