<script setup lang="ts">

import { SchedulerDays } from '@/constants/qbit/AppPreferences.ts'
import { usePreferenceStore } from '@/stores'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'


const display = useDisplay()
const { t } = useI18n()
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
</script>

<template>
  <v-list>
    <v-row class="mb-0" :class="display.xs ? 'flex-column' : 'flex-row'">
      <v-col cols="12" sm="6">
        <v-list-subheader>{{ t('settings.speed.subheader.global') }}</v-list-subheader>

        <v-row class="mx-1">
          <v-col cols="12" md="6">
            <v-text-field v-model="preferenceStore.preferences!.up_limit"
                          hide-details
                          suffix="kiB/s"
                          :label="t('settings.speed.upload')" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="preferenceStore.preferences!.dl_limit"
                          hide-details
                          suffix="kiB/s"
                          :label="t('settings.speed.download')" />
          </v-col>
        </v-row>

        <v-list-item>
          <h5>
            <i>{{ t('settings.speed.tip') }}</i>
          </h5>
        </v-list-item>
      </v-col>

      <v-divider :vertical="!display.xs" />

      <v-col cols="12" sm="6">
        <v-list-subheader>{{ t('settings.speed.subheader.alternative') }}</v-list-subheader>

        <v-row class="mx-1">
          <v-col cols="12" md="6">
            <v-text-field v-model="preferenceStore.preferences!.alt_up_limit"
                          hide-details
                          suffix="kiB/s"
                          :label="t('settings.speed.upload')" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="preferenceStore.preferences!.alt_dl_limit"
                          hide-details
                          suffix="kiB/s"
                          :label="t('settings.speed.download')" />
          </v-col>
        </v-row>

        <v-list-item>
          <h5><i>{{ t('settings.speed.tip') }}</i></h5>
        </v-list-item>
      </v-col>
    </v-row>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.scheduler_enabled"
                  hide-details
                  :label="t('settings.speed.scheduler.subheader')" />
    </v-list-item>

    <v-row class="align-center">
      <v-col>
        <v-list-subheader>{{ t('settings.speed.scheduler.from') }}</v-list-subheader>
      </v-col>
      <v-col>
        <v-text-field v-model="preferenceStore.preferences!.schedule_from_hour"
                      type="number" />
      </v-col>
      <v-col>
        <v-text-field v-model="preferenceStore.preferences!.schedule_from_min"
                      type="number" />
      </v-col>

      <v-spacer />

      <v-col>
        <v-list-subheader>{{ t('settings.speed.scheduler.to') }}</v-list-subheader>
      </v-col>
      <v-col>
        <v-text-field v-model="preferenceStore.preferences!.schedule_to_hour"
                      type="number" />
      </v-col>
      <v-col>
        <v-text-field v-model="preferenceStore.preferences!.schedule_to_min"
                      type="number" />
      </v-col>
    </v-row>

    <v-list-item>
      <v-select v-model="preferenceStore.preferences!.scheduler_days"
                :disabled="!preferenceStore.preferences!.scheduler_enabled"
                hide-details
                :items="schedulerOptions"
                :label="t('settings.speed.scheduler.when')" />
    </v-list-item>

    <v-divider />

    <v-list-subheader>{{ t('settings.speed.subheader.settings') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.limit_utp_rate"
                  hide-details
                  :label="t('settings.speed.settings.applyToUtp')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.limit_tcp_overhead"
                  hide-details
                  :label="t('settings.speed.settings.applyToTransportOverhead')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.limit_lan_peers"
                  hide-details
                  :label="t('settings.speed.settings.applyToPeersOnLan')" />
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">

</style>