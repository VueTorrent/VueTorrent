<script setup lang="ts">
import ServerPathField from '@/components/Core/ServerPathField.vue'
import { useDialog, useI18nUtils } from '@/composables'
import { TorrentFormat } from '@/constants/qbit'
import { formatData } from '@/helpers'
import { useAppStore, useTorrentCreatorStore } from '@/stores'
import { TorrentCreatorParams } from '@/types/qbit/models'
import { computed, reactive, ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const appStore = useAppStore()
const torrentCreatorStore = useTorrentCreatorStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive<Required<TorrentCreatorParams>>({
  sourcePath: '',
  format: TorrentFormat.HYBRID,
  pieceSize: 0,
  optimizeAlignment: false,
  paddedFileSizeLimit: 0,
  private: false,
  startSeeding: false,
  torrentFilePath: '',
  trackers: '',
  urlSeeds: '',
  source: '',
  comment: ''
})

const formatOptions = [
  { title: t('constants.torrentFormat.v1'), value: TorrentFormat.V1 },
  { title: t('constants.torrentFormat.v2'), value: TorrentFormat.V2 },
  { title: t('constants.torrentFormat.hybrid'), value: TorrentFormat.HYBRID }
]

const pieceSizeOptions = computed(() => {
  const sizes = [{ title: t('common.auto'), value: 0 }]

  for (let i = 16 * 1024; i < 500_000_000; i *= 2) {
    sizes.push({ title: formatData(i, true, 0), value: i })
  }

  return sizes
})

const paddedLimitRules = [(v: number) => !v || v < -1 || t('dialogs.torrentCreator.paddedFileSizeLimitRule')]

async function submit() {
  if (!isFormValid.value) return

  await torrentCreatorStore.createTask(formData)

  close()
}

const close = () => {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="1250">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.torrentCreator.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-row>
            <v-col cols="12">
              <ServerPathField
                v-model="formData.sourcePath"
                :title="t('dialogs.torrentCreator.sourcePath')"
                :rules="[(v: string) => !!v || t('dialogs.torrentCreator.rules.sourcePathRequired')]" />
            </v-col>
            <v-col cols="12">
              <ServerPathField
                v-model="formData.torrentFilePath"
                :title="t('dialogs.torrentCreator.torrentFilePath')"
                :rules="[(v: string) => !v || v.endsWith('.torrent') || t('dialogs.torrentCreator.rules.outputFileExtension')]" />
            </v-col>

            <v-divider />

            <v-col v-if="appStore.usesLibtorrent2" cols="12" sm="6" class="pb-0">
              <v-select v-model="formData.format" hide-details :items="formatOptions" :label="t('dialogs.torrentCreator.format')" />
            </v-col>
            <v-col cols="12" :sm="appStore.usesLibtorrent2 ? 6 : undefined" class="pb-0">
              <v-select v-model="formData.pieceSize" hide-details :items="pieceSizeOptions" :label="t('dialogs.torrentCreator.pieceSize')" />
            </v-col>

            <template v-if="appStore.usesLibtorrent1">
              <v-col cols="12" sm="6" class="py-0">
                <v-checkbox v-model="formData.optimizeAlignment" hide-details :label="t('dialogs.torrentCreator.optimizeAlignment')" />
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model.number="formData.paddedFileSizeLimit"
                  min="-1"
                  :rules="paddedLimitRules"
                  :label="t('dialogs.torrentCreator.paddedFileSizeLimit')"
                  :hint="t('dialogs.torrentCreator.paddedFileSizeLimitHint')"
                  suffix="kiB" />
              </v-col>
            </template>
            <v-col cols="12" sm="6" class="py-0">
              <v-checkbox v-model="formData.private" hide-details :label="t('dialogs.torrentCreator.private')" />
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-checkbox v-model="formData.startSeeding" hide-details :label="t('dialogs.torrentCreator.startSeeding')" />
            </v-col>

            <v-divider />

            <v-col cols="12">
              <v-textarea v-model="formData.trackers" :label="t('dialogs.torrentCreator.trackers')" :hint="t('dialogs.torrentCreator.trackersHint')" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.urlSeeds" hide-details :label="t('dialogs.torrentCreator.urlSeeds')" />
            </v-col>
            <v-col v-if="appStore.isFeatureAvailable('5.0.3')" cols="12">
              <v-textarea v-model="formData.source" hide-details :label="t('dialogs.torrentCreator.source')" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.comment" hide-details :label="t('dialogs.torrentCreator.comment')" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValid" color="accent" @click="submit">{{ t('dialogs.torrentCreator.actions.submit') }}</v-btn>
        <v-btn color="error" @click="close">{{ t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
