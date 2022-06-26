<template>
  <v-dialog v-model="dialog" content-class="rounded-form" max-width="300px">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ hasInitialRule ? $t('edit') : $t('createNew') }} {{ $t('rule') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-form ref="ruleForm" class="px-6 mt-3">
          <v-container>
            <v-text-field
              v-model="rule.name"
              :label="$t('modals.newRule.name')"
              required
            />
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          v-if="!hasInitialRule"
          class="accent white--text elevation-0 px-4"
          @click="create"
        >
          {{ $t('create') }}
        </v-btn>
        <v-btn
          v-else
          class="accent white--text elevation-0 px-4"
          @click="edit"
        >
          {{ $t('edit') }}
        </v-btn>
        <v-btn
          class="error white--text elevation-0 px-4"
          @click="cancel"
        >
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
import { Modal } from '@/mixins'
import { mdiCancel, mdiTagPlus, mdiPencil } from '@mdi/js'
import Vue from 'vue'

export default {
  name: 'RuleForm',
  mixins: [Modal],
  props: {
    initialRule: Object
  },
  data: () => ({
    rule: { 
      name: '', 
      def: { 
        mustContain: '',
        affectedFeeds: [],
        enabled: true
      }
    },
    mdiCancel, mdiTagPlus, mdiPencil
  }),
  computed: {
    ...mapGetters(['getSelectedRule']),
    hasInitialRule() {
      return !!(this.initialRule &&
          this.initialRule.name)
    }
  },
  created() {
    this.$store.commit('FETCH_RULES')
    if (this.hasInitialRule) {
      this.rule = this.initialRule
    }
  },
  methods: {
    create() {
      qbit.createRule(this.rule.name, this.rule.def)
      this.cancel()
    },
    cancel() {
      this.$store.commit('FETCH_RULES')
      this.dialog = false
    },
    edit() {
      qbit.editRule(this.rule)
      Vue.$toast.success(this.$t('toast.ruleSaved'))
      this.cancel()
    }
  }
}
</script>

<style></style>
