<template>
  <v-card flat>
    <v-row class="mb-0" :class="phoneLayout ? 'flex-column' : 'flex-row'">
      <v-col cols="12" sm="6">
        <v-subheader>{{ $t('modals.settings.speed.subheader.global') }}</v-subheader>

        <v-row class="mx-1">
          <v-col cols="12" md="6">
            <v-text-field v-model="settings.up_limit" dense hide-details class="mb-5" :label="$t('modals.settings.speed.upload')" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="settings.dl_limit" dense hide-details class="mb-5" :label="$t('modals.settings.speed.download')" />
          </v-col>
        </v-row>

        <v-list-item>
          <h5>
            <i>{{ $t('modals.settings.speed.tip') }}</i>
          </h5>
        </v-list-item>
      </v-col>

      <v-divider :vertical="!phoneLayout" />

      <v-col cols="12" sm="6">
        <v-subheader>{{ $t('modals.settings.speed.subheader.alternative') }}</v-subheader>

        <v-row class="mx-1">
          <v-col cols="12" md="6">
            <v-text-field v-model="settings.alt_up_limit" dense hide-details class="mb-5" :label="$t('modals.settings.speed.upload')" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="settings.alt_dl_limit" dense hide-details class="mb-5" :label="$t('modals.settings.speed.download')" />
          </v-col>
        </v-row>

        <v-list-item>
          <h5>
            <i>{{ $t('modals.settings.speed.tip') }}</i>
          </h5>
        </v-list-item>
      </v-col>
    </v-row>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.scheduler_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.speed.scheduler.subheader')" />
    </v-list-item>

    <v-row class="align-center">
      <v-col cols="1">
        <v-subheader>From</v-subheader>
      </v-col>
      <v-col cols="1">
        <v-text-field :disabled="true" v-model="settings.schedule_from_hour" />
      </v-col>
      <v-col cols="1">
        <v-text-field :disabled="true" v-model="settings.schedule_from_min" />
      </v-col>

      <v-col cols="2">
        <v-dialog v-model="scheduler.from.modal" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="!settings.scheduler_enabled" v-bind="attrs" v-on="on">{{ $t('modals.settings.speed.scheduler.selectButtonLabel') }}</v-btn>
          </template>
          <v-time-picker v-if="scheduler.from.modal" v-model="fromTime" full-width ampm-in-title>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="scheduler.from.modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="onDialogCloseFrom()">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>

      <v-col cols="1">
        <v-subheader>To</v-subheader>
      </v-col>
      <v-col cols="1">
        <v-text-field :disabled="true" v-model="settings.schedule_to_hour" />
      </v-col>
      <v-col cols="1">
        <v-text-field :disabled="true" v-model="settings.schedule_to_min" />
      </v-col>

      <v-col cols="2">
        <v-dialog v-model="scheduler.to.modal" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="!settings.scheduler_enabled" v-bind="attrs" v-on="on">{{ $t('modals.settings.speed.scheduler.selectButtonLabel') }}</v-btn>
          </template>
          <v-time-picker v-if="scheduler.to.modal" v-model="toTime" full-width ampm-in-title>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="scheduler.to.modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="onDialogCloseTo()">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
    </v-row>

    <v-list-item>
      <v-select
        :disabled="!settings.scheduler_enabled"
        v-model="settings.scheduler_days"
        class="mb-5"
        height="1"
        flat
        dense
        hide-details
        outlined
        :items="schedulerOptions"
        :label="$t('modals.settings.speed.scheduler.when')"
      />
    </v-list-item>

    <v-divider />

    <v-subheader>{{ $t('modals.settings.speed.subheader.settings') }}</v-subheader>

    <v-list-item>
      <v-checkbox v-model="settings.limit_utp_rate" hide-details class="ma-0 pa-0" :label="$t('modals.settings.speed.settings.applyToUtp')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.limit_tcp_overhead" hide-details class="ma-0 pa-0" :label="$t('modals.settings.speed.settings.applyToTransportOverhead')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.limit_lan_peers" hide-details class="ma-0 pa-0" :label="$t('modals.settings.speed.settings.applyToPeersOnLan')" />
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FullScreenModal, SettingsTab } from '@/mixins'
import { SchedulerDays } from '@/enums/qbit/AppPreferences'

export default defineComponent({
  name: 'Speed',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      scheduler: {
        from: {
          modal: false,
          hours: 0,
          minutes: 0
        },
        to: {
          modal: false,
          hours: 0,
          minutes: 0
        }
      },
      schedulerOptions: [
        { text: this.$t('enums.scheduler.everyDay'), value: SchedulerDays.EVERY_DAY },
        { text: this.$t('enums.scheduler.everyWeekday'), value: SchedulerDays.EVERY_WEEKDAY },
        { text: this.$t('enums.scheduler.everyWeekend'), value: SchedulerDays.EVERY_WEEKEND },
        { text: this.$t('enums.scheduler.everyMonday'), value: SchedulerDays.EVERY_MONDAY },
        { text: this.$t('enums.scheduler.everyTuesday'), value: SchedulerDays.EVERY_TUESDAY },
        { text: this.$t('enums.scheduler.everyWednesday'), value: SchedulerDays.EVERY_WEDNESDAY },
        { text: this.$t('enums.scheduler.everyThursday'), value: SchedulerDays.EVERY_THURSDAY },
        { text: this.$t('enums.scheduler.everyFriday'), value: SchedulerDays.EVERY_FRIDAY },
        { text: this.$t('enums.scheduler.everySaturday'), value: SchedulerDays.EVERY_SATURDAY },
        { text: this.$t('enums.scheduler.everySunday'), value: SchedulerDays.EVERY_SUNDAY }
      ]
    }
  },
  computed: {
    fromTime: {
      get: function () {
        return `${this.scheduler.from.hours}:${this.scheduler.from.minutes}`
      },
      set: function (newValue: string) {
        const [hours, minutes] = newValue.split(':')
        this.scheduler.from.hours = parseInt(hours)
        this.scheduler.from.minutes = parseInt(minutes)
      }
    },
    toTime: {
      get: function () {
        return `${this.scheduler.to.hours}:${this.scheduler.to.minutes}`
      },
      set: function (newValue: string) {
        const [hours, minutes] = newValue.split(':')
        this.scheduler.to.hours = parseInt(hours)
        this.scheduler.to.minutes = parseInt(minutes)
      }
    }
  },
  mounted() {
    this.scheduler.from.hours = this.settings.schedule_from_hour
    this.scheduler.from.minutes = this.settings.schedule_from_min

    this.scheduler.to.hours = this.settings.schedule_to_hour
    this.scheduler.to.minutes = this.settings.schedule_to_min
  },
  methods: {
    onDialogCloseFrom() {
      this.scheduler.from.modal = false
      this.settings.schedule_from_hour = this.scheduler.from.hours
      this.settings.schedule_from_min = this.scheduler.from.minutes
    },
    onDialogCloseTo() {
      this.scheduler.to.modal = false
      this.settings.schedule_to_hour = this.scheduler.to.hours
      this.settings.schedule_to_min = this.scheduler.to.minutes
    }
  }
})
</script>
