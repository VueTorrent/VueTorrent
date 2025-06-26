<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useDialog, useI18nUtils } from '@/composables'
import { useCookieStore } from '@/stores'
import { Cookie } from '@/types/vuetorrent'

const props = defineProps<{
  guid: string
  initialCookie?: Cookie
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const cookieStore = useCookieStore()

const isInEditMode = computed(() => !!props.initialCookie)

const rules = [
  () => {
    const matchingCookies = cookieStore.cookies.filter(cookie => cookie.equals(formData))
    if (!isInEditMode.value && matchingCookies.length !== 0) {
      return t('dialogs.cookiesManager.rules.duplicate')
    } else if (isInEditMode.value && matchingCookies.length > 0 && !props.initialCookie!.equals(formData)) {
      return t('dialogs.cookiesManager.rules.duplicate')
    }
    return true
  }
]

const isFormValid = ref(false)
const formData = reactive(
  new Cookie({
    name: '',
    value: '',
    domain: '',
    path: '',
    expirationDate: 0
  })
)

const expirationDate = computed({
  get: () => {
    const date = new Date(formData.expirationDate * 1000)
    return date.toDateString()
  },
  set: value => {
    const date = new Date(formData.expirationDate * 1000)
    const newDate = new Date(value)
    date.setFullYear(newDate.getFullYear())
    date.setMonth(newDate.getMonth())
    date.setDate(newDate.getDate())
    formData.expirationDate = date.getTime() / 1000
  }
})

const expirationTime = computed({
  get: () => {
    const date = new Date(formData.expirationDate * 1000)
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },
  set: value => {
    const date = new Date(formData.expirationDate * 1000)
    const [hours, minutes, seconds] = value.split(':')
    date.setHours(+hours)
    date.setMinutes(+minutes)
    date.setSeconds(+seconds)
    formData.expirationDate = date.getTime() / 1000
  }
})

async function submit() {
  if (!isFormValid.value) return

  if (isInEditMode.value) {
    await cookieStore.removeCookie(props.initialCookie!)
  }
  await cookieStore.addCookie(formData, true)

  close()
}

function close() {
  isOpened.value = false
}

onBeforeMount(() => {
  if (isInEditMode.value) {
    Object.assign(formData, props.initialCookie)
  } else {
    const now = new Date()
    now.setMilliseconds(0)
    now.setFullYear(new Date().getFullYear() + 1)
    formData.expirationDate = now.getTime() / 1000
  }
})
</script>

<template>
  <v-dialog v-model="isOpened" max-width="1250">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('dialogs.cookiesManager.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" @submit.prevent>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.domain" :label="t('dialogs.cookiesManager.domain')" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.path" :label="t('dialogs.cookiesManager.path')" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.name" :label="t('dialogs.cookiesManager.name')" :rules="rules" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.value" :label="t('dialogs.cookiesManager.value')" />
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-date-picker v-model="expirationDate" :min="new Date()" />
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-time-picker v-model="expirationTime" format="24hr" use-seconds />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!isFormValid" color="accent" @click="submit">
          {{ t('common.submit') }}
        </v-btn>
        <v-btn color="error" @click="close">
          {{ t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
