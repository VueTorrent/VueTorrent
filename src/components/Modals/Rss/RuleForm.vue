<template>
  <v-dialog v-model="dialog" max-width="350px">
    <v-card flat>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>
            {{ hasInitialRule ? $t("edit") : $t("createNew") }} {{ $t("rule") }}
          </h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text class="pa-2">
        <v-form ref="ruleForm">
          <v-container>
            <v-text-field
              v-model="rule.name"
              :label="$t('modals.newRule.name')"
              required
            />
          </v-container>
          <v-container>
            <v-text-field
              v-model="rule.def.mustContain"
              :label="$t('modals.newRule.def.mustContain')"
              required
            />
          </v-container>
          <v-container>
            <v-subheader class="pa-0">
              {{ $t("modals.newRule.def.affectedFeeds") }}
            </v-subheader>
            <template v-for="(item, index) in availableFeeds">
              <v-checkbox
                :key="index"
                v-model="rule.def.affectedFeeds"
                hide-details
                :label="item.name"
                :value="item.url"
              />
            </template>
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
          {{ $t("create") }}
        </v-btn>
        <v-btn v-else class="accent white--text elevation-0 px-4" @click="edit">
          {{ $t("edit") }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="cancel">
          {{ $t("cancel") }}
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
    mdiCancel,
    mdiTagPlus,
    mdiPencil
  }),
  computed: {
    ...mapGetters(['getSelectedRule', 'getFeeds']),
    availableFeeds() {
      return this.getFeeds()
    },
    hasInitialRule() {
      return !!(this.initialRule && this.initialRule.name)
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
