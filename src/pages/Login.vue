<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
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
  password: ''
})
const rulesOk = ref(false)

const rules = {
  username: [(v: string) => !!v || t('login.rules.username_required')],
  password: [(v: string) => !!v || t('login.rules.password_required')]
}

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
        <v-form v-model="rulesOk" @submit.prevent="login">
          <v-text-field
            id="username"
            v-model="loginForm.username"
            name="username"
            autocomplete="username"
            aria-autocomplete="username"
            :label="t('login.username')"
            autofocus
            :rules="rules.username"
            variant="outlined"
            @keydown.enter.prevent="login">
            <template #prepend>
              <v-icon color="accent" icon="mdi-account" />
            </template>
          </v-text-field>

          <PasswordField
            id="password"
            v-model="loginForm.password"
            autocomplete="current-password"
            aria-autocomplete="current-password"
            :label="t('login.password')"
            :rules="rules.password"
            prepend-icon="mdi-lock"
            variant="outlined"
            @keydown.enter.prevent="login" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="elevated" block color="accent" @click="login">
          {{ t('login.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped></style>
