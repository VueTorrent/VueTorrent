<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18nUtils } from '@/composables'
import { SchedulerDays } from '@/constants/qbit/AppPreferences'
import { usePreferenceStore } from '@/stores'

const { t } = useI18nUtils()
const preferenceStore = usePreferenceStore()

const schedulerOptions = ref([
  { title: t('constants.scheduler.everyDay'), value: SchedulerDays.EVERY_DAY },
  { title: t('constants.scheduler.everyWeekday'), value: SchedulerDays.EVERY_WEEKDAY },
  { title: t('constants.scheduler.everyWeekend'), value: SchedulerDays.EVERY_WEEKEND },
  { title: t('constants.scheduler.everyMonday'), value: SchedulerDays.EVERY_MONDAY },
  { title: t('constants.scheduler.everyTuesday'), value: SchedulerDays.EVERY_TUESDAY },
  { title: t('constants.scheduler.everyWednesday'), value: SchedulerDays.EVERY_WEDNESDAY },
  { title: t('constants.scheduler.everyThursday'), value: SchedulerDays.EVERY_THURSDAY },
  { title: t('constants.scheduler.everyFriday'), value: SchedulerDays.EVERY_FRIDAY },
  { title: t('constants.scheduler.everySaturday'), value: SchedulerDays.EVERY_SATURDAY },
  { title: t('constants.scheduler.everySunday'), value: SchedulerDays.EVERY_SUNDAY },
])

const upLimit = computed({
  get: () => preferenceStore.preferences!.up_limit / 1024,
  set: (value: number) => (preferenceStore.preferences!.up_limit = value * 1024),
})
const dlLimit = computed({
  get: () => preferenceStore.preferences!.dl_limit / 1024,
  set: (value: number) => (preferenceStore.preferences!.dl_limit = value * 1024),
})

const altUpLimit = computed({
  get: () => preferenceStore.preferences!.alt_up_limit / 1024,
  set: (value: number) => (preferenceStore.preferences!.alt_up_limit = value * 1024),
})
const altDlLimit = computed({
  get: () => preferenceStore.preferences!.alt_dl_limit / 1024,
  set: (value: number) => (preferenceStore.preferences!.alt_dl_limit = value * 1024),
})
</script>

<template>
  <v-list>
    <v-list-item>
      <v-row :class="$vuetify.display.mobile ? 'flex-column' : 'flex-row'">
        <v-col cols="12" sm="6" class="pa-0">
          <v-list-subheader>{{ t('settings.speed.subheader.global') }}</v-list-subheader>

          <v-row class="mx-1">
            <v-col cols="12" md="6">
              <v-text-field v-model="upLimit" hide-details suffix="kB/s" :label="t('settings.speed.upload')" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dlLimit" hide-details suffix="kB/s" :label="t('settings.speed.download')" />
            </v-col>
          </v-row>

          <v-list-item>
            <h5 class="font-italic">
              {{ t('settings.speed.tip') }}
            </h5>
          </v-list-item>
        </v-col>

        <v-divider :vertical="!$vuetify.display.mobile" />

        <v-col cols="12" sm="6" class="pa-0">
          <v-list-subheader>{{ t('settings.speed.subheader.alternative') }}</v-list-subheader>

          <v-row class="mx-1">
            <v-col cols="12" md="6">
              <v-text-field v-model="altUpLimit" hide-details suffix="kB/s" :label="t('settings.speed.upload')" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="altDlLimit" hide-details suffix="kB/s" :label="t('settings.speed.download')" />
            </v-col>
          </v-row>

          <v-list-item>
            <h5 class="font-italic">
              {{ t('settings.speed.tip') }}
            </h5>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-2" />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.scheduler_enabled" hide-details :label="t('settings.speed.scheduler.subheader')" />
    </v-list-item>

    <v-list-item>
      <v-row class="align-center">
        <v-col cols="4" md="2">
          <v-list-subheader>{{ t('settings.speed.scheduler.from') }}</v-list-subheader>
        </v-col>
        <v-col cols="4" md="2">
          <v-text-field v-model.number="preferenceStore.preferences!.schedule_from_hour" :disabled="!preferenceStore.preferences!.scheduler_enabled" type="number" />
        </v-col>
        <v-col cols="4" md="2">
          <v-text-field v-model.number="preferenceStore.preferences!.schedule_from_min" :disabled="!preferenceStore.preferences!.scheduler_enabled" type="number" />
        </v-col>

        <v-spacer />

        <v-col cols="4" md="2">
          <v-list-subheader>{{ t('settings.speed.scheduler.to') }}</v-list-subheader>
        </v-col>
        <v-col cols="4" md="2">
          <v-text-field v-model.number="preferenceStore.preferences!.schedule_to_hour" :disabled="!preferenceStore.preferences!.scheduler_enabled" type="number" />
        </v-col>
        <v-col cols="4" md="2">
          <v-text-field v-model.number="preferenceStore.preferences!.schedule_to_min" :disabled="!preferenceStore.preferences!.scheduler_enabled" type="number" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-select
        v-model="preferenceStore.preferences!.scheduler_days"
        :disabled="!preferenceStore.preferences!.scheduler_enabled"
        hide-details
        :items="schedulerOptions"
        :label="t('settings.speed.scheduler.when')" />
    </v-list-item>

    <v-divider class="mt-3" />

    <v-list-subheader>{{ t('settings.speed.subheader.settings') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.limit_utp_rate" hide-details :label="t('settings.speed.settings.applyToUtp')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.limit_tcp_overhead" hide-details :label="t('settings.speed.settings.applyToTransportOverhead')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.limit_lan_peers" hide-details :label="t('settings.speed.settings.applyToPeersOnLan')" />
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
