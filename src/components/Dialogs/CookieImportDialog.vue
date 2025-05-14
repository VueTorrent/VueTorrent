<script setup lang="ts">
import { useDialog, useI18nUtils } from '@/composables'
import { useCookieStore } from '@/stores'
import { Cookie } from '@/types/vuetorrent'
import { computed, reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  guid: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const cookieStore = useCookieStore()

enum ImportType {
  NETSCAPE,
  JSON,
  HEADER
}

const items = [
  { title: t('dialogs.cookiesImport.type.netscape'), value: ImportType.NETSCAPE, props: { prependIcon: 'mdi-table' } },
  { title: t('dialogs.cookiesImport.type.json'), value: ImportType.JSON, props: { prependIcon: 'mdi-code-json' } },
  { title: t('dialogs.cookiesImport.type.header'), value: ImportType.HEADER, props: { prependIcon: 'mdi-text-long' } }
]

const importType = ref<ImportType>(ImportType.NETSCAPE)
const cookieString = ref('')
const formData = reactive({
  domain: '',
  path: '',
  expirationDate: 0
})
const loading = ref(false)

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

function readJson() {
  const jsonValue = JSON.parse(cookieString.value)
  if (Array.isArray(jsonValue)) {
    return jsonValue.map(value => new Cookie(value))
  } else {
    return [new Cookie(jsonValue)]
  }
}

function readNetscape() {
  const cookies = []
  const lines = cookieString.value.split('\n')

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue

    const parts = line.split('\t')
    if (parts.length !== 7) continue

    const [domain, , path, , expiration, name, value] = parts

    cookies.push(
      new Cookie({
        domain: domain.trim(),
        path: path.trim(),
        name: name.trim(),
        value: decodeURIComponent(value.trim()),
        expirationDate: parseInt(expiration.trim(), 10)
      })
    )
  }

  return cookies
}

function readHeader() {
  return cookieString.value.split(';').map(cookie => {
    const [name, value] = cookie.split('=')
    return new Cookie({
      domain: formData.domain,
      path: formData.path,
      name: name.trim(),
      value: value.trim(),
      expirationDate: formData.expirationDate
    })
  })
}

async function submit() {
  loading.value = true

  try {
    let cookieValue: Cookie[]

    switch (importType.value) {
      case ImportType.JSON:
        cookieValue = readJson()
        break
      case ImportType.NETSCAPE:
        cookieValue = readNetscape()
        break
      case ImportType.HEADER:
        cookieValue = readHeader()
        break
    }

    await cookieStore.importCookies(cookieValue, true)
  } catch (e) {
    toast.error(e)
    loading.value = false
  }

  if (loading.value) {
    close()
  }
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
          <v-toolbar-title>{{ t('dialogs.cookiesImport.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-select v-model="importType" :items="items" :label="t('dialogs.cookiesImport.type.label')" />

        <v-textarea v-model="cookieString" :label="t('dialogs.cookiesImport.input')" />
        <template v-if="importType === ImportType.HEADER">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.domain" :label="t('dialogs.cookiesManager.domain')" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.path" :label="t('dialogs.cookiesManager.path')" />
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-date-picker v-model="expirationDate" :min="new Date()" />
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-time-picker v-model="expirationTime" format="24hr" use-seconds />
            </v-col>
          </v-row>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn color="accent" @click="submit">{{ t('common.submit') }}</v-btn>
        <v-btn color="error" @click="close">{{ t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
