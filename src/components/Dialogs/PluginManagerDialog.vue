<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'
import MixedButton from '@/components/Core/MixedButton.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { useSearchEngineStore } from '@/stores'
import { SearchPlugin } from '@/types/qbit/models'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const searchEngineStore = useSearchEngineStore()

const headers = [
  { title: t('dialogs.pluginManager.headers.enabled'), key: 'enabled', sortable: false },
  { title: t('dialogs.pluginManager.headers.name'), key: 'fullName' },
  { title: t('dialogs.pluginManager.headers.version'), key: 'version' },
  { title: t('dialogs.pluginManager.headers.url'), key: 'url' },
  { title: t('dialogs.pluginManager.headers.actions'), key: 'actions' }
]

const loading = ref(false)
const updateLoading = ref(false)

const installisOpened = ref(false)
const isInstallFormValid = ref(false)
const installInput = ref('')

async function onTogglePlugin(plugin: SearchPlugin) {
  await searchEngineStore.toggleSearchPlugin(plugin)
  await searchEngineStore.fetchSearchPlugins()
}

async function updatePlugins() {
  updateLoading.value = true
  await searchEngineStore.updatePlugins().then(() => new Promise(resolve => setTimeout(resolve, 2000)))
  await searchEngineStore.fetchSearchPlugins()
  updateLoading.value = false
}

async function installNewPlugin() {
  closeInstallDialog()
  loading.value = true

  await searchEngineStore.installSearchPlugin(installInput.value)
  installInput.value = ''

  setTimeout(() => void searchEngineStore.fetchSearchPlugins().then(() => (loading.value = false)), 1000)
}

async function uninstallPlugin(plugin: SearchPlugin) {
  loading.value = true

  await searchEngineStore.uninstallSearchPlugin(plugin.name)
  await searchEngineStore.fetchSearchPlugins()

  loading.value = false
}

function close() {
  isOpened.value = false
}

function closeInstallDialog() {
  installisOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title class="d-flex">
        <div>
          {{ $t(`dialogs.pluginManager.title`) }}
        </div>

        <v-spacer />

        <MixedButton icon="mdi-update" :text="$t('dialogs.pluginManager.update')" color="accent" class="mr-2" :loading="updateLoading" @click="updatePlugins" />
        <v-dialog v-model="installisOpened">
          <template #activator="{ props: dialogProps }">
            <MixedButton icon="mdi-toy-brick-plus" :text="$t('dialogs.pluginManager.install.activator')" v-bind="dialogProps" color="primary" />
          </template>

          <v-card :title="$t('dialogs.pluginManager.install.title')">
            <v-card-text>
              <v-form v-model="isInstallFormValid" @submit.prevent>
                <v-text-field v-model="installInput" autofocus :label="$t('dialogs.pluginManager.install.label')" />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" @click="closeInstallDialog">
                {{ $t('common.cancel') }}
              </v-btn>
              <v-btn color="accent" @click="installNewPlugin">
                {{ $t('common.ok') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :mobile="null"
          :headers="headers"
          items-per-page="-1"
          :items="searchEngineStore.searchPlugins"
          :sort-by="[{ key: 'fullName', order: 'asc' }]"
          :loading="loading">
          <template #[`item.enabled`]="{ item }">
            <v-checkbox-btn :model-value="item.enabled" @click="onTogglePlugin(item)" />
          </template>
          <template #[`item.url`]="{ item }">
            <a :href="item.url" :title="item.name">{{ item.url }}</a>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-icon color="red" icon="mdi-delete" @click="uninstallPlugin(item)" />
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="accent" @click="close">
          {{ $t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
