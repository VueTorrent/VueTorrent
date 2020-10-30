<template>
  <v-form
      ref="form"
      v-model="searchForm.valid"
  >
    <v-container fluid>
      <v-row>
        <v-flex row class="col-12 col-sm-6 col-md-8">
          <v-text-field
              v-model="searchForm.pattern"
              prepend-inner-icon="mdi-magnify"
              @keypress.enter="$refs.searchButton.click"
              label="Search"
              :rules="[v => !!v || 'Searchterm is required']"
              clearable
              style="width: 70%"
          />
          <v-btn
              ref="searchButton"
              :disabled="!searchForm.valid"
              :color="loading ? 'warning' : 'primary'"
              @click="loading ? stopSearch() : triggerSearch()"
          >
            {{ loading ? "Stop" : "Search"}}
          </v-btn>
        </v-flex>
        <v-col class="col__plugins">
          <v-btn
              :loading="searchPlugins === undefined"
              :disabled="searchPlugins === null"
              type="button"
              class="btn"
              @click="plugginSelectorOpen = true"
          >
            Plugins
          </v-btn>
          <v-dialog
              v-if="!this.$vuetify.breakpoint.mobile"
              v-model="plugginSelectorOpen"
              max-width="20rem"
          >
            <v-card>
              <v-card-title>
                Plugin Usage
                <v-spacer />
                <v-btn
                    small
                    @click="toggleSelectAll"
                    :color="searchForm.plugins.length > 0 ? 'primary' : ''"
                >
                  All
                </v-btn>
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-checkbox
                    v-for="(plugin, key) in availablePlugins"
                    :key="key"
                    v-model="searchForm.plugins"
                    :label="plugin.fullName"
                    :value="plugin"
                />
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-bottom-sheet
              scrollable
              inset
              v-model="plugginSelectorOpen"
              v-if="this.$vuetify.breakpoint.mobile"
          >
            <v-sheet class="text-center">
              <v-card>
                <v-card-title>
                  Plugin Usage
                  <v-spacer />
                  <v-btn
                      small
                      @click="toggleSelectAll"
                      :color="searchForm.plugins.length > 0 ? 'primary' : ''"
                  >
                    All
                  </v-btn>
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <v-checkbox
                      v-for="(plugin, key) in availablePlugins"
                      :key="key"
                      v-model="searchForm.plugins"
                      :label="plugin.fullName"
                      :value="plugin"
                  />
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-bottom-sheet>
        </v-col>
        <v-col align-self="center">
          <v-autocomplete
              v-model="searchForm.category"
              :items="availableCategories"
              item-text="name"
              item-value="key"
              label="Category"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { intersection } from 'lodash'
import qbit from '@/services/qbit'
export default {
    name: 'SearchForm',
    props:['loading'],
    data() {
        return {
            searchForm: {
                valid: false,
                category: 'all',
                pattern: '',
                plugins: []
            },
            searchPlugins: [],
            availablePlugins: [],
            plugginSelectorOpen: false
        }
    },
    computed :{
        availableCategories() {
            if (this.hasSelectAllPlugins) {
                return ['all']
            }

            const result = ['all', { divider: true }]

            const categories = intersection(
                ...this.searchForm.plugins.map(p => p.supportedCategories)
            ).map(c => ({ key: c, name: c }))
            result.push(...categories)

            return result
        }
    },
    methods: {
        hasSelectAllPlugins() {
            return this.searchForm.plugins.length === this.availablePlugins.length
        },
        toggleSelectAll() {
            this.searchForm.plugins = this.hasSelectAllPlugins ? [] : this.availablePlugins
        },
        triggerSearch() {
            if (!this.searchForm.valid) {
                return
            }

            const plugins = this.hasSelectAllPlugins
                ? 'all'
                : this.searchForm.plugins.map(p => p.name).join('|')

            const searchForm = Object.assign({}, this.searchForm, {
                plugins
            })

            return searchForm
        },
        stopSearch() {
            //
        },
        async fetchSearchPlugins() {
            this.searchPlugins = await qbit.getSearchPlugins()
            this.availablePlugins = this.searchPlugins.filter(x => x.enabled)
            this.searchForm.plugins = this.availablePlugins
            this.toggleSelectAll()
        }
    },
    created() {
        this.fetchSearchPlugins()
    }
}
</script>