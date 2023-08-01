<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { toast } from 'vue3-toastify'
import {useI18n} from 'vue-i18n'

import {useAuthStore} from '@/stores'
import {LoginPayload} from '@/types/qbit/payloads'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const loginForm = reactive<LoginPayload>({
  username: '',
  password: '',
})
const rulesOk = ref(false)

const rules = {
  username: [
    (v: string) => !!v || 'Username is required',
  ],
  password: [
    (v: string) => !!v || 'Password is required',
  ],
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

onMounted(() => {
  if (authStore.isAuthenticated) {
    redirectOnSuccess()
  }
})
</script>

<template>
  <v-layout class="background">
    <v-card class="mx-auto" rounded="lg" min-width="250">
      <v-card-title>{{ t('login.title') }}</v-card-title>
      <v-card-subtitle>{{ t('login.subtitle') }}</v-card-subtitle>
      <v-card-text>
        <v-form v-model="rulesOk" @submit.prevent="login">
          <v-row>
            <v-col>
              <v-text-field
                  v-model="loginForm.username"
                  :label="t('login.username')"
                  type="text"
                  outlined
                  dense
                  required
                  persistent-placeholder
                  :rules="rules.username"
                  @keydown.enter.prevent="login"
              >
                <template v-slot:prepend>
                  <v-icon
                      color="accent"
                      icon="mdi-account"
                  />
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="loginForm.password"
                  :label="t('login.password')"
                  type="password"
                  outlined
                  dense
                  required
                  persistent-placeholder
                  :rules="rules.password"
                  @keydown.enter.prevent="login"
              >
                <template v-slot:prepend>
                  <v-icon
                      color="accent"
                      icon="mdi-lock"
                  />
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                  color="accent"
                  type="submit"
              >
                {{ t('login.submit') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<style scoped>

</style>