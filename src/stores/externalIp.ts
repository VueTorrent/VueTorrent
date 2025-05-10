import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { whenever } from '@vueuse/core'
import { useLogStore } from './logs'
import { useMaindataStore } from './maindata'
import { useVueTorrentStore } from './vuetorrent'

export const useExternalIpStore = defineStore('externalIP', () => {
  const logStore = useLogStore()
  const maindataStore = useMaindataStore()
  const vueTorrentStore = useVueTorrentStore()
  const { fetchExternalIpInfo } = storeToRefs(vueTorrentStore)

  const externalIp = computed(() => {
    return maindataStore.serverState?.last_external_address_v4 || logStore.externalIp
  })
  const geoDetails = ref<string | null>(null)
  const ispDetails = ref<string | null>(null)
  const lastFetchedIp = ref<string>()

  async function fetchGeoAndIspDetails() {
    if (!fetchExternalIpInfo.value) return

    if (externalIp.value && externalIp.value !== lastFetchedIp.value) {
      try {
        const response = await fetch(`https://ipinfo.io/${externalIp.value}/json`)
        const data = await response.json()
        geoDetails.value = `${data.city}, ${data.region}, ${data.country}`
        ispDetails.value = data.org
        lastFetchedIp.value = externalIp.value
      } catch (error) {
        console.error('Error fetching geo & ISP details:', error)
      }
    }
  }

  watch(externalIp, fetchGeoAndIspDetails)
  whenever(fetchExternalIpInfo, fetchGeoAndIspDetails)

  return {
    externalIp,
    geoDetails,
    ispDetails
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExternalIpStore, import.meta.hot))
}
