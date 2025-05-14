<script setup lang="ts">
import CookieFormDialog from '@/components/Dialogs/CookieFormDialog.vue'
import CookieImportDialog from '@/components/Dialogs/CookieImportDialog.vue'
import { useI18nUtils } from '@/composables'
import { formatTimeSec } from '@/helpers'
import { useCookieStore, useDialogStore, useVueTorrentStore } from '@/stores'
import { Cookie } from '@/types/vuetorrent'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { height: deviceHeight } = useDisplay()
const router = useRouter()
const { t } = useI18nUtils()
const cookieStore = useCookieStore()
const { cookies } = storeToRefs(cookieStore)
const dialogStore = useDialogStore()
const vuetorrentStore = useVueTorrentStore()

const height = computed(() => {
  // 64px for the toolbar
  // 12px for the padding (top and bottom)
  // 48px for the title
  return deviceHeight.value - 64 - 12 * 2 - 48
})

const headers = computed(() => [
  { title: t('cookiesManager.table.domain'), key: 'domain' },
  { title: t('cookiesManager.table.path'), key: 'path' },
  { title: t('cookiesManager.table.name'), key: 'name' },
  { title: t('cookiesManager.table.value'), key: 'value', cellProps: { class: 'wrap-anywhere' } },
  { title: t('cookiesManager.table.expiration_date'), key: 'expirationDate' },
  { key: 'actions', sortable: false, nowrap: true }
])

function openCookieFormDialog(cookie?: Cookie) {
  dialogStore.createDialog(CookieFormDialog, { initialCookie: cookie }, cookieStore.cookiesFetchTask.perform)
}

function openCookieImportDialog() {
  dialogStore.createDialog(CookieImportDialog, {}, cookieStore.cookiesFetchTask.perform)
}

function deleteCookie(cookie: Cookie) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteCookie'),
    text: `Domain: ${cookie.domain}\nPath: ${cookie.path}\nName: ${cookie.name}`,
    yesColor: 'error',
    onConfirm: async () => {
      await cookieStore.removeCookie(cookie, true)
    }
  })
}

function clearCookies() {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.clearCookies'),
    yesColor: 'error',
    onConfirm: async () => {
      await cookieStore.clearCookies(true)
    }
  })
}

const goHome = () => {
  router.push({ name: 'dashboard' })
}

function handleKeyboardShortcut(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog) {
    return false
  }

  if (e.key === 'Escape') {
    e.preventDefault()
    goHome()
  }
}

onBeforeMount(async () => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  cookieStore.cookiesFetchTask.perform()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('cookiesManager.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-card v-if="!cookies.length" :height="height">
      <v-empty-state :title="t('cookiesManager.empty.value')" color="accent" icon="mdi-cookie-off">
        <template #actions>
          <v-btn :text="t('cookiesManager.empty.action')" color="accent" @click="openCookieFormDialog()" />
        </template>
      </v-empty-state>
    </v-card>

    <v-list v-else>
      <v-list-item>
        <div class="d-flex align-center flex-gap">
          <v-spacer />
          <v-btn color="accent" prepend-icon="mdi-plus" :text="t('cookiesManager.create')" @click="openCookieFormDialog()" />
          <v-btn color="accent" prepend-icon="mdi-import" :text="t('cookiesManager.import')" @click="openCookieImportDialog()" />
          <v-btn color="error" prepend-icon="mdi-delete" :text="t('cookiesManager.clear')" @click="clearCookies()" />
        </div>
      </v-list-item>

      <v-divider class="my-3" />

      <v-list-item class="text-select">
        <v-data-table
          :header-props="{ class: 'text-no-wrap' }"
          :mobile="null"
          :headers="headers"
          :items="cookies"
          multi-sort
          :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }">
          <template #[`item.expirationDate`]="{ value }">
            {{ formatTimeSec(value, vuetorrentStore.dateFormat) }}
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" density="compact" @click.stop="openCookieFormDialog(item)" />
            <v-btn color="red" icon="mdi-delete" variant="text" density="compact" @click.stop="deleteCookie(item)" />
          </template>
        </v-data-table>
      </v-list-item>
    </v-list>
  </div>
</template>
