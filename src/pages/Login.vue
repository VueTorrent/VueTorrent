<script setup lang="ts">
import PasswordField from '@/components/Core/PasswordField.vue'
import { useAuthStore } from '@/stores'

import { LoginPayload } from '@/types/qbit/payloads'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const loginForm = reactive<LoginPayload>({
  username: '',
  password: ''
})
const rulesOk = ref(false)

const rules = {
  username: [(v: string) => !!v || t('login.rules.username_required')],
  password: [(v: string) => !!v || t('login.rules.password_required')]
}

const login = async () => {
  if (!rulesOk.value) return
  await authStore.login(loginForm.username, loginForm.password)

  if (authStore.isAuthenticated) {
    toast.success(t('login.success'))
    redirectOnSuccess()
  } else {
    toast.error(t('login.error'))
  }
}

const redirectOnSuccess = () => {
  if (route.query.redirect) {
    router.push(route.query.redirect as string)
  } else {
    router.push({ name: 'dashboard' })
  }
}

onMounted(async () => {
  if (route.query.username && route.query.password) {
    await authStore.login(route.query.username as string, route.query.password as string)
  }
})

watchEffect(() => {
  if (authStore.isAuthenticated) {
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
            v-model="loginForm.username"
            id="username"
            name="username"
            :label="t('login.username')"
            autofocus
            :rules="rules.username"
            @keydown.enter.prevent="login"
            variant="outlined">
            <template v-slot:prepend>
              <v-icon color="accent" icon="mdi-account" />
            </template>
          </v-text-field>

          <PasswordField
            v-model="loginForm.password"
            id="password"
            :label="t('login.password')"
            :rules="rules.password"
            prepend-icon="mdi-lock"
            @keydown.enter.prevent="login"
            variant="outlined" />
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
