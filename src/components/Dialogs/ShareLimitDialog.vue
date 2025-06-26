<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useDialog } from '@/composables'
import { useMaindataStore, useTorrentStore } from '@/stores'

type ShareType = 'global' | 'disabled' | 'enabled'
const GLOBAL = -2
const DISABLED = -1

const props = defineProps<{
  guid: string
  hashes: string[]
}>()

const { isOpened } = useDialog(props.guid)
const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()

const isFormValid = ref(false)

const shareType = ref<ShareType>('global')

const ratioLimitEnabled = ref(false)
const ratioLimit = ref(0)

const seedingTimeLimitEnabled = ref(false)
const seedingTimeLimit = ref(0)

const inactiveSeedingTimeLimitEnabled = ref(false)
const inactiveSeedingTimeLimit = ref(0)

const isFieldsDisabled = computed(() => shareType.value !== 'enabled')

function close() {
  isOpened.value = false
}

async function submit() {
  switch (shareType.value) {
    case 'global':
      await maindataStore.setShareLimit(props.hashes, GLOBAL, GLOBAL, GLOBAL)
      break
    case 'disabled':
      await maindataStore.setShareLimit(props.hashes, DISABLED, DISABLED, DISABLED)
      break
    case 'enabled':
      await maindataStore.setShareLimit(
        props.hashes,
        ratioLimitEnabled.value ? ratioLimit.value : DISABLED,
        seedingTimeLimitEnabled.value ? seedingTimeLimit.value : DISABLED,
        inactiveSeedingTimeLimitEnabled.value ? inactiveSeedingTimeLimit.value : DISABLED
      )
      break
  }
  close()
}

onBeforeMount(() => {
  const torrent = torrentStore.getTorrentByHash(props.hashes[0])
  if (!torrent) {
    return close()
  }

  const ratio_limit = torrent.ratio_limit
  const seeding_time_limit = torrent.seeding_time_limit
  const inactive_seeding_time_limit = torrent.inactive_seeding_time_limit

  if (ratio_limit === GLOBAL && seeding_time_limit === GLOBAL && inactive_seeding_time_limit === GLOBAL) {
    shareType.value = 'global'
  } else if (ratio_limit === DISABLED && seeding_time_limit === DISABLED && inactive_seeding_time_limit === DISABLED) {
    shareType.value = 'disabled'
  } else {
    shareType.value = 'enabled'

    ratioLimitEnabled.value = ratio_limit >= 0
    ratioLimit.value = ratioLimitEnabled.value ? ratio_limit : 0

    seedingTimeLimitEnabled.value = seeding_time_limit >= 0
    seedingTimeLimit.value = seedingTimeLimitEnabled.value ? seeding_time_limit : 0

    inactiveSeedingTimeLimitEnabled.value = inactive_seeding_time_limit >= 0
    inactiveSeedingTimeLimit.value = inactiveSeedingTimeLimitEnabled.value ? inactive_seeding_time_limit : 0
  }
})
</script>

<template>
  <v-dialog v-model="isOpened" max-width="500">
    <v-card :title="$t('dialogs.share_limit.title')">
      <v-card-text>
        <v-form v-model="isFormValid" @submit.prevent @keydown.enter.prevent="submit">
          <v-radio-group v-model="shareType">
            <v-radio :label="$t('dialogs.share_limit.global')" value="global" />
            <v-radio :label="$t('dialogs.share_limit.disabled')" value="disabled" />
            <v-radio :label="$t('dialogs.share_limit.enabled')" value="enabled" />
          </v-radio-group>
          <v-row>
            <v-col cols="12" class="d-flex align-center">
              <span><v-checkbox-btn v-model="ratioLimitEnabled" :disabled="isFieldsDisabled" /></span>
              <v-text-field v-model="ratioLimit" :disabled="isFieldsDisabled || !ratioLimitEnabled" density="compact" hide-details :label="$t('dialogs.share_limit.ratio_limit')" />
            </v-col>
            <v-col cols="12" class="d-flex align-center">
              <span><v-checkbox-btn v-model="seedingTimeLimitEnabled" :disabled="isFieldsDisabled" /></span>
              <v-text-field
                v-model="seedingTimeLimit"
                :disabled="isFieldsDisabled || !seedingTimeLimitEnabled"
                density="compact"
                hide-details
                :label="$t('dialogs.share_limit.seeding_time_limit')" />
            </v-col>
            <v-col cols="12" class="d-flex align-center">
              <span><v-checkbox-btn v-model="inactiveSeedingTimeLimitEnabled" :disabled="isFieldsDisabled" /></span>
              <v-text-field
                v-model="inactiveSeedingTimeLimit"
                :disabled="isFieldsDisabled || !inactiveSeedingTimeLimitEnabled"
                density="compact"
                hide-details
                :label="$t('dialogs.share_limit.inactive_seeding_time_limit')" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="submit">
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
