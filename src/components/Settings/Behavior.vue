<script setup lang="ts">
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { FileLogAgeType } from '@/constants/qbit/AppPreferences'
import { usePreferenceStore } from '@/stores'

const { t } = useI18nUtils()
const preferenceStore = usePreferenceStore()

const fileLogAgeTypeOptions = computed(() => [
  { title: t('constants.file_log_age_type.days', preferenceStore.preferences!.file_log_age), value: FileLogAgeType.DAYS },
  { title: t('constants.file_log_age_type.months', preferenceStore.preferences!.file_log_age), value: FileLogAgeType.MONTHS },
  { title: t('constants.file_log_age_type.years', preferenceStore.preferences!.file_log_age), value: FileLogAgeType.YEARS }
])
</script>

<template>
  <v-list>
    <v-list-subheader>{{ $t('settings.behavior.logs.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="preferenceStore.preferences!.file_log_enabled" hide-details :label="$t('settings.behavior.logs.file_log_enabled')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="preferenceStore.preferences!.file_log_path"
            :disabled="!preferenceStore.preferences!.file_log_enabled"
            hide-details
            :label="$t('settings.behavior.logs.file_log_path')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mx-10 my-3" />

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox
            v-model="preferenceStore.preferences!.file_log_backup_enabled"
            :disabled="!preferenceStore.preferences!.file_log_enabled"
            hide-details
            :label="$t('settings.behavior.logs.file_log_backup_enabled')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model.number="preferenceStore.preferences!.file_log_max_size"
            :disabled="!preferenceStore.preferences!.file_log_enabled || !preferenceStore.preferences!.file_log_backup_enabled"
            type="number"
            hide-details
            :label="$t('settings.behavior.logs.file_log_max_size')"
            suffix="kiB" />
        </v-col>

        <v-col cols="6">
          <v-checkbox
            v-model="preferenceStore.preferences!.file_log_delete_old"
            :disabled="!preferenceStore.preferences!.file_log_enabled"
            hide-details
            :label="$t('settings.behavior.logs.file_log_delete_old')" />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model.number="preferenceStore.preferences!.file_log_age"
            :disabled="!preferenceStore.preferences!.file_log_enabled || !preferenceStore.preferences!.file_log_delete_old"
            hide-details
            type="number"
            :label="$t('settings.behavior.logs.file_log_age')" />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="preferenceStore.preferences!.file_log_age_type"
            :disabled="!preferenceStore.preferences!.file_log_enabled || !preferenceStore.preferences!.file_log_delete_old"
            :items="fileLogAgeTypeOptions"
            hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-3" />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.performance_warning" hide-details :label="$t('settings.behavior.performance_warning')" />
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
