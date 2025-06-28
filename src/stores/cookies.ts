import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTask } from 'vue-concurrency'
import qbit from '@/services/qbit'
import { Cookie } from '@/types/vuetorrent'

export const useCookieStore = defineStore('cookies', () => {
  const cookies = ref<Cookie[]>([])

  const cookiesFetchTask = useTask(function* () {
    yield fetchCookies()
  }).drop()

  async function fetchCookies() {
    cookies.value = (await qbit.getCookies()).map(cookie => new Cookie(cookie))
  }

  async function syncCookies() {
    await qbit.setCookies(cookies.value)
    cookiesFetchTask.perform()
  }

  async function addCookie(cookie: Cookie, syncData: boolean = false) {
    cookies.value.push(cookie)
    if (syncData) {
      await syncCookies()
    }
  }

  async function removeCookie(cookie: Cookie, syncData: boolean = false) {
    cookies.value = cookies.value.filter(c => !c.equals(cookie))
    if (syncData) {
      await syncCookies()
    }
  }

  async function clearCookies(syncData: boolean = false) {
    cookies.value = []
    if (syncData) {
      await syncCookies()
    }
  }

  async function importCookies(cookies: Cookie[], syncData: boolean = false) {
    cookies.forEach(cookie => {
      void removeCookie(cookie).then(() => addCookie(cookie))
    })
    if (syncData) {
      await syncCookies()
    }
  }

  return {
    cookies,
    cookiesFetchTask,
    addCookie,
    removeCookie,
    clearCookies,
    importCookies
  }
})
