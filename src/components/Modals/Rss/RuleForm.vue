<template>
  <v-dialog v-model="dialog" max-width="1000px" @keydown.enter.prevent="setRule">
    <v-card flat :loading="loading">
      <v-container class="pa-0 project done">
        <v-card-title class="justify-center">
          <v-toolbar flat dense class="transparent">
            <v-toolbar-title class="mx-auto">
              <h2>{{ this.lastSavedName !== '' ? $t('modals.newRule.titleEdit') : $t('modals.newRule.titleCreate') }}</h2>
            </v-toolbar-title>
            <v-btn fab small class="transparent elevation-0" @click="close">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-row>
            <v-col cols="12" sm="6">
              <v-form ref="form">
                <v-container>
                  <v-text-field v-model="rule.name" :label="$t('modals.newRule.name')" autofocus required />

                  <v-divider />

                  <v-checkbox hide-details v-model="rule.useRegex" :label="$t('modals.newRule.def.useRegex')" />
                  <v-text-field hide-details v-model="rule.mustContain" :label="$t('modals.newRule.def.mustContain')" />
                  <v-text-field hide-details v-model="rule.mustNotContain" :label="$t('modals.newRule.def.mustNotContain')" />
                  <v-checkbox hide-details v-model="rule.smartFilter" :label="$t('modals.newRule.def.smartFilter')" />
                  <v-text-field v-model="rule.episodeFilter" :label="$t('modals.newRule.def.episodeFilter')" />

                  <v-divider />

                  <v-row>
                    <p class="subtitle-1 mb-1">{{ $t('modals.newRule.def.assignedCategory') }}</p>
                    <v-select flat solo dense hide-details background-color="background" class="rounded-xl" v-model="rule.assignedCategory" :items="availableCategories" />
                  </v-row>
                  <v-text-field hide-details v-model="rule.savePath" :label="$t('modals.newRule.def.savePath')" />
                  <v-text-field hide-details v-model="rule.ignoreDays" :label="$t('modals.newRule.def.ignoreDays')" required type="number" min="0" />
                  <v-text-field disabled :value="lastMatch" :label="$t('modals.newRule.def.lastMatch.title')" />

                  <v-divider />

                  <v-row class="my-2 flex-gap">
                    <v-col>
                      <div class="d-flex flex-column align-center">
                        <p class="subtitle-1 mb-1">{{ $t('modals.newRule.def.addPaused.title') }}</p>
                        <v-select v-model="rule.addPaused" flat solo dense hide-details background-color="background" class="rounded-xl" :items="addPausedOptions" />
                      </div>
                    </v-col>
                    <v-col>
                      <div class="d-flex flex-column align-center">
                        <p class="subtitle-1 mb-1">{{ $t('enums.contentLayout.title') }}</p>
                        <v-select v-model="rule.torrentContentLayout" flat solo dense hide-details background-color="background" class="rounded-xl" :items="contentLayoutOptions" />
                      </div>
                    </v-col>
                  </v-row>

                  <v-subheader class="pa-0">
                    {{ $t('modals.newRule.def.affectedFeeds') }}
                  </v-subheader>

                  <v-row>
                    <v-col cols="6" class="d-flex align-center justify-center">
                      <v-btn color="accent" @click="selectAll">{{ $t('selectAll') }}</v-btn>
                    </v-col>
                    <v-col cols="6" class="d-flex align-center justify-center">
                      <v-btn color="primary" @click="selectNone">{{ $t('selectNone') }}</v-btn>
                    </v-col>
                  </v-row>

                  <v-checkbox v-for="(item, index) in availableFeeds" :key="index" v-model="rule.affectedFeeds" hide-details :label="item.name" :value="item.url" />
                </v-container>
              </v-form>
            </v-col>
            <v-col v-if="$vuetify.breakpoint.smAndUp" cols="6">
              <h2>{{ $t('modals.matchingArticles.title') }}</h2>
              <v-list subheader>
                <template v-for="item in matchingArticles">
                  <v-divider :key="item.value" v-if="item.type === 'divider'" />
                  <v-subheader inset v-else-if="item.type === 'subheader'">{{ item.value }}</v-subheader>
                  <v-list-item v-else class="mb-3">{{ item.value }}</v-list-item>
                </template>
              </v-list>
            </v-col>
          </v-row>
          <v-btn fab color="accent" fixed right bottom @click="setRule">
            <v-icon>{{ mdiContentSave }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-end">
          <v-btn class="accent white--text elevation-0 px-4" @click="setRule">
            {{ $t('save') }}
          </v-btn>
          <v-btn color="primary" class="white--text elevation-0 px-4" @click="close">
            {{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapGetters} from 'vuex'
import qbit from '@/services/qbit'
import {Modal} from '@/mixins'
import {mdiClose, mdiContentSave} from '@mdi/js'
import i18n from '@/plugins/i18n'
import {AppPreferences} from '@/enums/qbit'
import {Category, Feed} from '@/types/vuetorrent'

type FormattedArticle = { type: string; value?: string }

export default defineComponent({
  name: 'RuleForm',
  mixins: [Modal],
  props: ['initialRule'],
  data: () => ({
    rule: {
      addPaused: null,
      affectedFeeds: [],
      assignedCategory: '',
      enabled: true,
      episodeFilter: '',
      ignoreDays: 0,
      lastMatch: '',
      mustContain: '',
      mustNotContain: '',
      name: '',
      savePath: '',
      smartFilter: false,
      torrentContentLayout: null,
      useRegex: false
    },
    addPausedOptions: [
      { text: i18n.t('useGlobalSettings'), value: null },
      { text: i18n.t('modals.newRule.def.addPaused.always'), value: true },
      { text: i18n.t('modals.newRule.def.addPaused.never'), value: false }
    ],
    contentLayoutOptions: [
      { text: i18n.t('useGlobalSettings'), value: null },
      { text: i18n.t('enums.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
      { text: i18n.t('enums.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
      { text: i18n.t('enums.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER }
    ],
    loading: false,
    matchingArticles: [] as FormattedArticle[],
    lastSavedName: '',
    mdiClose,
    mdiContentSave
  }),
  computed: {
    ...mapGetters(['getFeeds', 'getCategories']),
    lastMatch() {
      if (this.rule.lastMatch === '') return i18n.t('modals.newRule.def.lastMatch.unknownValue').toString()

      const delta = new Date().getTime() - new Date(this.rule.lastMatch).getTime()
      return i18n
        .t('modals.newRule.def.lastMatch.knownValue')
        .toString()
        .replace('%1', Math.floor(delta / (1000 * 60 * 60 * 24)).toString())
    },
    availableFeeds() {
      // @ts-expect-error: TS2349: This expression is not callable. Type 'never' has no call signatures.
      return this.getFeeds()
    },
    availableCategories() {
      // @ts-expect-error: TS2349: This expression is not callable. Type 'never' has no call signatures.
      return this.getCategories().map((c: Category) => c.name)
    },
    hasInitialRule() {
      return !!(this.initialRule && this.initialRule.name)
    }
  },
  created() {
    this.$store.commit('FETCH_RULES')
    if (this.hasInitialRule) {
      this.rule = { ...this.initialRule }
      this.lastSavedName = this.initialRule.name
    }
  },
  mounted() {
    this.updateArticles()
  },
  methods: {
    async setRule() {
      if ((this.hasInitialRule || this.lastSavedName !== '') && this.lastSavedName !== this.rule.name) {
        await qbit.renameRule(this.lastSavedName, this.rule.name)
      }
      await qbit.setRule(this.rule)
      this.lastSavedName = this.rule.name
      this.$store.commit('FETCH_RULES')
      await this.updateArticles()
    },
    async updateArticles() {
      if (this.lastSavedName === '') return

      this.loading = true

      const formattedArticles = []
      const articles = await qbit.getMatchingArticles(this.lastSavedName)
      for (const feedName in articles) {
        const feedArticles = articles[feedName]
        if (formattedArticles.length > 0) formattedArticles.push({ type: 'divider' })

        formattedArticles.push({ type: 'subheader', value: feedName })

        for (const i in feedArticles) {
          const article = feedArticles[i]
          formattedArticles.push({ type: 'item', value: article })
        }
      }

      this.matchingArticles = formattedArticles
      this.loading = false
    },
    selectNone() {
      this.rule.affectedFeeds = []
    },
    selectAll() {
      this.rule.affectedFeeds = this.availableFeeds.map((feed: Feed) => feed.url)
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
