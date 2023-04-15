<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { mdiAccount, mdiLock } from '@mdi/js'

definePage({
  path: '/login',
  name: 'Login'
})

const authStore = useAuthStore()
const router = useRouter()

authStore.checkAuth().then((res) => {
  if (res) {
    router.push('/dashboard')
  }
})

const inputRules = [
  (v: string) => !!v || 'This field is required',
  (v: string) => v.length >= 3 || 'Min 3 characters'
]

const user = ref({
  username: '',
  password: ''
})

// methods
const login = () => {
  authStore.login(user.value)
}
</script>

<template>
  <VLayout class="justify-center align-center mt-5">
    <VCard width="295">
      <VCardTitle>
        <VToolbarTitle class="text-center pa-3">
          <span class="font-weight-light">qBit</span>
          <span>torrent</span>
        </VToolbarTitle>
      </VCardTitle>
      <VCardText>
        <VForm>
          <VTextField
            v-model="user.username"
            variant="outlined"
            label="Username"
            :rules="inputRules"
            :prependIcon="mdiAccount"
            persistentPlaceholder
            outlined
            dense
            required
            @keyup.enter="login"
          />
          <VTextField
            v-model="user.password"
            variant="outlined"
            label="Password"
            :rules="inputRules"
            :prependIcon="mdiLock"
            outlined
            dense
            required
            type="password"
            @keyup.enter="login"
          />
        </VForm>
      </VCardText>
      <VCardActions class="justify-center">
        <VBtn color="accent" rounded="xs" width="80" variant="flat" @click="authStore.login(user)">
          Login
        </VBtn>
      </VCardActions>
    </VCard>
  </VLayout>
</template>
