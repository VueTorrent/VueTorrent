<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import AutofillableField from '@/components/Core/AutofillableField.vue'
import PasswordField from '@/components/Core/PasswordField.vue'
import { useI18nUtils } from '@/composables'
import { useAppStore } from '@/stores'
import { LoginPayload } from '@/types/qbit/payloads'

const { t } = useI18nUtils()
const router = useRouter()
const route = useRoute()

const appStore = useAppStore()

const loginForm = reactive<LoginPayload>({
  username: '',
  password: '',
})
const rulesOk = ref(false)

async function login() {
  if (!rulesOk.value) return
  const response = await appStore.login(loginForm.username, loginForm.password)

  if (appStore.isAuthenticated) {
    toast.success(t('login.success'))
    redirectOnSuccess()
  } else {
    let message = t('login.error')

    if (response.status !== 200) {
      message += `\nError code: ${response.status} (${response.data})`
    }

    toast.error(message)
  }
}

function redirectOnSuccess() {
  if (route.query.redirect) {
    void router.push(route.query.redirect as string)
  } else {
    void router.push({ name: 'dashboard' })
  }
}

onMounted(async () => {
  if (route.query.username && route.query.password) {
    await appStore.login(route.query.username as string, route.query.password as string)
  }
})

watchEffect(() => {
  if (appStore.isAuthenticated) {
    redirectOnSuccess()
  }
})
</script>

<template>
  <v-container class="fill-height">
    <v-card class="mx-auto" rounded="lg" min-width="250">
      <v-card-title>{{ t('login.title') }}</v-card-title>
      <v-card-subtitle>{{ t('login.subtitle') }}</v-card-subtitle>
      <v-card-text>
        <form @submit.prevent="login">
          <AutofillableField
            id="username"
            v-model="loginForm.username"
            :title="t('login.username')"
            autocomplete="username"
            autofocus
            name="username"
            prepend-icon="mdi-account"
            @keydown.enter.prevent="login" />
          <PasswordField
            id="password"
            v-model="loginForm.password"
            :title="t('login.password')"
            autocomplete="current-password"
            name="password"
            prepend-icon="mdi-lock"
            @keydown.enter.prevent="login" />
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="elevated" block color="accent" @click="login">
          {{ t('login.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
